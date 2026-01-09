import type { HttpContext } from '@adonisjs/core/http'
import Pokemon from '#models/pokemon'
import { pokemonQueryValidator } from '#validators/pokemon_query'

export default class PokemonController {
  async index({ request, response }: HttpContext) {
    const { page = 1, limit = 20 } = await request.validateUsing(pokemonQueryValidator)
    // const page = request.input('page', 1)

    const pokemon = await Pokemon.query().orderBy('id', 'asc').paginate(page, limit)

    return response.ok(pokemon)
  }

  async show({ params, response }: HttpContext) {
    const pokemon = await Pokemon.findOrFail(params.id)
    return response.ok(pokemon)
  }
}
