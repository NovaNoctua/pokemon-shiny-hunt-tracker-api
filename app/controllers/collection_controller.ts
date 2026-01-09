import type { HttpContext } from '@adonisjs/core/http'

import CapturedShiny from '#models/captured_shiny'
import { capturedShinyUpdateValidator, capturedShinyValidator } from '#validators/captured_shiny'

export default class CollectionController {
  /**
   * List all captured shinies for the authenticated user
   */
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    const userId = user.id

    const capturedShinies = await CapturedShiny.query()
      .where('user_id', userId)
      .preload('game')
      .preload('method')
      .preload('pokemon')

    return response.ok(capturedShinies)
  }

  /**
   * Show a single captured shiny by ID
   */
  async show({ params, response }: HttpContext) {
    const capturedShiny = await CapturedShiny.findOrFail(params.id)

    await capturedShiny.load('game')
    await capturedShiny.load('method')
    await capturedShiny.load('pokemon')

    return response.ok(capturedShiny)
  }

  /**
   * Create a new captured shiny
   */
  async store({ auth, request, response }: HttpContext) {
    const user = auth.user!

    const { nickname, obtainedAt, finalCounter, notes, phaseNumber, pokemonId, gameId, methodId } =
      await request.validateUsing(capturedShinyValidator)

    const userId = user.id

    const capturedShiny = await CapturedShiny.create({
      nickname,
      obtainedAt,
      finalCounter,
      notes,
      phaseNumber,
      userId,
      pokemonId,
      gameId,
      methodId,
    })

    if (!capturedShiny.id) {
      return response.internalServerError('Internal server error.')
    }

    return response.ok(capturedShiny)
  }

  /**
   * Update an existing captured shiny
   */
  async update({ params, request, response }: HttpContext) {
    const capturedShiny = await CapturedShiny.findOrFail(params.id)

    const { nickname, obtainedAt, finalCounter, notes, phaseNumber, gameId, methodId } =
      await request.validateUsing(capturedShinyUpdateValidator)

    await capturedShiny
      .merge({ nickname, obtainedAt, finalCounter, notes, phaseNumber, gameId, methodId })
      .save()

    return response.ok(capturedShiny)
  }

  /**
   * Delete a captured shiny
   */
  async destroy({ params, response }: HttpContext) {
    const capturedShiny = await CapturedShiny.findOrFail(params.id)

    await capturedShiny.delete()

    return response.ok({ message: 'Captured shiny successfully deleted', capturedShiny: capturedShiny })
  }
}
