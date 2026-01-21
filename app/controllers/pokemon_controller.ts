import type { HttpContext } from '@adonisjs/core/http'
import Pokemon from '#models/pokemon'
import { pokemonQueryValidator } from '#validators/pokemon_query'

export default class PokemonController {
  /**
   * List all pokemon with pagination
   */
  async index({ request, response }: HttpContext) {
    const { page = 1, limit = 20, search } = await request.validateUsing(pokemonQueryValidator)

    const query = Pokemon.query().orderBy('id', 'asc')

    if (search) {
      query.where((subQuery) => {
        subQuery.whereILike('name', `%${search}%`)
      })
    }

    const pokemon = await query.paginate(page, limit)

    return response.ok(pokemon)
  }

  /**
   * Show a single pokemon by ID
   */
  async show({ params, response }: HttpContext) {
    const pokemon = await Pokemon.findOrFail(params.id)
    return response.ok(pokemon)
  }

  // // Search a pokemon
  // async search({ request, response }: HttpContext) {
  //   const { page = 1, limit = 20, search } = await request.validateUsing(pokemonQueryValidator)

  //   const pokemon = await Pokemon.query()
  //     .orderBy('id', 'asc')
  //     .whereLike('name', search)
  //     .paginate(page, limit)

  //   return response.ok(pokemon)
  // }
}
