import vine from '@vinejs/vine'

// Validator untuk create & update
export const lokasiValidator = vine.compile(
  vine.object({
    nama_lokasi: vine.string().trim().minLength(3),
    alamat: vine.string().trim().minLength(5),
  })
)
