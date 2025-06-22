import type { HttpContext } from '@adonisjs/core/http'
import Organisasi from '#models/organisasi'
import { createOrganisasiValidator, updateOrganisasiValidator } from '#validators/organisasi'

export default class OrganisasiController {
  async index({ view }: HttpContext) {
    // 1. Gunakan nama jamak untuk variabelnya
    const organisasis = await Organisasi.all()

    // 2. Kirim objek dengan key 'organisasis' (jamak)
    return view.render('pages/organisasi/index', { organisasis })
  }
  async create({ view }: HttpContext) {
    return view.render('pages/organisasi/create')
  }

  async store({ request, response, session }: HttpContext) {
    const data = await request.all()
    console.log('Received data:', data)
    try {
      const validatedData = await createOrganisasiValidator.validate(data)
      console.log('Validated data:', validatedData)
      const organisasi = await Organisasi.create(validatedData)
      console.log('Organisasi created:', organisasi)
      session.flash('success', 'Organisasi berhasil dibuat!')
      return response.redirect('/organisasi')
    } catch (error) {
      console.log('Error:', error.message, error.stack)
      session.flash('error', error.message || 'Gagal membuat organisasi.')
      return response.redirect().back()
    }
  }

  async edit({ params, view }: HttpContext) {
    const organisasi = await Organisasi.findOrFail(params.id)
    console.log('Fetched organisasi for edit:', organisasi)
    return view.render('pages/organisasi/edit', { organisasi })
  }

  async update({ params, request, response, session }: HttpContext) {
    const organisasi = await Organisasi.findOrFail(params.id)
    const data = await request.all()
    console.log('Update data:', data)
    try {
      const validatedData = await updateOrganisasiValidator.validate(data)
      console.log('Validated data:', validatedData)
      organisasi.merge(validatedData)
      await organisasi.save()
      console.log('Organisasi updated:', organisasi)
      session.flash('success', 'Organisasi berhasil diperbarui!')
      return response.redirect('/organisasi')
    } catch (error) {
      console.log('Error:', error.message, error.stack)
      session.flash('error', error.message || 'Gagal memperbarui organisasi.')
      return response.redirect().back()
    }
  }

  async destroy({ params, response, session }: HttpContext) {
    const organisasi = await Organisasi.findOrFail(params.id)
    try {
      await organisasi.delete()
      console.log('Organisasi deleted:', organisasi.id)
      session.flash('success', 'Organisasi berhasil dihapus!')
    } catch (error) {
      console.log('Error:', error.message, error.stack)
      session.flash('error', 'Gagal menghapus organisasi.')
    }
    return response.redirect('/organisasi')
  }
}