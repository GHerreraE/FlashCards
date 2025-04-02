// database/migrations/[timestamp]_decks.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Decks extends BaseSchema {
  protected tableName = 't_decks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description').nullable() // Add description column (optional)
      table
        .integer('user_id') // Add user_id column
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('t_users') // Assuming the users table is named 'users'
        .onDelete('CASCADE') // Delete decks if the user is deleted
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
