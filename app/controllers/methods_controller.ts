import Method from '#models/method'
import type { HttpContext } from '@adonisjs/core/http'

export default class MethodsController {
  async index({ response }: HttpContext) {
    const methods = await Method.query().orderBy('name', 'asc')
    return response.ok(methods)
  }

  async show({ params, response }: HttpContext) {
    const method = await Method.findOrFail(params.id)
    return response.ok(method)
  }
}
