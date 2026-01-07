import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'games'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      // PK
      table.increments('id').notNullable()

      // Attributes
      table.string('name').notNullable()
      table.integer('generation').notNullable()
      table.string('platform').notNullable()
      table.string('image_path').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
