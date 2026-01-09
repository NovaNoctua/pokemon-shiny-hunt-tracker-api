import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import CapturedShiny from './captured_shiny.js'
import Hunt from './hunt.js'
import MethodsInGame from './methods_in_game.js'

export default class Method extends BaseModel {
  // Attributes
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare baseOdds: string

  @column()
  declare maxOdds: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations
  @hasMany(() => CapturedShiny)
  declare capturedShinies: HasMany<typeof CapturedShiny>

  @hasMany(() => Hunt)
  declare hunts: HasMany<typeof Hunt>

  @hasMany(() => MethodsInGame)
  declare methodsInGame: HasMany<typeof MethodsInGame>
}
