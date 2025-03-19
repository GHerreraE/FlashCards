// app/Controllers/Http/DecksController.ts
import Deck from '#models/decks' // Import the Deck model
import Flashcard from '#models/flashcards' // Import the Flashcard model
import type { HttpContext } from '@adonisjs/core/http'

export default class DecksController {
  // Fetch all decks
  public async index({ view, session }: HttpContext) {
    // Fetch all decks (no flashcards preloaded)
    const decks = await Deck.all()

    // Pass the decks to the view
    return view.render('homeuser', { decks, flash: session.flashMessages || {} })
  }

  // Show the form to create a new deck or handle it
  public async create({ view, session }: HttpContext) {
    return view.render('decks/create', { flash: session.flashMessages || {} })
  }

  public async show({ params, response, view }: HttpContext) {
    try {
      const deck = await Deck.findOrFail(params.id) // Find deck
      const flashcards = await Flashcard.query().where('deck_id', deck.id) // Get its flashcards

      return view.render('decks/show', { deck, flashcards }) // Pass both deck & flashcards
    } catch (error) {
      return response.status(404).json({ message: 'Deck not found' })
    }
  }

  public async store({ request, response, session }: HttpContext) {
    const { name, description } = request.only(['name', 'description'])

    // Si la description est null ou vide, on redirige directement
    if (!description || description.length < 10) {
      session.flash({ error: 'La description doit contenir au moins 10 caractères.' })
      return response.redirect('/homeuser')
    }

    // Check if a deck with the same name already exists
    const existingDeck = await Deck.query().where('name', name).first()

    if (existingDeck) {
      session.flash({ error: 'Un deck avec ce nom existe déjà.' })
      return response.redirect('/decks')
    }

    // Create the new deck if it passes validation
    await Deck.create({
      name,
      description,
    })

    console.log('New Deck Created:', { name, description })
    session.flash({ success: 'Deck créé avec succès !' })
    return response.redirect('/decks')
  }

  // Show the form to edit a deck's title and description
  public async edit({ params, view, session }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    return view.render('decks/edit', { deck, flash: session.flashMessages || {} })
  }
  public async update({ params, request, response, session }: HttpContext) {
    try {
      const deck = await Deck.findOrFail(params.id)
      const { name, description } = request.only(['name', 'description'])

      if (!name || !description) {
        session.flash({ error: 'Le nom et la description sont requis.' })
        return response.status(400).json({ error: 'Le nom et la description sont requis.' })
      }

      if (description.length < 10) {
        session.flash({ error: 'La description doit contenir au moins 10 caractères.' })
        return response
          .status(400)
          .json({ error: 'La description doit contenir au moins 10 caractères.' })
      }

      deck.name = name
      deck.description = description
      await deck.save()

      session.flash({ success: 'Deck mis à jour avec succès !' })
      return response.json({ success: true, deck })
    } catch (error) {
      console.log('Error updating deck:', error)
      session.flash({ error: 'Erreur lors de la mise à jour du deck.' })
      return response.status(500).json({ error: 'Erreur lors de la mise à jour du deck.' })
    }
  }

  public async destroy({ params, response, session }: HttpContext) {
    const deck = await Deck.find(params.id)
    if (!deck) {
      session.flash({ error: 'Deck not found.' })
      return response.status(404).json({ message: 'Deck not found' })
    }
    try {
      await deck.delete()
      session.flash({ success: 'Deck supprimé avec succès !' })
      return response.json({ success: true, message: 'Deck deleted' })
    } catch (error) {
      console.log('Error deleting deck:', error)
      session.flash({ error: 'Erreur lors de la suppression du deck.' })
      return response.status(500).json({ success: false, message: 'Failed to delete the deck' })
    }
  }

  public async storeFlashcard({ params, request, response, session }: HttpContext) {
    try {
      const deck = await Deck.findOrFail(params.id)
      const { question, answer } = request.only(['question', 'answer'])

      // Vérification que la question et la réponse sont renseignées
      if (!question || !answer) {
        session.flash({ error: 'La question et la réponse sont requises.' })
        return response.status(400).json({ error: 'La question et la réponse sont requises.' })
      }

      const flashcard = await Flashcard.create({
        deckId: deck.id,
        question,
        answer,
      })

      session.flash({ success: 'Carte créée avec succès !' })
      return response.json({ success: true, flashcard })
    } catch (error) {
      console.log('Error creating flashcard:', error)
      session.flash({ error: 'Erreur lors de la création de la carte.' })
      return response.status(500).json({ error: 'Erreur lors de la création de la carte.' })
    }
  }
}
