import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Entry from './entry.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Hunt from './hunt.js'

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
  @hasMany(() => Entry)
  declare entries: HasMany<typeof Entry>

  @hasMany(() => Hunt)
  declare hunts: HasMany<typeof Hunt>
}
