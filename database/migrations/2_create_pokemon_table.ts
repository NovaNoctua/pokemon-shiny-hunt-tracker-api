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
      table
        .enum('type1', [
          'Normal',
          'Fire',
          'Water',
          'Grass',
          'Electric',
          'Ice',
          'Fighting',
          'Poison',
          'Ground',
          'Flying',
          'Psychic',
          'Bug',
          'Rock',
          'Ghost',
          'Dragon',
          'Dark',
          'Steel',
          'Fairy',
        ])
        .notNullable()
      table
        .enum('type2', [
          'Normal',
          'Fire',
          'Water',
          'Grass',
          'Electric',
          'Ice',
          'Fighting',
          'Poison',
          'Ground',
          'Flying',
          'Psychic',
          'Bug',
          'Rock',
          'Ghost',
          'Dragon',
          'Dark',
          'Steel',
          'Fairy',
        ])
        .nullable()
      table.enum('form', ['Alola', 'Galar', 'Hisui', 'Paldea'])
      table.string('image_path').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
