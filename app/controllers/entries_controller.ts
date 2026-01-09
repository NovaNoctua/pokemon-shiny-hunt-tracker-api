import type { HttpContext } from '@adonisjs/core/http'

import Entry from '#models/entry'

export default class EntriesController {
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    const userId = user.id

    const entries = await Entry.query().where('user_id', userId)

    return response.ok(entries)
  }

  async show({ params, response }: HttpContext) {
    const entry = await Entry.findOrFail(params.id)

    return response.ok(entry)
  }
}
