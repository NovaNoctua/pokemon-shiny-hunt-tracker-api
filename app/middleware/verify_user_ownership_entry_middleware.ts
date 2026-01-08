import CollectionEntry from '#models/collection_entry'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class VerifyUserOwnershipEntryMiddleware {
  // Make sure the connected user owns the collection
  async handle(ctx: HttpContext, next: NextFn) {
    const { request, auth, response, params } = ctx

    if (!auth.isAuthenticated || !auth.user) {
      return response.unauthorized({ message: 'You must be logged in' })
    }

    const entry = await CollectionEntry.findOrFail(params.id)
    const userId = entry.userId
    const entryId = entry.id

    if (!entryId) {
      return response.notFound({ message: `Resource not found` })
    }

    if (auth.user.id !== userId) {
      return response.forbidden({ message: 'You do not have permission to access this resource' })
    }

    return next()
  }
}
