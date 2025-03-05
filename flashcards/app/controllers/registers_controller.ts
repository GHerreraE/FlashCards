import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class RegisterController {
  // Méthode pour afficher le formulaire d'inscription avec les messages flash
  public async showRegister(ctx: HttpContext) {
    const { view, session } = ctx
    console.log('Messages flash dans showRegister:', session.flashMessages)
    return view.render('register', { flash: session.flashMessages || {} })
  }

  public async register(ctx: HttpContext) {
    const { request, auth, response, session } = ctx
    const { username, password, password_confirmation } = request.only([
      'username',
      'password',
      'password_confirmation',
    ])

    // Vérifier que tous les champs sont remplis
    if (!username || !password || !password_confirmation) {
      session.flash({ error: 'Tous les champs sont requis.' })
      return response.redirect('/register')
    }

    // Vérifier la longueur du mot de passe
    if (password.length < 8) {
      session.flash({ error: 'Le mot de passe doit contenir au moins 8 caractères.' })
      return response.redirect('/register')
    }

    // Vérifier la confirmation du mot de passe
    if (password !== password_confirmation) {
      session.flash({ error: 'Les mots de passe ne correspondent pas.' })
      return response.redirect('/register')
    }

    try {
      const existingUser = await User.findBy('username', username)
      console.log('Existing user:', existingUser)
      if (existingUser) {
        session.flash({ error: "Ce nom d'utilisateur est déjà utilisé." })
        console.log('Duplicate détecté, redirection sans insertion.')
        return response.redirect('/register')
      }

      // Créer un nouvel utilisateur
      const newUser = await User.create({
        username,
        password: await hash.make(password),
      })

      // Connecter directement l'utilisateur après l'inscription
      await auth.use('web').login(newUser)

      session.flash({ success: 'Inscription réussie ! Bienvenue ' })
      return response.redirect('/homeuser')
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error)
      session.flash({ error: 'Une erreur est survenue. Veuillez réessayer.' })
      return response.redirect('/register')
    }
  }
}
