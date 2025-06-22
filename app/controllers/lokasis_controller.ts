import type { HttpContext } from '@adonisjs/core/http'
import Lokasi from '#models/lokasi'
import { lokasiValidator } from '#validators/lokasi'

export default class LokasisController {
  async index({ view }: HttpContext) {
    const lokasis = await Lokasi.all()
    return view.render('pages/lokasi/index', { lokasis })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/lokasi/create')
  }

  async store({ request, response, session }: HttpContext) {
    const data = await request.all()
    try {
      const validated = await lokasiValidator.validate(data)
      await Lokasi.create(validated)
      session.flash('success', 'Lokasi berhasil ditambahkan!')
      return response.redirect('/lokasi')
    } catch (error) {
      session.flash('error', error.message || 'Gagal menambahkan lokasi.')
      return response.redirect().back()
    }
  }

  async edit({ params, view }: HttpContext) {
    const lokasi = await Lokasi.findOrFail(params.id)
    return view.render('pages/lokasi/edit', { lokasi })
  }

  async update({ params, request, response, session }: HttpContext) {
    const lokasi = await Lokasi.findOrFail(params.id)
    const data = await request.all()

    try {
      const validated = await lokasiValidator.validate(data)
      lokasi.merge(validated)
      await lokasi.save()
      session.flash('success', 'Lokasi berhasil diperbarui!')
      return response.redirect('/lokasi')
    } catch (error) {
      session.flash('error', error.message || 'Gagal memperbarui lokasi.')
      return response.redirect().back()
    }
  }

  async destroy({ params, response, session }: HttpContext) {
    const lokasi = await Lokasi.findOrFail(params.id)
    try {
      await lokasi.delete()
      session.flash('success', 'Lokasi berhasil dihapus!')
    } catch (error) {
      session.flash('error', 'Gagal menghapus lokasi.')
    }
    return response.redirect('/lokasi')
  }
}
