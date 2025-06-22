import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'

export default class AuthController {
  async showLogin({ view }: HttpContext) {
    return view.render('auth/login')
  }

  async login({ request, auth, response, session }: HttpContext) {
    const payload = await request.all()
    try {
      await loginValidator.validate(payload)
      const user = await User.verifyCredentials(payload.email, payload.password)
      await auth.use('web').login(user)
      session.flash('success', 'Login berhasil!')
      return response.redirect('/dashboard')
    } catch (error) {
      session.flash('error', error.message || 'Email atau password salah')
      return response.redirect('/login')
    }
  }

  async showRegister({ view }: HttpContext) {
    return view.render('auth/register')
  }

  async register({ request, response, session }: HttpContext) {
    const data = await request.all()
    try {
      const validatedData = await registerValidator.validate(data)
      await User.create({
        fullName: validatedData.fullName,
        email: validatedData.email,
        password: validatedData.password,
      })
      session.flash('success', 'Berhasil daftar! Silakan login.')
      return response.redirect('/login')
    } catch (error) {
      session.flash('error', error.message || 'Gagal mendaftar. Silakan coba lagi.')
      return response.redirect('/register')
    }
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }
}