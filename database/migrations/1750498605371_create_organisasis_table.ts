import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'organisasis'

  async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nama_organisasi').notNullable()
      table.string('jenis').notNullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}