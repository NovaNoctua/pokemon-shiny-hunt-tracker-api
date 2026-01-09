/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import UsersController from '#controllers/users_controller'
import PokemonController from '#controllers/pokemon_controller'
import GamesController from '#controllers/games_controller'
import MethodsController from '#controllers/methods_controller'
import HuntsController from '#controllers/hunts_controller'
import EntriesController from '#controllers/entries_controller'

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
  .prefix('users/myself')
  .use(middleware.auth())

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
  })
  .prefix('hunts')
// Create and use the middleware that makes sure the user is the one who created the collection

// Collection Entries CRUD
router
  .group(() => {
    router.get('/', [EntriesController, 'index']).use(middleware.auth())
    router.get('/:id', [EntriesController, 'show']).use(middleware.verifyUserOwnershipEntry())
    router.post('/', [EntriesController, 'store']).use(middleware.auth())
    router.patch('/:id', [EntriesController, 'update']).use(middleware.verifyUserOwnershipEntry())
    router.delete('/:id', [EntriesController, 'destroy']).use(middleware.verifyUserOwnershipEntry())
  })
  .prefix('entries')
