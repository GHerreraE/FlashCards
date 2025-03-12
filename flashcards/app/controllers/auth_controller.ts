import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  public async login(ctx: HttpContext) {
    const { request, auth, response, session } = ctx
    const { username, password } = request.only(['username', 'password'])

    if (!username || !password) {
      session.flash({ error: "Veuillez fournir un nom d'utilisateur et un mot de passe." })
      return response.redirect('/')
    }

    try {
      // Rechercher l'utilisateur par nom d'utilisateur
      const user = await User.query().where('username', username).firstOrFail()
      console.log('user:', user)
      // Vérifier le mot de passe
      console.log(user.password, password)
      if (!(await hash.verify(user.password, password))) {
        throw new Error('Invalid credentials')
      }

      // Connecter l'utilisateur
      await auth.use('web').login(user)

      session.flash({ success: 'Connexion réussie !' })
      return response.redirect('/homeuser') // Redirige vers le tableau de bord
    } catch (error) {
      session.flash({ error: 'Identifiants incorrects' })
      return response.redirect('/')
    }
  }

  public async logout(ctx: HttpContext) {
    const { auth, response } = ctx
    await auth.use('web').logout()
    return response.redirect('/home')
  }
}
