import CapturedShiny from '#models/captured_shiny'
import Hunt from '#models/hunt'
import { capturedShinyHuntValidator } from '#validators/captured_shiny'
import { huntValidator } from '#validators/hunt'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class HuntsController {
  /**
   * List all hunts for the authenticated user
   */
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    const userId = user.id

    const hunts = await Hunt.query()
      .where('user_id', userId)
      .preload('game')
      .preload('method')
      .preload('pokemon')
      .orderBy('created_at', 'desc')

    return response.ok(hunts)
  }

  /**
   * Show a single hunt by ID
   */
  async show({ params, response }: HttpContext) {
    const hunt = await Hunt.findOrFail(params.id)
    // const hunt = await Hunt.query().where('id', params.id).firstOrFail()

    await hunt.load('game')
    await hunt.load('method')
    await hunt.load('pokemon')

    return response.ok(hunt)
  }

  /**
   * Create a new hunt
   */
  async store({ request, auth, response }: HttpContext) {
    const user = auth.user!

    const { pokemonId, gameId, methodId } = await request.validateUsing(huntValidator)
    const userId = user.id
    const startedAt = DateTime.now()
    const lastStarted = startedAt
    const lastStopped = null
    const timer = 0
    const currentCounter = 0

    const hunt = await Hunt.create({
      startedAt,
      lastStarted,
      lastStopped,
      timer,
      currentCounter,
      userId,
      pokemonId,
      gameId,
      methodId,
    })

    if (!hunt.id) {
      return response.internalServerError('Internal server error.')
    }

    return response.ok(hunt)
  }

  /**
   * Delete a hunt
   */
  async destroy({ params, response }: HttpContext) {
    const hunt = await Hunt.findOrFail(params.id)

    await hunt.delete()

    return response.ok({ message: 'Hunt successfully deleted.', hunt: hunt })
  }

  /**
   * Increment the hunt counter
   */
  async incrementCounter({ params, response }: HttpContext) {
    const hunt = await Hunt.findOrFail(params.id)
    const currentCounter = hunt.currentCounter + 1

    await hunt.merge({ currentCounter }).save()

    return response.ok({ message: 'Counter incremented.', counter: hunt.currentCounter })
  }

  /**
   * Decrement the hunt counter
   */
  async decrementCounter({ params, response }: HttpContext) {
    const hunt = await Hunt.findOrFail(params.id)

    if (hunt.currentCounter > 0) {
      const currentCounter = hunt.currentCounter - 1
      await hunt.merge({ currentCounter }).save()
      return response.ok({ message: 'Counter decremented.', counter: hunt.currentCounter })
    } else {
      return response.badRequest({ message: 'Cannot decrement the counter anymore.' })
    }
  }

  /**
   * Pause the hunt timer
   */
  async pauseTimer({ params, response }: HttpContext) {
    const hunt = await Hunt.findOrFail(params.id)

    const lastStopped = DateTime.now()
    if (hunt.lastStopped && hunt.lastStopped > hunt.lastStarted) {
      return response.badRequest({ message: 'You cannot pause a hunt without resuming it first' })
    }

    const timer = hunt.timer + lastStopped.diff(hunt.lastStarted, 'seconds').seconds

    await hunt.merge({ lastStopped, timer }).save()
    return response.ok({ message: 'Timer paused.', hunt: hunt })
  }

  /**
   * Resume the hunt timer
   */
  async resumeTimer({ params, response }: HttpContext) {
    const hunt = await Hunt.findOrFail(params.id)
    const lastStarted = DateTime.now()

    await hunt.merge({ lastStarted }).save()

    return response.ok({ message: 'Timer resumed.', hunt: hunt })
  }

  /**
   * Finish a hunt and convert it to an entry
   */
  async finish({ auth, params, request, response }: HttpContext) {
    const user = auth.user!
    const hunt = await Hunt.findOrFail(params.id)

    const {
      nickname = hunt.pokemon.name,
      notes = '',
      phaseNumber = 0,
    } = await request.validateUsing(capturedShinyHuntValidator)
    const obtainedAt = DateTime.now()
    const finalCounter = hunt.currentCounter
    const userId = user.id
    const pokemonId = hunt.pokemonId
    const gameId = hunt.gameId
    const methodId = hunt.methodId

    const capturedShiny = await CapturedShiny.create({
      nickname,
      notes,
      phaseNumber,
      obtainedAt,
      finalCounter,
      userId,
      pokemonId,
      gameId,
      methodId,
    })

    if (!capturedShiny.id) {
      return response.internalServerError('Internal server error.')
    }

    await hunt.delete()

    return response.ok(capturedShiny)
  }
}
