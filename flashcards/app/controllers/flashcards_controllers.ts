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

  /**
   * Crée une flashcard pour un deck.
   */
  public async store({ request, response, params, session }: HttpContext) {
    try {
      const { question, answer } = request.only(['question', 'answer'])
      const deck = await Deck.findOrFail(params.deckId)

      if (!question?.trim() || !answer?.trim()) {
        session.flash({ error: 'La question et la réponse sont requises.' })
        return response.redirect().toRoute('decks.show', { id: params.deckId })
      }

      await Flashcard.create({
        question,
        answer,
        deckId: deck.id,
      })

      session.flash({ success: 'Carte créée avec succès !' })
      return response.redirect().toRoute('decks.show', { id: params.deckId })
    } catch (error) {
      console.error('Error creating flashcard:', error)
      session.flash({ error: 'Erreur lors de la création de la carte.' })
      return response.redirect().toRoute('decks.show', { id: params.deckId })
    }
  }
}
