import Game from '#models/game'
import type { HttpContext } from '@adonisjs/core/http'

export default class GamesController {
  async index({ response }: HttpContext) {
    const games = await Game.query()
      .orderBy('generation', 'asc')
      .orderBy('id', 'asc')
      .preload('methods')
    return response.ok(games)
  }

  async show({ params, response }: HttpContext) {
    const game = await Game.query().where('id', params.id).preload('methods').firstOrFail()
    return response.ok(game)
  }
}
