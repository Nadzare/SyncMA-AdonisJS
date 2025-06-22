import type { HttpContext } from '@adonisjs/core/http'
import Organisasi from '#models/organisasi'
import Lokasi from '#models/lokasi'
import Anggota from '#models/anggota'
import Kegiatan from '#models/kegiatan'
import Kepanitiaan from '#models/kepanitiaan'

export default class DashboardController {
  async index({ view }: HttpContext) {
    const organisasiCount = await Organisasi.query().count('* as total').then(([r]) => Number(r.$extras.total))
    const lokasiCount = await Lokasi.query().count('* as total').then(([r]) => Number(r.$extras.total))
    const anggotaCount = await Anggota.query().count('* as total').then(([r]) => Number(r.$extras.total))
    const kegiatanCount = await Kegiatan.query().count('* as total').then(([r]) => Number(r.$extras.total))
    const panitiaCount = await Kepanitiaan.query().count('* as total').then(([r]) => Number(r.$extras.total))

    return view.render('pages/dashboard', {
      organisasiCount,
      lokasiCount,
      anggotaCount,
      kegiatanCount,
      panitiaCount
    })
  }
}
