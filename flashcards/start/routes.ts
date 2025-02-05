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
import PagesController from '#controllers/pages_controller'

router.get('/', [PagesController, 'home']).as('home')
router.get('/apropos', [PagesController, 'apropos']).as('apropos')
router.get('/contact', [PagesController, 'contact']).as('contact')
router.get('/login', [PagesController, 'login']).as('login')
