import Flashcard from '#models/flashcards'
import Deck from '#models/decks'
import type { HttpContext } from '@adonisjs/core/http'

export default class FlashcardsController {
  /**
   * Affiche les flashcards pour un deck donné et passe les messages flash à la vue.
   */
  public async index({ params, view, session, response }: HttpContext) {
    try {
      // Ici, params.id correspond à l'ID du deck.
      const deckId = params.id
      const flashcards = await Flashcard.query().where('deck_id', deckId)
      return view.render('decks/show', { deckId, flashcards, flash: session.flashMessages || {} })
    } catch (error) {
      console.error('Error retrieving flashcards:', error)
      session.flash({ error: 'Erreur lors de la récupération des cartes.' })
      return response.redirect().toRoute('decks.show', { id: params.id })
    }
  }

  /**
   * Crée une nouvelle flashcard pour un deck donné et redirige vers la page du deck.
   */
  public async store({ request, response, params, session }: HttpContext) {
    try {
      // Dans cette route, params.deckId correspond à l'ID du deck concerné.
      const { question, answer } = request.only(['question', 'answer'])
      const deck = await Deck.findOrFail(params.deckId)

      // Vérification que la question et la réponse sont renseignées
      if (!question || !answer) {
        session.flash({ error: 'La question et la réponse sont requises.' })
        return response.status(400).json({
          success: false,
          flash: session.flashMessages || {},
          error: 'La question et la réponse sont requises.',
        })
      }

      const flashcard = await Flashcard.create({
        question,
        answer,
        deckId: deck.id,
      })

      session.flash({ success: 'Carte créée avec succès !' })
      return response.json({
        success: true,
        flashcard,
        flash: session.flashMessages || {},
      })
    } catch (error) {
      console.error('Error creating flashcard:', error)
      session.flash({ error: 'Erreur lors de la création de la carte.' })
      return response.status(500).json({
        success: false,
        flash: session.flashMessages || {},
        error: 'Erreur lors de la création de la carte.',
      })
    }
  }
}
