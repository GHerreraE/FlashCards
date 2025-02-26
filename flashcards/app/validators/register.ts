import { schema, rules } from '@adonisjs/validator'

export default class RegisterValidator {
  public schema = schema.create({
    username: schema.string([rules.trim(), rules.minLength(3), rules.maxLength(30)]),
    password: schema.string([
      rules.minLength(6),
      rules.confirmed(), // Vérifie que le champ password_confirmation correspond bien
    ]),
  })

  public messages = {
    'username.required': "Le nom d'utilisateur est obligatoire.",
    'username.minLength': "Le nom d'utilisateur doit contenir au moins 3 caractères.",
    'username.maxLength': "Le nom d'utilisateur ne doit pas dépasser 30 caractères.",
    'password.required': 'Le mot de passe est obligatoire.',
    'password.minLength': 'Le mot de passe doit contenir au moins 6 caractères.',
    'password.confirmed': 'Les mots de passe ne correspondent pas.',
  }
}
