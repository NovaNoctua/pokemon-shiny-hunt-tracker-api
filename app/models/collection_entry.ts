import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Game from './game.js'
import Method from './method.js'
import Pokemon from './pokemon.js'
import User from './user.js'

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
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Pokemon)
  declare pokemon: BelongsTo<typeof Pokemon>

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>

  @belongsTo(() => Method)
  declare method: BelongsTo<typeof Method>
}
