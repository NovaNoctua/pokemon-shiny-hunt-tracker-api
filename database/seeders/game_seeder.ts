import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Game from '../../app/models/game.js'

export default class extends BaseSeeder {
  async run() {
    console.log('Starting Games Seeding...')

    const response = await fetch('https://pokeapi.co/api/v2/version-group?limit=100')
    const data = (await response.json()) as any

    const games = []

    for (const group of data.results) {
      // Fetch group details to get generation and version list
      const groupRes = await fetch(group.url)
      const groupDetails = (await groupRes.json()) as any

      // Actually, PokeAPI generation names are roman numerals.
      // Easier: Parse the ID from the URL: https://pokeapi.co/api/v2/generation/1/
      const genId = parseInt(
        groupDetails.generation.url
          .split('/')
          .filter((s: any) => s)
          .pop()
      )

      const platform = this.getPlatform(genId)

      // A group like "red-blue" contains two versions: "red" and "blue".
      // We probably want to store individual games or the group?
      // User asked for "games" (plural). Usually people track "Pokemon Red", "Pokemon Blue".
      // Let's create an entry for EACH version in the group.

      for (const version of groupDetails.versions) {
        games.push({
          name: this.formatName(version.name),
          generation: genId,
          platform: platform,
          imagePath: null,
        })
      }
    }

    console.log(`Inserting ${games.length} games...`)
    await Game.updateOrCreateMany('name', games)
    console.log('Done mapping games!')
  }

  getPlatform(gen: number): string {
    if (gen === 1) return 'Game Boy'
    if (gen === 2) return 'Game Boy Color'
    if (gen === 3) return 'Game Boy Advance'
    if (gen === 4 || gen === 5) return 'Nintendo DS'
    if (gen === 6 || gen === 7) return 'Nintendo 3DS'
    if (gen >= 8) return 'Nintendo Switch'
    return 'Unknown'
  }

  formatName(slug: string): string {
    // "red" -> "Pokemon Red"
    // "alpha-sapphire" -> "Pokemon Alpha Sapphire"
    const name = slug
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ')
    return `Pokemon ${name}`
  }
}
