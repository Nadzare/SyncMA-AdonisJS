import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Organisasi from './organisasi.js'

export default class Anggota extends BaseModel {
  public static table = 'anggotas'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama: string

  @column()
  declare nim: string

  @column()
  declare organisasiId: number

@belongsTo(() => Organisasi, {
  foreignKey: 'organisasiId',
})
declare organisasi: BelongsTo<typeof Organisasi>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}