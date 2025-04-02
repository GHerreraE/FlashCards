import router from '@adonisjs/core/services/router'
import AuthController from '../app/controllers/auth_controller.js'
import RegisterController from '#controllers/registers_controller'
import AuthMiddleware from '#middleware/auth_middleware'
import DecksController from '#controllers/decks_controllers'
import FlashcardsController from '#controllers/flashcards_controllers'

// Routes accessibles sans authentification
router.get('/register', [RegisterController, 'showRegister']).as('showRegister')
router.post('/register', [RegisterController, 'register']).as('handleRegister')
router.on('/login').render('login').as('login')
router.post('/login', [AuthController, 'login'])
router.post('/logout', [AuthController, 'logout']).as('logout')
router.on('/').redirect('home')
router.on('/home').render('home').as('home')
router.on('/apropos').render('apropos').as('apropos')
router.on('/contact').render('contact').as('contact')

// Groupe de routes protégées (l'utilisateur doit être authentifié)
router
  .group(() => {
    router.get('/homeuser', [DecksController, 'index'])

    // Deck routes
    router.get('/decks', [DecksController, 'index'])
    router.get('/decks/create', [DecksController, 'create'])
    router.post('/decks', [DecksController, 'store']).as('decks.store')
    router.get('/decks/:id', [DecksController, 'show']).as('decks.show')
    router.get('/decks/:id/edit', [DecksController, 'edit']).as('decks.edit')
    router.put('/decks/:id', [DecksController, 'update']).as('decks.update')
    router.delete('/decks/:id', [DecksController, 'destroy']).as('decks.destroy')

    // Flashcard routes
    router
      .get('/decks/:deckId/flashcards/create', [FlashcardsController, 'create'])
      .as('flashcards.create')
    router.post('/decks/:deckId/flashcards', [FlashcardsController, 'store']).as('flashcards.store')
    router.delete('/flashcards/:id', [FlashcardsController, 'destroy']).as('flashcards.destroy')
    router.get('/flashcards/:id/edit', [FlashcardsController, 'edit']).as('flashcards.edit')
    router.put('/flashcards/:id', [FlashcardsController, 'update']).as('flashcards.update')
    router.get('/flashcards/:id/', [FlashcardsController, 'show']).as('flashcards.show')

    // Route existante (si nécessaire)
    router.post('/create-deck', 'DecksController.createDeck').as('createDeck')
  })
  .middleware([() => new AuthMiddleware()])
