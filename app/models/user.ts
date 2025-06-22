import { BaseModel, column, beforeSave } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column()
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }

  static async verifyCredentials(email: string, password: string) {
    const user = await this.findBy('email', email)
    if (!user) {
      throw new Error('Invalid credentials')
    }
    const isValid = await hash.verify(user.password, password)
    if (!isValid) {
      throw new Error('Invalid credentials')
    }
    return user
  }
}