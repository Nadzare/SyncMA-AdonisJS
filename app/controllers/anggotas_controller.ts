import type { HttpContext } from '@adonisjs/core/http'
import Anggota from '#models/anggota'
import Organisasi from '#models/organisasi'
import { createAnggotaValidator, updateAnggotaValidator } from '#validators/anggota'

export default class AnggotaController {
  async index({ view }: HttpContext) {
    const anggota = await Anggota.query().preload('organisasi')
    return view.render('pages/anggota/index', { anggota })
  }

  async create({ view }: HttpContext) {
    // 🛠 FIX: Ambil semua data organisasi (tanpa filter user_id)
    const organisasi = await Organisasi.all()
    return view.render('pages/anggota/create', { organisasi })
  }

  async store({ request, response, session }: HttpContext) {
    const data = await request.all()
    try {
      const validatedData = await createAnggotaValidator.validate(data)
      await Anggota.create(validatedData)
      session.flash('success', 'Anggota berhasil dibuat!')
      return response.redirect('/anggota')
    } catch (error) {
      session.flash('error', error.message || 'Gagal membuat anggota.')
      return response.redirect().back()
    }
  }

  async edit({ params, view }: HttpContext) {
    const anggota = await Anggota.findOrFail(params.id)
    // 🛠 FIX: Ambil semua organisasi (tanpa filter user_id)
    const organisasi = await Organisasi.all()
    return view.render('pages/anggota/edit', { anggota, organisasi })
  }

  async update({ params, request, response, session }: HttpContext) {
    const anggota = await Anggota.findOrFail(params.id)
    const data = await request.all()
    try {
      const validatedData = await updateAnggotaValidator.validate(data)
      anggota.merge(validatedData)
      await anggota.save()
      session.flash('success', 'Anggota berhasil diperbarui!')
      return response.redirect('/anggota')
    } catch (error) {
      session.flash('error', error.message || 'Gagal memperbarui anggota.')
      return response.redirect().back()
    }
  }

  async destroy({ params, response, session }: HttpContext) {
    const anggota = await Anggota.findOrFail(params.id)
    try {
      await anggota.delete()
      session.flash('success', 'Anggota berhasil dihapus!')
    } catch (error) {
      session.flash('error', 'Gagal menghapus anggota.')
    }
    return response.redirect('/anggota')
  }
}
