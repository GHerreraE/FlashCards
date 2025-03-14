import router from '@adonisjs/core/services/router'
import AuthController from '../app/controllers/auth_controller.js'
import RegisterController from '#controllers/registers_controller'
import AuthMiddleware from '#middleware/auth_middleware'

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
router.on('/homeuser').render('homeuser').as('homeuser')

// Groupe de routes nécessitant l'authentification
router
  .group(() => {
    router.post('/create-deck', 'DecksController.createDeck').as('createDeck')
  })
  .middleware([() => new AuthMiddleware()])
