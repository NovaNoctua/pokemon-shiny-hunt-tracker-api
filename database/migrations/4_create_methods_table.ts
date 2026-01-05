import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'methods'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      // PK
      table.increments('id')

      // Attributes
      table.string('name')
      table.string('base_odds')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
