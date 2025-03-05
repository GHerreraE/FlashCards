import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        id: 1,
        username: 'etml',
        password: await hash.make('etmletml'),
      },
      {
        id: 2,
        username: 'cofop',
        password: await hash.make('etmletml'),
      },

      {
        id: 3,
        username: 'cpnv',
        password: await hash.make('etmletml'),
      },
    ])
  }
}
