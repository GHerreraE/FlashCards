import type { HttpContext } from '@adonisjs/core/http'
//import { dd } from '@adonisjs/core/services/dumper'

export default class PagesController {
  async home({ view }: HttpContext) {
    // Appel de la vue
    return view.render('pages/home')
  }

  async apropos({ view }: HttpContext) {
    // Appel de la vue
    return view.render('pages/apropos')
  }

  async contact({ view }: HttpContext) {
    // Appel de la vue
    return view.render('pages/contact')
  }

  async login({ view }: HttpContext) {
    // Appel de la vue
    return view.render('pages/login')
  }
}
