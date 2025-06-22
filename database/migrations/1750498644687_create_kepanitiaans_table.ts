import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'kepanitiaans'

 async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('kegiatan_id')
        .unsigned()
        .references('id')
        .inTable('kegiatans')
        .onDelete('CASCADE')
      table
        .integer('anggota_id')
        .unsigned()
        .references('id')
        .inTable('anggotas')
        .onDelete('CASCADE')
      table.string('jabatan').notNullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}