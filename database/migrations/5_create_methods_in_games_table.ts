import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'methods_in_games'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      //PK
      table.increments('id')

      // Attributes
      table.timestamp('created_at')
      table.timestamp('updated_at')

      //FK
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
