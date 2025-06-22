import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Kegiatan from './kegiatan.js'

export default class Lokasi extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama_lokasi: string

  @column()
  declare alamat: string

  @hasMany(() => Kegiatan)
  declare kegiatans: HasMany<typeof Kegiatan>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
