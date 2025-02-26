/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| Le fichier des routes est utilisé pour définir les routes HTTP.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'

// Route pour afficher la page d'accueil
router
  .get('/', async ({ view, session }) => {
    const isAuthenticated = session.get('loggedIn', false)
    return view.render('home', { isAuthenticated })
  })
  .as('home')

// Route pour afficher la page "À propos"
router
  .get('/apropos', async ({ view }) => {
    return view.render('apropos')
  })
  .as('apropos')

// Route pour afficher la page de connexion (uniquement si l'utilisateur n'est pas connecté)
router
  .get('/login', async ({ auth, response, view }) => {
    if (auth.use('web').isAuthenticated) {
      return response.redirect('/')
    }
    return view.render('login')
  })
  .as('login')

// Route pour afficher le formulaire d'inscription
router
  .get('/register', async ({ auth, response, view }) => {
    if (auth.use('web').isAuthenticated) {
      return response.redirect('/')
    }
    return view.render('register')
  })
  .as('showRegister')

// Route pour gérer l'inscription
router.post('/register', [AuthController, 'register']).as('register')

// Route pour afficher la page de contact
router
  .get('/contact', async ({ view }) => {
    return view.render('contact')
  })
  .as('contact')

// Route pour se déconnecter
router
  .get('/logout', async ({ auth, response, session }) => {
    await auth.use('web').logout()
    session.clear()
    return response.redirect('/')
  })
  .as('logout')
