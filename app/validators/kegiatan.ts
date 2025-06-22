import vine from '@vinejs/vine'

import { DateTime } from 'luxon'

export const kegiatanValidator = vine.compile(
  vine.object({
    nama: vine.string().minLength(3),
    tgl_pelaksanaan: vine.date().transform((value) => DateTime.fromJSDate(value)),
    organisasi_id: vine.number(),
    lokasi_id: vine.number(),
  })
)

