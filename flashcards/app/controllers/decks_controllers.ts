import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/decks'

export default class DecksController {
  /**
   * Affiche tous les decks.
   */
  public async index({ view, session }: HttpContext) {
    try {
      // Vous pouvez également filtrer par utilisateur si besoin (ex: auth.user.id)
      const decks = await Deck.all()
      console.log('Decks récupérés :', decks)
      return view.render('homeuser', { decks, flash: session.flashMessages || {} })
    } catch (error) {
      console.error('Erreur lors de la récupération des decks :', error)
      session.flash({ error: 'Erreur lors du chargement des decks.' })
      return view.render('homeuser', { decks: [], flash: session.flashMessages || {} })
    }
  }

  /**
   * Affiche le formulaire de création d'un deck.
   */
  public async create({ view, session }: HttpContext) {
    return view.render('decks/create', { flash: session.flashMessages || {} })
  }

  /**
   * Affiche un deck avec ses flashcards associées.
   */
  public async show({ params, response, view, session }: HttpContext) {
    try {
      // Récupération du deck avec le préchargement de la relation "flashcards"
      const deck = await Deck.query().where('id', params.id).preload('flashcards').firstOrFail()

      return view.render('decks/show', {
        deck,
        flash: session.flashMessages || {},
      })
    } catch (error) {
      console.error('Deck non trouvé ou erreur lors du chargement :', error)
      session.flash({ error: 'Deck non trouvé.' })
      return response.status(404).json({ message: 'Deck not found' })
    }
  }

  /**
   * Enregistre un nouveau deck.
   */
  public async store({ request, response, session, auth }: HttpContext) {
    try {
      let { name, description } = request.only(['name', 'description'])

      // Nettoyage des entrées
      name = name?.trim()
      description = description?.trim()

      // Vérification des champs obligatoires
      if (!name || !description) {
        session.flash({ error: 'Le nom et la description sont requis.' })
        return response.redirect().back()
      }

      if (description.length < 10) {
        session.flash({ error: 'La description doit contenir au moins 10 caractères.' })
        return response.redirect().back()
      }

      // Vérification de l'unicité du nom du deck
      const existingDeck = await Deck.query().where('name', name).first()
      if (existingDeck) {
        session.flash({ error: 'Un deck avec ce nom existe déjà.' })
        return response.redirect().back()
      }

      // Récupération de l'utilisateur authentifié pour associer son id au deck
      const user = auth.user
      if (!user) {
        session.flash({ error: 'Utilisateur non authentifié.' })
        return response.redirect().back()
      }

      // Création du deck en utilisant la correspondance des noms de colonnes (userId en modèle => user_id en BDD)
      await Deck.create({
        name,
        description,
        userId: user.id,
      })

      session.flash({ success: 'Deck créé avec succès !' })
      return response.redirect('/decks')
    } catch (error) {
      console.error('Erreur lors de la création du deck :', error)
      session.flash({ error: 'Erreur lors de la création du deck.' })
      return response.redirect().back()
    }
  }

  /**
   * Affiche le formulaire d'édition d'un deck.
   */
  public async edit({ params, view, session }: HttpContext) {
    try {
      const deck = await Deck.findOrFail(params.id)
      return view.render('decks/edit', { deck, flash: session.flashMessages || {} })
    } catch (error) {
      console.error("Deck non trouvé pour l'édition :", error)
      session.flash({ error: 'Deck non trouvé.' })
      return view.render('errors/404')
    }
  }

  /**
   * Met à jour les informations d'un deck.
   */
  public async update({ params, request, response, session }: HttpContext) {
    try {
      const deck = await Deck.findOrFail(params.id)
      let { name, description } = request.only(['name', 'description'])

      // Nettoyage des entrées
      name = name?.trim()
      description = description?.trim()

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
      console.error('Erreur lors de la mise à jour du deck :', error)
      session.flash({ error: 'Erreur lors de la mise à jour du deck.' })
      return response.status(500).json({ error: 'Erreur lors de la mise à jour du deck.' })
    }
  }

  /**
   * Supprime un deck.
   */
  public async destroy({ params, response, session }: HttpContext) {
    try {
      const deck = await Deck.findOrFail(params.id)
      await deck.delete()
      session.flash({ success: 'Deck supprimé avec succès !' })
      return response.json({ success: true, message: 'Deck deleted' })
    } catch (error) {
      console.error('Erreur lors de la suppression du deck :', error)
      session.flash({ error: 'Erreur lors de la suppression du deck.' })
      return response.status(500).json({ success: false, message: 'Failed to delete the deck' })
    }
  }
}
