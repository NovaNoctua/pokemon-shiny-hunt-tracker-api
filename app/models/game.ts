import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Game extends BaseModel {
  // Attributes
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare generation: number

  @column()
  declare platform:
    | 'Game Boy'
    | 'Game Boy Color'
    | 'Game Boy Advance'
    | 'Nintendo DS'
    | 'Nintendo 3DS'
    | 'Nintendo Switch'

  @column()
  declare imagePath: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations
}
