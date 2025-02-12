import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Auto-incrémenté
      table.string('username').notNullable().unique()
      table.string('password').notNullable()
      table.timestamps(true) // Pour created_at et updated_at
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
