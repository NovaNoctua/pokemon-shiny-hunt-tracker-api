import type { HttpContext } from '@adonisjs/core/http'
import Pokemon from '#models/pokemon'

export default class PokemonController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)

    const limit = 20

    const pokemon = await Pokemon.query().orderBy('id', 'asc').paginate(page, limit)

    return response.ok(pokemon)
  }

  async show({ params, response }: HttpContext) {
    const pokemon = await Pokemon.findOrFail(params.id)
    return response.ok(pokemon)
  }
}
