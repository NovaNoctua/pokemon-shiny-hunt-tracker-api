import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        username: 'Nova',
        email: 'mael.naudet@gmail.com',
        password: 'gougougaga',
        profilePicturePath: `default/profilePicture.png`,
        isAdmin: true,
      },
    ])
  }
}
