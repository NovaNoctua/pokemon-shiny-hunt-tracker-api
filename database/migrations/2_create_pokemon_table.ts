import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pokemon'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      // PK
      table.increments('id').notNullable()

      // Attributes
      table.string('name').notNullable()
      table.integer('dex_number').notNullable()
      table.integer('generation').notNullable()
      table.string('type1').notNullable()
      table.string('type2').nullable()
      table.string('image_path').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
