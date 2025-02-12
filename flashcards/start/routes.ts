/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

// on import le router
import router from '@adonisjs/core/services/router'

const testUser = {
  email: 'test@example.com',
  password: 'password123',
}

// Route pour afficher la page d'accueil
router.get('/', async ({ view, session }) => {
  const isAuthenticated = session.get('loggedIn')
  return view.render('home', { isAuthenticated })
})

// Route pour afficher la page d'apropos
router.get('/apropos', async ({ view }) => {
  return view.render('apropos')
})

// Route pour afficher la page de connexion
router.get('/login', async ({ view }) => {
  return view.render('login')
})

// Route pour afficher la page de registre
router.get('/register', async ({ view }) => {
  return view.render('register')
})

// Route pour afficher la page de contact
router.get('/contact', async ({ view }) => {
  return view.render('contact')
})

// Route pour se déconnecter
router.get('/logout', async ({ auth, response, session }) => {
  await auth.use('web').logout()
  session.clear()
  return response.redirect('/')
})

router.post('/login', async ({ request, response, session }) => {
  // Récupération des données du formulaire
  console.log('bonjour')
  const { email, password } = request.only(['email', 'password'])

  // Vérification des identifiants avec testUser
  if (email === testUser.email && password === testUser.password) {
    // On simule la connexion en stockant dans la session
    session.put('loggedIn', true)
    session.put('userId', 1)
    // Redirection vers la page des flashcards
    return response.redirect('/flashcards')
  } else {
    // En cas d'erreur, flash d'un message et redirection vers la page précédente
    session.flash({ error: 'Identifiants incorrects.' })
    return response.redirect('back')
  }
})
