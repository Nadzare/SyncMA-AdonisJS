import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'kegiatans'

async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nama').notNullable()
      table.date('tgl_pelaksanaan').notNullable()
      table
        .integer('organisasi_id')
        .unsigned()
        .references('id')
        .inTable('organisasis')
        .onDelete('CASCADE')
      table
        .integer('lokasi_id')
        .unsigned()
        .references('id')
        .inTable('lokasis')
        .onDelete('CASCADE')
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}