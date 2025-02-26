import type { HttpContextContract } from '@adonisjs/core/http'
import User from '#models/user'
import RegisterValidator from '#validators/register'

export default class AuthController {
  public async register({ request, response, session }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    // Vérifier si le username existe déjà
    const existingUser = await User.findBy('username', payload.username)
    if (existingUser) {
      session.flash({ error: "Ce nom d'utilisateur est déjà pris." })
      return response.redirect('back')
    }

    try {
      const user = await User.create({
        username: payload.username,
        password: payload.password,
        isAdmin: false,
      })

      session.flash({ success: 'Inscription réussie ! Vous pouvez maintenant vous connecter.' })
      return response.redirect('/login')
    } catch (error) {
      session.flash({ error: "Une erreur est survenue lors de l'inscription." })
      return response.redirect('back')
    }
  }
}
