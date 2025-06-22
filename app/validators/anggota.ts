import vine from '@vinejs/vine'

export const createAnggotaValidator = vine.compile(
  vine.object({
    nama: vine.string().trim().minLength(2),
    nim: vine.string().trim().minLength(5),
    organisasi_id: vine.number().exists(async (db, value) => {
      const organisasi = await db.from('organisasis').where('id', value).first()
      return !!organisasi
    }),
  })
)

export const updateAnggotaValidator = vine.compile(
  vine.object({
    nama: vine.string().trim().minLength(2),
    nim: vine.string().trim().minLength(5),
    organisasi_id: vine.number().exists(async (db, value) => {
      const organisasi = await db.from('organisasis').where('id', value).first()
      return !!organisasi
    }),
  })
)