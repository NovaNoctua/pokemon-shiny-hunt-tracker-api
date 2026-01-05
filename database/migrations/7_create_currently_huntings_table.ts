import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'currently_huntings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      // PK
      table.increments('id')

      // Attributes
      table.timestamp('started_at')
      table.timestamp('last_started')
      table.timestamp('last_stopped')
      table.integer('timer')
      table.integer('current_counter')
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
