import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Kegiatan from './kegiatan.js'
import Anggota from './anggota.js'

export default class Organisasi extends BaseModel {
  public static table = 'organisasis' // Sesuaikan dengan nama tabel di migrasi

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare namaOrganisasi: string

  @column()
  declare jenis: string

  @hasMany(() => Kegiatan)
  declare kegiatans: HasMany<typeof Kegiatan>

  @hasMany(() => Anggota)
  declare anggotas: HasMany<typeof Anggota>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}