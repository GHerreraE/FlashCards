import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Hash from '@adonisjs/core/services/hash'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        username: 'admin',
        password: await Hash.make('admin123.'),
        isAdmin: true,
      },
      {
        username: 'etml',
        password: await Hash.make('etml123.'),
        isAdmin: false,
      },
    ])
  }
}
