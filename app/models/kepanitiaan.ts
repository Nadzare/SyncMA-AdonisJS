import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Kegiatan from './kegiatan.js'
import Anggota from './anggota.js'

export default class Kepanitiaan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare kegiatanId: number

  @column()
  declare anggotaId: number

  @column()
  declare jabatan: string

  @belongsTo(() => Kegiatan)
  declare kegiatan: BelongsTo<typeof Kegiatan>

  @belongsTo(() => Anggota)
  declare anggota: BelongsTo<typeof Anggota>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
