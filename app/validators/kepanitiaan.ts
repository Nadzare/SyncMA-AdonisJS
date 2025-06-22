import vine from '@vinejs/vine'

export const kepanitiaanValidator = vine.compile(
  vine.object({
    anggota_id: vine.number().exists(async (db, value) => {
      const result = await db.from('anggotas').where('id', value).first()
      return !!result // return true jika ditemukan, false jika tidak
    }),
    jabatan: vine.string().minLength(3),
  })
)
