import Game from '#models/game'
import type { HttpContext } from '@adonisjs/core/http'

export default class GamesController {
  /**
   * List all games
   */
  async index({ response }: HttpContext) {
    const games = await Game.query()
      .orderBy('generation', 'asc')
      .orderBy('id', 'asc')
      .preload('methods')
    return response.ok(games)
  }

  /**
   * Show a single game by ID
   */
  async show({ params, response }: HttpContext) {
    const game = await Game.query().where('id', params.id).preload('methods').firstOrFail()
    return response.ok(game)
  }
}
