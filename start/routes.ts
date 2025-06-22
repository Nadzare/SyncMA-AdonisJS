import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'



// --- Lazy import Controllers ---
const AuthController = () => import('#controllers/auth_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const AnggotaController = () => import('#controllers/anggotas_controller') // ✅ sesuai nama file
const OrganisasiController = () => import('#controllers/organisasis_controller') // ✅ sesuai nama file
const LokasiController = () => import('#controllers/lokasis_controller')
const KegiatanController = () => import('#controllers/kegiatans_controller')
const KepanitiaanController = () => import('#controllers/kepanitiaans_controller')

// --- Auth Routes ---
router
  .group(() => {
    router.get('/login', [AuthController, 'showLogin'])
    router.post('/login', [AuthController, 'login'])
    router.get('/register', [AuthController, 'showRegister'])
    router.post('/register', [AuthController, 'register'])
  })


router.get('/logout', [AuthController, 'logout']).use(middleware.auth())

router
  .group(() => {
    router.get('/dashboard', [DashboardController, 'index'])
    router.resource('anggota', AnggotaController)
    router.resource('organisasi', OrganisasiController)
    router.resource('/lokasi', LokasiController)
    router.resource('/kegiatan', KegiatanController)

    // --- Rute Kepanitiaan (Digabungkan agar rapi) ---
    router
      .get('/kegiatan/:kegiatan_id/kepanitiaan', [KepanitiaanController, 'index'])
      .as('kepanitiaan.index')
      
    // Ini route yang diperbaiki
    router
      .get('/kegiatan/:kegiatan_id/panitia/create', [KepanitiaanController, 'create'])
      .as('kepanitiaan.create')

    router
      .post('/kegiatan/:kegiatan_id/panitia', [KepanitiaanController, 'store'])
      .as('kepanitiaan.store')

    router
      .delete('/kegiatan/:kegiatan_id/panitia/:id', [KepanitiaanController, 'destroy'])
      .as('kepanitiaan.destroy')

    router
      .get('/kegiatan/:kegiatan_id/panitia/:id/edit', [KepanitiaanController, 'edit'])
      .as('kepanitiaan.edit')

  })
  .use(middleware.auth())




// --- Landing Page ---
router.get('/', async ({ view }) => {
  return view.render('pages/landing')
})
