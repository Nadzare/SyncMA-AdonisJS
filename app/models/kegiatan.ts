import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Organisasi from './organisasi.js'
import Lokasi from './lokasi.js'
import Kepanitiaan from './kepanitiaan.js'

export default class Kegiatan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama: string

  @column.date()
  declare tgl_pelaksanaan: DateTime

  @column()
  declare organisasiId: number

  @column()
  declare lokasiId: number

  @belongsTo(() => Organisasi)
  declare organisasi: BelongsTo<typeof Organisasi>

  @belongsTo(() => Lokasi)
  declare lokasi: BelongsTo<typeof Lokasi>

  @hasMany(() => Kepanitiaan)
  declare kepanitiaan: HasMany<typeof Kepanitiaan>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
