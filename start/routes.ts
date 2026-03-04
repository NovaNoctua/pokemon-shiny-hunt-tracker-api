/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const UsersController = () => import('#controllers/users_controller')
const PokemonController = () => import('#controllers/pokemon_controller')
const GamesController = () => import('#controllers/games_controller')
const MethodsController = () => import('#controllers/methods_controller')
const HuntsController = () => import('#controllers/hunts_controller')
const CollectionController = () => import('#controllers/collection_controller')

// Authentication
router
  .group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
    router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  })
  .prefix('auth')

// User actions
router
  .group(() => {
    router.get('/', [UsersController, 'show'])
    router.patch('/', [UsersController, 'update'])
    router.delete('/', [UsersController, 'destroy'])
  })
  .prefix('users/me')
  .use(middleware.auth())

router.get('/uploads/profilePictures/:filename', [UsersController, 'showProfilePicture'])

// Pokemon read
router
  .group(() => {
    router.get('/', [PokemonController, 'index'])
    router.get('/:id', [PokemonController, 'show'])
  })
  .prefix('pokemon')
  .use(middleware.auth())

// Games read
router
  .group(() => {
    router.get('/', [GamesController, 'index'])
    router.get('/:id', [GamesController, 'show'])
  })
  .prefix('games')
  .use(middleware.auth())

// Methods read
router
  .group(() => {
    router.get('/', [MethodsController, 'index'])
    router.get('/:id', [MethodsController, 'show'])
  })
  .prefix('methods')
  .use(middleware.auth())

// Currently hunting CRUD
router
  .group(() => {
    router.get('/', [HuntsController, 'index']).use(middleware.auth())
    router.get('/:id', [HuntsController, 'show']).use(middleware.verifyUserOwnershipHunt())
    router.post('/', [HuntsController, 'store']).use(middleware.auth())
    router.delete('/:id', [HuntsController, 'destroy']).use(middleware.verifyUserOwnershipHunt())
    router
      .patch('/:id/increment', [HuntsController, 'incrementCounter'])
      .use(middleware.verifyUserOwnershipHunt())
    router
      .patch('/:id/decrement', [HuntsController, 'decrementCounter'])
      .use(middleware.verifyUserOwnershipHunt())
    router
      .patch('/:id/pause', [HuntsController, 'pauseTimer'])
      .use(middleware.verifyUserOwnershipHunt())
    router
      .patch('/:id/resume', [HuntsController, 'resumeTimer'])
      .use(middleware.verifyUserOwnershipHunt())
    router
      .post('/:id/finish', [HuntsController, 'finish'])
      .use(middleware.verifyUserOwnershipHunt())
    router
      .patch('/:id/sync', [HuntsController, 'sync'])
      .use(middleware.verifyUserOwnershipHunt())
  })
  .prefix('hunts')
// Create and use the middleware that makes sure the user is the one who created the collection

// Captured Shinies Collection CRUD
router
  .group(() => {
    router.get('/', [CollectionController, 'index']).use(middleware.auth())
    router
      .get('/:id', [CollectionController, 'show'])
      .use(middleware.verifyOwnershipCapturedShiny())
    router.post('/', [CollectionController, 'store']).use(middleware.auth())
    router
      .patch('/:id', [CollectionController, 'update'])
      .use(middleware.verifyOwnershipCapturedShiny())
    router
      .delete('/:id', [CollectionController, 'destroy'])
      .use(middleware.verifyOwnershipCapturedShiny())
  })
  .prefix('collection')
