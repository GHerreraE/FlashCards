import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  public async login(ctx: HttpContext) {
    const { request, auth, response, session, view } = ctx

    // Si la requête est GET, afficher la vue de login avec les messages flash
    if (request.method() === 'GET') {
      // Utilise toJSON() pour obtenir un objet simple ou {} si undefined
      const flash = session.flashMessages ? session.flashMessages.toJSON() : {}
      return view.render('login', { flash })
    }

    // Pour une requête POST, traiter le formulaire de connexion
    const { username, password } = request.only(['username', 'password'])

    try {
      if (!username || !password) {
        session.flash({ error: "Veuillez fournir un nom d'utilisateur et un mot de passe." })
        return response.redirect('/login')
      }

      // Recherche de l'utilisateur sans 'firstOrFail'
      const user = await User.query().where('username', username).first()

      if (!user) {
        session.flash({ error: 'Identifiants incorrects' })
        return response.redirect('/login')
      }

      // Vérifier le mot de passe
      if (!(await hash.verify(user.password, password))) {
        session.flash({ error: 'Identifiants incorrects' })
        return response.redirect('/login')
      }

      // Connecter l'utilisateur
      await auth.use('web').login(user)
      session.flash({ success: 'Connexion réussie !' })
      return response.redirect('/homeuser')
    } catch (error) {
      console.error('Erreur lors du login:', error)
      session.flash({ error: 'Une erreur est survenue, veuillez réessayer.' })
      return response.redirect('/login')
    }
  }

  public async logout(ctx: HttpContext) {
    const { auth, response } = ctx
    await auth.use('web').logout()
    return response.redirect('/home')
  }
}
