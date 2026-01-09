import Method from '#models/method'
import type { HttpContext } from '@adonisjs/core/http'

export default class MethodsController {
  /**
   * List all hunting methods
   */
  async index({ response }: HttpContext) {
    const methods = await Method.query().orderBy('name', 'asc')
    return response.ok(methods)
  }

  /**
   * Show a single hunting method by ID
   */
  async show({ params, response }: HttpContext) {
    const method = await Method.findOrFail(params.id)
    return response.ok(method)
  }
}
