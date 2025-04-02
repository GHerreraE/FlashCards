import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 't_users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('username').notNullable().unique()
      table.string('password').notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()) // Add created_at column
      table.timestamp('updated_at', { useTz: true }).nullable() // Add updated_at column
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
