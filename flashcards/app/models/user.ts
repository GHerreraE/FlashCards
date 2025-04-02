import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class User extends BaseModel {
  public static table = 't_users'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column({ serializeAs: null })
  declare password: string
}
