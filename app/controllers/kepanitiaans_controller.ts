// file: app/controllers/kepanitiaans_controller.ts

import type { HttpContext } from '@adonisjs/core/http'
import Kepanitiaan from '#models/kepanitiaan'
import Kegiatan from '#models/kegiatan'
import Anggota from '#models/anggota'
import { kepanitiaanValidator } from '#validators/kepanitiaan'
import db from '@adonisjs/lucid/services/db'

/**
 * @class KepanitiaanController
 * @description Mengelola semua aksi terkait data kepanitiaan dalam sebuah kegiatan,
 * mulai dari menampilkan, menambah, mengubah, hingga menghapus panitia.
 */
export default class KepanitiaanController {
  /**
   * @method index
   * @description Menampilkan halaman daftar panitia untuk sebuah kegiatan.
   * @param {HttpContext} ctx - Konteks HTTP Request.
   * @returns {Promise<any>} Rendered view dengan daftar panitia.
   */
  async index({ params, view }: HttpContext) {
    const kegiatan = await Kegiatan.findOrFail(params.kegiatan_id)
    await kegiatan.load('kepanitiaan', (query) => query.preload('anggota'))

    return view.render('pages/kepanitiaan/index', { kegiatan })
  }

  /**
   * @method create
   * @description Menampilkan halaman dengan form untuk menambah panitia baru.
   * @param {HttpContext} ctx - Konteks HTTP Request.
   * @returns {Promise<any>} Rendered view dengan form tambah panitia.
   */
  async create({ params, view }: HttpContext) {
    const kegiatan = await Kegiatan.findOrFail(params.kegiatan_id)
    await kegiatan.load('kepanitiaan') // Load panitia yang sudah ada untuk filtering

    // Ambil semua anggota yang BELUM menjadi panitia di kegiatan ini
    const anggotaIdsInPanitia = kegiatan.kepanitiaan.map((p) => p.anggotaId)
    const anggotas = await Anggota.query().whereNotIn('id', anggotaIdsInPanitia)

    return view.render('pages/kepanitiaan/create', { kegiatan, anggotas })
  }

  /**
   * @method store
   * @description Menyimpan data panitia baru dari form `create`.
   * @param {HttpContext} ctx - Konteks HTTP Request.
   * @returns {Promise<any>} Redirect ke halaman index panitia.
   */
  async store({ request, params, response, session }: HttpContext) {
    const trx = await db.transaction()
    try {
      const payload = await kepanitiaanValidator.validate(request.all())

      await Kepanitiaan.create(
        {
          kegiatanId: Number(params.kegiatan_id),
          anggotaId: payload.anggota_id,
          jabatan: payload.jabatan,
        },
        { client: trx }
      )

      await trx.commit()
      session.flash('success', 'Panitia baru berhasil ditambahkan.')
      return response.redirect().toRoute('kepanitiaan.index', { kegiatan_id: params.kegiatan_id })
    } catch (error) {
      await trx.rollback()
      session.flash('error', error.message || 'Gagal menambahkan panitia.')
      return response.redirect().back()
    }
  }

  /**
   * @method show
   * @description Menampilkan detail dari satu record panitia (opsional, tapi baik untuk kelengkapan).
   * @param {HttpContext} ctx - Konteks HTTP Request.
   * @returns {Promise<any>} Rendered view dengan detail panitia.
   */
  async show({ params, view }: HttpContext) {
    const panitia = await Kepanitiaan.findOrFail(params.id)
    await panitia.load('kegiatan')
    await panitia.load('anggota')

    return view.render('pages/kepanitiaan/show', { panitia })
  }

  /**
   * @method edit
   * @description Menampilkan halaman form untuk mengedit jabatan seorang panitia.
   * @param {HttpContext} ctx - Konteks HTTP Request.
   * @returns {Promise<any>} Rendered view dengan form edit panitia.
   */
  async edit({ params, view }: HttpContext) {
    const panitia = await Kepanitiaan.findOrFail(params.id)
    await panitia.load('kegiatan')
    await panitia.load('anggota')

    return view.render('pages/kepanitiaan/edit', { panitia })
  }

  /**
   * @method update
   * @description Memperbarui data jabatan panitia dari form `edit`.
   * @param {HttpContext} ctx - Konteks HTTP Request.
   * @returns {Promise<any>} Redirect ke halaman index panitia.
   */
  async update({ params, request, response, session }: HttpContext) {
    const panitia = await Kepanitiaan.findOrFail(params.id)
    try {
      const payload = await request.validateUsing(kepanitiaanValidator)

      panitia.jabatan = payload.jabatan
      await panitia.save()

      session.flash('success', 'Jabatan panitia berhasil diperbarui.')
      return response.redirect().toRoute('kepanitiaan.index', { kegiatan_id: panitia.kegiatanId })
    } catch (error) {
      session.flash('error', error.message || 'Gagal memperbarui data.')
      return response.redirect().back()
    }
  }

  /**
   * @method destroy
   * @description Menghapus seorang panitia dari kegiatan.
   * @param {HttpContext} ctx - Konteks HTTP Request.
   * @returns {Promise<any>} Redirect kembali ke halaman sebelumnya.
   */
  async destroy({ params, response, session }: HttpContext) {
    const panitia = await Kepanitiaan.findOrFail(params.id)
    try {
      await panitia.delete()
      session.flash('success', 'Panitia berhasil dihapus dari kegiatan.')
    } catch (error) {
      session.flash('error', 'Gagal menghapus panitia.')
    }
    return response.redirect().back()
  }
}