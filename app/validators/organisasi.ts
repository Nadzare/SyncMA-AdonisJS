import vine from '@vinejs/vine'

export const createOrganisasiValidator = vine.compile(
  vine.object({
    nama_organisasi: vine.string().trim().minLength(2),
    jenis: vine.string().trim().minLength(2),
  })
)

export const updateOrganisasiValidator = vine.compile(
  vine.object({
    nama_organisasi: vine.string().trim().minLength(2),
    jenis: vine.string().trim().minLength(2),
  })
)