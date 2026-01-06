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

  @column()
  declare type1:
    | 'Normal'
    | 'Fire'
    | 'Water'
    | 'Grass'
    | 'Electric'
    | 'Ice'
    | 'Fighting'
    | 'Poison'
    | 'Ground'
    | 'Flying'
    | 'Psychic'
    | 'Bug'
    | 'Rock'
    | 'Ghost'
    | 'Dragon'
    | 'Dark'
    | 'Steel'
    | 'Fairy'

  @column()
  declare type2:
    | 'Normal'
    | 'Fire'
    | 'Water'
    | 'Grass'
    | 'Electric'
    | 'Ice'
    | 'Fighting'
    | 'Poison'
    | 'Ground'
    | 'Flying'
    | 'Psychic'
    | 'Bug'
    | 'Rock'
    | 'Ghost'
    | 'Dragon'
    | 'Dark'
    | 'Steel'
    | 'Fairy'

  @column()
  declare form: 'Alola' | 'Galar' | 'Hisui' | 'Paldea'

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
