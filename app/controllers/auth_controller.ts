import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
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

  async login({ request, auth, response }: HttpContext) {
    const { username, password } = await request.validateUsing(loginValidator)

    try {
      const user = await User.verifyCredentials(username, password)
      await auth.use('web').login(user)
      return response.ok({ message: 'Login successful', user: user.serialize() })
    } catch (error) {
      return response.unauthorized({ message: 'Invalid email or password' })
    }
  }
}
