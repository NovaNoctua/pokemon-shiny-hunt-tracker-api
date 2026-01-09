import type { HttpContext } from '@adonisjs/core/http'

import Entry from '#models/entry'
import { entryUpdateValidator, entryValidator } from '#validators/entry'

export default class EntriesController {
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    const userId = user.id

    const entries = await Entry.query()
      .where('user_id', userId)
      .preload('game')
      .preload('method')
      .preload('pokemon')

    return response.ok(entries)
  }

  async show({ params, response }: HttpContext) {
    const entry = await Entry.findOrFail(params.id)

    await entry.load('game')
    await entry.load('method')
    await entry.load('pokemon')

    return response.ok(entry)
  }

  async store({ auth, request, response }: HttpContext) {
    const user = auth.user!

    const { nickname, obtainedAt, finalCounter, notes, phaseNumber, pokemonId, gameId, methodId } =
      await request.validateUsing(entryValidator)

    const userId = user.id

    const entry = await Entry.create({
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

    if (!entry.id) {
      return response.internalServerError('Internal server error.')
    }

    return response.ok(entry)
  }

  async update({ params, request, response }: HttpContext) {
    const entry = await Entry.findOrFail(params.id)

    const { nickname, obtainedAt, finalCounter, notes, phaseNumber, gameId, methodId } =
      await request.validateUsing(entryUpdateValidator)

    await entry
      .merge({ nickname, obtainedAt, finalCounter, notes, phaseNumber, gameId, methodId })
      .save()

    return response.ok(entry)
  }

  async destroy({ params, response }: HttpContext) {
    const entry = await Entry.findOrFail(params.id)

    await entry.delete()

    return response.ok({ message: 'Entry successfully deleted', entry: entry })
  }
}
