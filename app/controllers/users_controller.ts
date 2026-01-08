import User from '#models/user'
import { userValidator } from '#validators/user'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class UsersController {
  async show({ auth, response }: HttpContext) {
    const user = auth.user!
    const userId = user.id

    const ownUser = await User.findOrFail(userId)

    return response.ok(ownUser)
  }
  async update({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const userId = user.id

    const { username, email, profilePicture } = await request.validateUsing(userValidator(userId))

    const ownUser = await User.findOrFail(userId)

    let profilePicturePath

    if (profilePicture) {
      const fileName = `${cuid()}.${profilePicture.extname}`

      await profilePicture.move(app.makePath('public/uploads/profilePictures'), {
        name: fileName,
      })

      profilePicturePath = `uploads/profilePictures/${fileName}`
    }

    await ownUser
      .merge({
        username,
        email,
        profilePicturePath,
      })
      .save()

    return response.ok({ message: 'Changes successful' })
  }
  async destroy() {}
}
