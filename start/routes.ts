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
import CollectionsController from '#controllers/entries_controller'
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
    router.get('/', [HuntsController, 'index'])
    router.get('/:id', [HuntsController, 'show'])
    router.post('/', [HuntsController, 'store'])
    router.delete('/:id', [HuntsController, 'destroy'])
    router.patch('/:id/increment', [HuntsController, 'incrementCounter'])
    router.patch('/:id/decrement', [HuntsController, 'decrementCounter'])
    router.patch('/:id/pause', [HuntsController, 'pauseTimer'])
    router.patch('/:id/resume', [HuntsController, 'resumeTimer'])
    router.patch('/:id/finish', [HuntsController, 'finish'])
    router.patch('/:id/abandon', [HuntsController, 'abandon'])
  })
  .prefix('hunts')
  // Create and use the middleware that makes sure the user is the one who created the collection
  .use(middleware.auth())

// Collection Entries CRUD
router
  .group(() => {
    router.get('/', [EntriesController, 'index'])
    router.get('/:id', [EntriesController, 'show'])
    router.post('/', [EntriesController, 'store'])
    router.patch('/:id', [EntriesController, 'update'])
    router.delete('/:id', [EntriesController, 'destroy'])
  })
  .prefix('collection')
  .use(middleware.verifyUserOwnershipEntry())
