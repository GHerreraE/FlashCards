import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  public async login(ctx: HttpContext) {
    const { request, auth, response, session, view } = ctx

    console.log('Méthode de la requête:', request.method())

    // Si la requête est GET, afficher la vue de login avec les messages flashh
    if (request.method() === 'GET') {
      const flash = session.flashMessages ? session.flashMessages.toJSON() : {}
      console.log('Affichage de la page de login avec flash:', flash)
      return view.render('login', { flash })
    }

    // Pour une requête POST, traiter le formulaire de connexion
    const { username, password } = request.only(['username', 'password'])
    console.log('Tentative de login pour username:', username)

    try {
      if (!username || !password) {
        console.log('Nom d’utilisateur ou mot de passe manquant.')
        session.flash({ error: "Veuillez fournir un nom d'utilisateur et un mot de passe." })
        return response.redirect('/login')
      }

      // Recherche de l'utilisateur
      const user = await User.query().where('username', username).first()
      console.log('Utilisateur trouvé:', user)

      if (!user) {
        console.log('Aucun utilisateur correspondant trouvé.')
        session.flash({ error: 'Identifiants incorrects' })
        return response.redirect('/login')
      }

      // Vérifier le mot de passe
      const isPasswordValid = await hash.verify(user.password, password)
      console.log('Mot de passe valide:', isPasswordValid)

      if (!isPasswordValid) {
        session.flash({ error: 'Identifiants incorrects' })
        return response.redirect('/login')
      }

      // Connecter l'utilisateur
      await auth.use('web').login(user)
      console.log('Utilisateur connecté avec succès:', user)
      return response.redirect('/homeuser')
    } catch (error) {
      console.error('Erreur lors du login:', error)
      session.flash({ error: 'Une erreur est survenue, veuillez réessayer.' })
      return response.redirect('/login')
    }
  }

  public async logout(ctx: HttpContext) {
    const { auth, response } = ctx
    console.log('Déconnexion de l’utilisateur:', auth.user)
    await auth.use('web').logout()
    return response.redirect('/home')
  }
}
