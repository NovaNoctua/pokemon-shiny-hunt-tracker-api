import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MethodsInGame extends BaseModel {
  // Attributes
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare gameId: number

  @column()
  declare methodId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations
}
