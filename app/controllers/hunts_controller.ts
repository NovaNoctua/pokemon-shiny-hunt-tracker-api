import Hunt from '#models/hunt'
import type { HttpContext } from '@adonisjs/core/http'

export default class HuntsController {
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    const userId = user.id

    const hunts = await Hunt.query().where('user_id', userId)

    return response.ok(hunts)
  }

  async show({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const userId = user.id

    const hunt = await Hunt.query().where('id', params.id).where('user_id', userId).first()

    if (hunt) {
      return response.ok(hunt)
    } else {
      return response.notFound()
    }
  }
  async store({ request, auth, response }: HttpContext) {
    const { pokemonId, gameId, methodId }
  }
  async destroy() {}
  async incrementCounter() {}
  async decrementCounter() {}
  async pauseTimer() {}
  async resumeTimer() {}
  async finish() {}
  async abandon() {}
}
