import Hunt from '#models/hunt'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class VerifyUserOwnershipHuntMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { auth, response, params } = ctx

    const isAuthenticated = await auth.check()

    if (!isAuthenticated || !auth.user) {
      return response.unauthorized({
        message: 'You must be logged in',
      })
    }

    const hunt = await Hunt.findOrFail(params.id)
    const userId = hunt.userId

    if (auth.user.id !== userId) {
      return response.forbidden({ message: 'You do not have permission to access this resource' })
    }

    return next()
  }
}
