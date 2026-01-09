import Hunt from '#models/hunt'
import { huntValidator } from '#validators/hunt'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class HuntsController {
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    const userId = user.id

    const hunts = await Hunt.query().where('user_id', userId)

    return response.ok(hunts)
  }

  async show({ params, response }: HttpContext) {
    const hunt = await Hunt.findOrFail(params.id)
    // const hunt = await Hunt.query().where('id', params.id).firstOrFail()

    await hunt.load('game')
    await hunt.load('method')
    await hunt.load('pokemon')

    return response.ok(hunt)
  }
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
      return response.internalServerError('Internal server error')
    }

    return response.ok(hunt)
  }
  async destroy({ params, response }: HttpContext) {
    const hunt = await Hunt.findOrFail(params.id)

    await hunt.delete()

    return response.ok({ message: 'Hunt successfully deleted', hunt: hunt })
  }
  async incrementCounter() {}
  async decrementCounter() {}
  async pauseTimer() {}
  async resumeTimer() {}
  async finish() {}
  async abandon() {}
}
