import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Pokemon from './pokemon.js'
import Game from './game.js'
import Method from './method.js'

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
