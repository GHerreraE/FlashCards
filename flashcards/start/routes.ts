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
router.get('/homeuser', [DecksController, 'index'])

// Deck routes
router.get('/decks', [DecksController, 'index'])
router.get('/decks/create', [DecksController, 'create'])
router.post('/decks', [DecksController, 'store']).as('decks.store')
router.get('/decks/:id', [DecksController, 'show']).as('decks.show') // Show deck with options to edit, delete, and add flashcards
router.get('/decks/:id/edit', [DecksController, 'edit']).as('decks.edit') // Show the edit page
router.put('/decks/:id', [DecksController, 'update']).as('decks.update') // Update deck

// Delete deck route
router.delete('/decks/:id', [DecksController, 'destroy']).as('decks.destroy') // Delete deck

// Flashcard routes
router.post('/decks/:deckId/flashcards', [FlashcardsController, 'store']).as('flashcards.store')

// Groupe de routes nécessitant l'authentification
router
  .group(() => {
    router.post('/create-deck', 'DecksController.createDeck').as('createDeck')
  })
  .middleware([() => new AuthMiddleware()])
