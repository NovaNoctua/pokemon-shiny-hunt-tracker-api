import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class CollectionEntry extends BaseModel {
  // Attributes
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nickname: string

  @column.date()
  declare obtainedAt: DateTime

  @column()
  declare finalCounter: number

  @column()
  declare notes: string

  @column()
  declare phaseNumber: number

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

  // Relations
}
