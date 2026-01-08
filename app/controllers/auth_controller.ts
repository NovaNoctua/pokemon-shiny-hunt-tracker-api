import User from '#models/user'
import { registerValidator } from '#validators/auth'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const { username, email, password, profilePicture } =
      await request.validateUsing(registerValidator)
    let profilePicturePath
    const isAdmin = false

    if (profilePicture) {
      const fileName = `${cuid()}.${profilePicture.extname}`

      await profilePicture.move(app.makePath('public/uploads/profilePictures'), { name: fileName })

      profilePicturePath = `uploads/profilePictures/${fileName}`
    } else {
      profilePicturePath = `default/profilePicture.png`
    }

    await User.create({
      username,
      email,
      password,
      profilePicturePath,
      isAdmin,
    })

    return response.ok({ message: 'Registered successfully' })
  }
}
