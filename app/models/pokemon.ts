import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import CollectionEntry from './collection_entry.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import CurrentlyHunting from './currently_hunting.js'

export default class Pokemon extends BaseModel {
  // Attributes
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare dexNumber: number

  @column()
  declare generation: number

  @column({ columnName: 'type1' })
  declare type1: string

  @column({ columnName: 'type2' })
  declare type2: string | null

  @column()
  declare imagePath: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations
  @hasMany(() => CollectionEntry)
  declare collectionEntries: HasMany<typeof CollectionEntry>

  @hasMany(() => CurrentlyHunting)
  declare currentlyHunting: HasMany<typeof CurrentlyHunting>
}
