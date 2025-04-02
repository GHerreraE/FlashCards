import Flashcard from '#models/flashcards'
import Deck from '#models/decks'
import type { HttpContext } from '@adonisjs/core/http'

export default class FlashcardsController {
  /**
   * Affiche les flashcards pour un deck donné.
   */
  public async index({ params, view, session, response }: HttpContext) {
    try {
      const deckId = params.id
      const deck = await Deck.findOrFail(deckId)
      const flashcards = await Flashcard.query().where('deck_id', deckId)

      return view.render('decks/show', {
        deck,
        flashcards,
        flash: session.flashMessages || {},
      })
    } catch (error) {
      console.error('Erreur lors de la récupération des cartes:', error)
      session.flash({ error: 'Deck introuvable ou erreur de chargement.' })
      return response.redirect('/decks')
    }
  }
  public async show({ params, view, session, response }: HttpContext) {
    try {
      // Récupère la flashcard via son identifiant
      const flashcard = await Flashcard.findOrFail(params.id)
      // Récupère le deck associé à la flashcard (pour fournir un contexte si besoin)
      const deck = await Deck.findOrFail(flashcard.deckId)

      return view.render('flashcards/show', {
        flashcard,
        deck,
        flash: session.flashMessages || {},
      })
    } catch (error) {
      console.error("Erreur lors de l'affichage de la carte :", error)
      session.flash({ error: 'Carte non trouvée ou erreur de chargement.' })
      return response.redirect('/decks')
    }
  }

  /**
   * Crée une flashcard pour un deck.
   */
  public async store({ request, response, params }: HttpContext) {
    const { question, answer } = request.only(['question', 'answer'])
    const deck = await Deck.findOrFail(params.deckId)

    const errors: Record<string, string> = {}

    if (!question || question.trim().length < 10) {
      errors.question = 'La question doit contenir au moins 10 caractères.'
    }

    if (!answer || answer.trim().length === 0) {
      errors.answer = 'La réponse est requise.'
    }

    const existingCard = await Flashcard.query()
      .where('deckId', deck.id)
      .andWhere('question', question.trim())
      .first()

    if (existingCard) {
      errors.question = 'Cette question existe déjà.'
    }

    if (Object.keys(errors).length > 0) {
      return response.status(400).json({ errors })
    }

    await Flashcard.create({
      question: question.trim(),
      answer: answer.trim(),
      deckId: deck.id,
    })

    return response.redirect().toRoute('decks.show', { id: deck.id })
  }

  public async destroy({ params, response, session }: HttpContext) {
    // Utilisez params.id car votre route est définie avec /flashcards/:id
    const flashcard = await Flashcard.find(params.id)
    if (!flashcard) {
      session.flash({ error: 'Flashcard non trouvée.' })
      return response.status(404).json({ message: 'Flashcard non trouvée' })
    }
    try {
      await flashcard.delete()
      session.flash({ success: 'Carte supprimée avec succès !' })
      return response.json({ success: true, message: 'Flashcard supprimée' })
    } catch (error) {
      console.error('Erreur lors de la suppression de la flashcard:', error)
      session.flash({ error: 'Erreur lors de la suppression de la carte.' })
      return response
        .status(500)
        .json({ success: false, message: 'Échec de la suppression de la flashcard' })
    }
  }

  public async edit({ params, view, session }: HttpContext) {
    const flashcard = await Flashcard.findOrFail(params.id)
    const deck = await Deck.findOrFail(flashcard.deckId)

    return view.render('flashcards/edit', {
      flashcard,
      deck,
      flash: session.flashMessages || {},
    })
  }

  public async update({ params, request, response, session }: HttpContext) {
    try {
      const flashcard = await Flashcard.findOrFail(params.id)
      const { question, answer } = request.only(['question', 'answer'])

      if (!question?.trim() || !answer?.trim()) {
        session.flash({ error: 'La question et la réponse sont requises.' })
        return response.status(400).json({ error: 'Champs requis manquants.' })
      }

      if (question.length < 5 || answer.length < 1) {
        session.flash({ error: 'La question doit contenir au moins 5 caractères.' })
        return response.status(400).json({ error: 'Question trop courte ou réponse vide.' })
      }

      flashcard.question = question
      flashcard.answer = answer
      await flashcard.save()

      session.flash({ success: 'Flashcard mise à jour avec succès !' })
      return response.json({ success: true, flashcard })
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la flashcard :', error)
      session.flash({ error: 'Erreur lors de la mise à jour de la carte.' })
      return response.status(500).json({ error: 'Erreur interne du serveur.' })
    }
  }
  public async create({ params, view, session, response }: HttpContext) {
    try {
      const deck = await Deck.findOrFail(params.deckId)
      return view.render('flashcards/create', {
        deck,
        flash: session.flashMessages || {},
      })
    } catch (error) {
      console.error("Erreur lors de l'affichage du formulaire de création de carte:", error)
      session.flash({ error: 'Deck introuvable.' })
      return response.redirect('/decks')
    }
  }
}
