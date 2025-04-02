import type { HttpContext } from '@adonisjs/core/http'
import Flashcard from '#models/flashcards'
import Deck from '#models/decks'

export default class FlashcardsController {
  /**
   * Affiche les flashcards pour un deck donné.
   */
  public async index({ params, view, session, response }: HttpContext) {
    try {
      const deckId = params.id
      // Récupération du deck avec ses flashcards via la relation définie dans le modèle
      const deck = await Deck.findOrFail(deckId)
      await deck.load('flashcards')
      const flashcards = deck.flashcards

      return view.render('decks/show', {
        deck,
        flashcards,
        flash: session.flashMessages || {},
      })
    } catch (error) {
      console.error('Erreur lors de la récupération des cartes :', error)
      session.flash({ error: 'Deck introuvable ou erreur de chargement.' })
      return response.redirect('/decks')
    }
  }

  /**
   * Affiche une flashcard et son deck associé.
   */
  public async show({ params, view, session, response }: HttpContext) {
    try {
      // Récupération de la flashcard puis chargement de sa relation avec le deck
      const flashcard = await Flashcard.findOrFail(params.id)
      await flashcard.load('deck')

      return view.render('flashcards/show', {
        flashcard,
        deck: flashcard.deck,
        flash: session.flashMessages || {},
      })
    } catch (error) {
      console.error("Erreur lors de l'affichage de la carte :", error)
      session.flash({ error: 'Carte non trouvée ou erreur de chargement.' })
      return response.redirect('/decks')
    }
  }

  /**
   * Affiche le formulaire de création d'une flashcard.
   */
  public async create({ params, view, session, response }: HttpContext) {
    try {
      const deck = await Deck.findOrFail(params.deckId)
      return view.render('flashcards/create', {
        deck,
        flash: session.flashMessages || {},
      })
    } catch (error) {
      console.error("Erreur lors de l'affichage du formulaire de création de carte :", error)
      session.flash({ error: 'Deck introuvable.' })
      return response.redirect('/decks')
    }
  }

  /**
   * Crée une flashcard pour un deck.
   */
  public async store({ request, response, params, session }: HttpContext) {
    try {
      const { question, answer } = request.only(['question', 'answer'])
      const deck = await Deck.findOrFail(params.deckId)

      // Nettoyage des espaces en début/fin
      const trimmedQuestion = question.trim()
      const trimmedAnswer = answer.trim()

      // Vérification des champs obligatoires
      if (!trimmedQuestion || !trimmedAnswer) {
        session.flash({ error: 'La question et la réponse sont requises.' })
        return response.redirect().toRoute('flashcards.create', { deckId: deck.id })
      }

      // Vérification de la longueur minimale de la question (10 caractères)
      if (trimmedQuestion.length < 10) {
        session.flash({ error: 'La question doit contenir au moins 10 caractères.' })
        return response.redirect().toRoute('flashcards.create', { deckId: deck.id })
      }

      // Vérifie si une flashcard avec la même question existe déjà dans ce deck
      const existingCard = await deck
        .related('flashcards')
        .query()
        .where('question', trimmedQuestion)
        .first()

      if (existingCard) {
        session.flash({ error: 'Cette question existe déjà.' })
        return response.redirect().toRoute('decks.show', { id: deck.id })
      }

      // Création de la flashcard via la relation 'flashcards' du deck
      await deck.related('flashcards').create({
        question: trimmedQuestion,
        answer: trimmedAnswer,
      })

      session.flash({ success: 'Carte créée avec succès !' })
      return response.redirect().toRoute('decks.show', { id: deck.id })
    } catch (error) {
      console.error('Erreur lors de la création de la carte :', error)
      session.flash({ error: 'Erreur lors de la création de la carte.' })
      return response.redirect().toRoute('flashcards.create', { deckId: params.deckId })
    }
  }

  /**
   * Affiche le formulaire d'édition d'une flashcard.
   */
  public async edit({ params, view, session }: HttpContext) {
    try {
      const flashcard = await Flashcard.findOrFail(params.id)
      // Chargement de la relation pour récupérer le deck associé
      await flashcard.load('deck')

      return view.render('flashcards/edit', {
        flashcard,
        deck: flashcard.deck,
        flash: session.flashMessages || {},
      })
    } catch (error) {
      console.error("Erreur lors de l'affichage du formulaire d'édition :", error)
      session.flash({ error: 'Flashcard ou deck introuvable.' })
      return view.render('errors/404')
    }
  }

  /**
   * Met à jour une flashcard existante.
   */
  public async update({ params, request, response, session }: HttpContext) {
    try {
      const flashcard = await Flashcard.findOrFail(params.id)
      const { question, answer } = request.only(['question', 'answer'])

      // Nettoyage des espaces
      const trimmedQuestion = question.trim()
      const trimmedAnswer = answer.trim()

      if (!trimmedQuestion || !trimmedAnswer) {
        session.flash({ error: 'La question et la réponse sont requises.' })
        return response.status(400).json({ error: 'Champs requis manquants.' })
      }

      // Vérification de la longueur minimale de la question (10 caractères)
      if (trimmedQuestion.length < 10) {
        session.flash({ error: 'La question doit contenir au moins 10 caractères.' })
        return response.status(400).json({ error: 'Question trop courte.' })
      }

      flashcard.question = trimmedQuestion
      flashcard.answer = trimmedAnswer
      await flashcard.save()

      session.flash({ success: 'Flashcard mise à jour avec succès !' })
      return response.json({ success: true, flashcard })
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la flashcard :', error)
      session.flash({ error: 'Erreur lors de la mise à jour de la carte.' })
      return response.status(500).json({ error: 'Erreur interne du serveur.' })
    }
  }

  /**
   * Supprime une flashcard.
   */
  public async destroy({ params, response, session }: HttpContext) {
    try {
      const flashcard = await Flashcard.findOrFail(params.id)
      await flashcard.delete()

      session.flash({ success: 'Carte supprimée avec succès !' })
      return response.json({ success: true, message: 'Flashcard supprimée' })
    } catch (error) {
      console.error('Erreur lors de la suppression de la flashcard :', error)
      session.flash({ error: 'Erreur lors de la suppression de la carte.' })
      return response
        .status(500)
        .json({ success: false, message: 'Échec de la suppression de la flashcard' })
    }
  }
}
