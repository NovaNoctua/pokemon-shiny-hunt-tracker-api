import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import CollectionEntry from './collection_entry.js'
import CurrentlyHunting from './currently_hunting.js'
import MethodsInGame from './methods_in_game.js'

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
  @hasMany(() => CollectionEntry)
  declare collectionEntries: HasMany<typeof CollectionEntry>

  @hasMany(() => CurrentlyHunting)
  declare currentlyHunting: HasMany<typeof CurrentlyHunting>

  @hasMany(() => MethodsInGame)
  declare methodsInGame: HasMany<typeof MethodsInGame>
}
