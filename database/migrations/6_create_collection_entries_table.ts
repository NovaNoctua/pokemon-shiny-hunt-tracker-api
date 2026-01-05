import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'collection_entries'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      // PK
      table.increments('id')

      // Attributes
      table.string('nickname')
      table.timestamp('obtained_at')
      table.integer('final_counter')
      table.text('notes')
      table.integer('phase_number')
      table.timestamp('created_at')
      table.timestamp('updated_at')

      // FK
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()

      table
        .integer('pokemon_id')
        .unsigned()
        .references('id')
        .inTable('pokemon')
        .onDelete('CASCADE')
        .notNullable()

      table
        .integer('game_id')
        .unsigned()
        .references('id')
        .inTable('games')
        .onDelete('CASCADE')
        .notNullable()

      table
        .integer('method_id')
        .unsigned()
        .references('id')
        .inTable('methods')
        .onDelete('CASCADE')
        .notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
