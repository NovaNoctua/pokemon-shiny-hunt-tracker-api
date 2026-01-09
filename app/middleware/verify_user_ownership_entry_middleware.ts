import Entry from '#models/entry'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class VerifyUserOwnershipEntryMiddleware {
  // Make sure the connected user owns the collection
  async handle(ctx: HttpContext, next: NextFn) {
    const { auth, response, params } = ctx

    const isAuthenticated = await auth.check()

    if (!isAuthenticated || !auth.user) {
      return response.unauthorized({
        message: 'You must be logged in',
      })
    }

    const entry = await Entry.findOrFail(params.id)
    const userId = entry.userId

    if (auth.user.id !== userId) {
      return response.forbidden({ message: 'You do not have permission to access this resource' })
    }

    return next()
  }
}
