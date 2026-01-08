import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Entry from './entry.js'
import Hunt from './hunt.js'
import MethodsInGame from './methods_in_game.js'
import Method from './method.js'

export default class Game extends BaseModel {
  // Attributes
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare generation: number

  @column()
  declare platform: string

  @column()
  declare imagePath: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations
  @hasMany(() => Entry)
  declare entries: HasMany<typeof Entry>

  @hasMany(() => Hunt)
  declare hunts: HasMany<typeof Hunt>

  @hasMany(() => MethodsInGame)
  declare methodsInGame: HasMany<typeof MethodsInGame>

  @manyToMany(() => Method, {
    pivotTable: 'methods_in_games', // Your middle table name
    pivotForeignKey: 'game_id', // Column in middle table pointing to Game
    pivotRelatedForeignKey: 'method_id', // Column in middle table pointing to Method
  })
  declare methods: ManyToMany<typeof Method>
}
