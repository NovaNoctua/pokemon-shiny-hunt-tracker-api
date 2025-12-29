import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'games'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      // Attributes
      table.increments('id').notNullable()
      table.string('name').notNullable()
      table.integer('generation').notNullable()
      table
        .enum('platform', [
          'Game Boy',
          'Game Boy Color',
          'Game Boy Advance',
          'Nintendo DS',
          'Nintendo 3DS',
          'Nintendo Switch',
        ])
        .notNullable()
      table.string('image_path').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
