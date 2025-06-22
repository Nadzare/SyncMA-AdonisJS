import type { HttpContext } from '@adonisjs/core/http'
import Kegiatan from '#models/kegiatan'
import Organisasi from '#models/organisasi'
import Lokasi from '#models/lokasi'
import { kegiatanValidator } from '#validators/kegiatan'
import { DateTime } from 'luxon'

export default class KegiatanController {
  // Menampilkan daftar kegiatan
  async index({ view }: HttpContext) {
    const kegiatans = await Kegiatan.query()
      .preload('organisasi')
      .preload('lokasi')

    return view.render('pages/kegiatan/index', { kegiatans })
  }

  // Form tambah kegiatan
  async create({ view }: HttpContext) {
    const organisasis = await Organisasi.all()
    const lokasis = await Lokasi.all()
    return view.render('pages/kegiatan/create', { organisasis, lokasis })
  }

  // Simpan data kegiatan baru
async store({ request, response, session }: HttpContext) {
  try {
    const payload = await request.validateUsing(kegiatanValidator)

    await Kegiatan.create({
      nama: payload.nama,
      tgl_pelaksanaan: payload.tgl_pelaksanaan,
      organisasiId: payload.organisasi_id,
      lokasiId: payload.lokasi_id,
    })

    session.flash('success', 'Kegiatan berhasil ditambahkan!')
    return response.redirect('/kegiatan')
  } catch (error) {
    session.flash('error', error.message || 'Gagal menyimpan kegiatan.')
    return response.redirect().back()
  }
}


  // Form edit
  async edit({ params, view }: HttpContext) {
    const kegiatan = await Kegiatan.findOrFail(params.id)
    const organisasis = await Organisasi.all()
    const lokasis = await Lokasi.all()

    return view.render('pages/kegiatan/edit', { kegiatan, organisasis, lokasis })
  }

  // Update data kegiatan
  async update({ params, request, response, session }: HttpContext) {
    try {
      const kegiatan = await Kegiatan.findOrFail(params.id)
      const payload = await kegiatanValidator.validate(request.all())

      kegiatan.merge({
        nama: payload.nama,
        tgl_pelaksanaan: DateTime.fromISO(payload.tgl_pelaksanaan.toString()),
        organisasiId: payload.organisasi_id,
        lokasiId: payload.lokasi_id,
      })

      await kegiatan.save()
      session.flash('success', 'Kegiatan berhasil diperbarui!')
      return response.redirect('/kegiatan')
    } catch (error) {
      session.flash('error', error.message || 'Gagal memperbarui kegiatan.')
      return response.redirect().back()
    }
  }

  // Hapus kegiatan
  async destroy({ params, response, session }: HttpContext) {
    const kegiatan = await Kegiatan.findOrFail(params.id)
    try {
      await kegiatan.delete()
      session.flash('success', 'Kegiatan berhasil dihapus!')
    } catch (error) {
      session.flash('error', 'Gagal menghapus kegiatan.')
    }

    return response.redirect('/kegiatan')
  }
}
