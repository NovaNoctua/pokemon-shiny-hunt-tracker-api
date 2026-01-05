import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class CurrentlyHunting extends BaseModel {
  // Attributes
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare startedAt: DateTime

  @column()
  declare lastStarted: DateTime

  @column()
  declare lastStopped: DateTime

  @column()
  declare timer: number

  @column()
  declare currentCounter: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // FK
  @column()
  declare userId: number

  @column()
  declare pokemonId: number

  @column()
  declare gameId: number

  @column()
  declare methodId: number
}
