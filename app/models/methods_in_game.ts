import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Game from './game.js'
import Method from './method.js'

export default class MethodsInGame extends BaseModel {
  // Attributes
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // FK
  @column()
  declare gameId: number

  @column()
  declare methodId: number

  // Relations
  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>

  @belongsTo(() => Method)
  declare method: BelongsTo<typeof Method>
}
