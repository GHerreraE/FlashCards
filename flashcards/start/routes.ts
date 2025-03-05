import AuthController from '../app/controllers/auth_controller.js'
import RegisterController from '#controllers/registers_controller'
import router from '@adonisjs/core/services/router'

// Affichage du formulaire d'inscription (GET)
router.get('/register', [RegisterController, 'showRegister']).as('showRegister')

// Traitement de l'inscription (POST)
router.post('/register', [RegisterController, 'register']).as('handleRegister')

router.on('/home').render('home').as('home')
router.on('/login').render('login').as('login')
router.on('/apropos').render('apropos').as('apropos')
router.on('/contact').render('contact').as('contact')
router.on('/homeuser').render('homeuser').as('homeuser')
router.on('/').redirect('home')
router.post('/login', [AuthController, 'login'])
router.post('/logout', [AuthController, 'logout']).as('logout')
