import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Method from '../../app/models/method.js'
import Game from '../../app/models/game.js'
import MethodsInGame from '../../app/models/methods_in_game.js'

export default class extends BaseSeeder {
  async run() {
    console.log('Starting Methods Seeding...')

    const methodsData = [
      { name: 'Random Encounter', base_odds: '1/8192', max_odds: '1/2730', gens: [1, 2, 3, 4, 5] },
      { name: 'Random Encounter (Modern)', base_odds: '1/4096', max_odds: '1/1365', gens: [6, 7, 8, 9] },
      { name: 'Soft Reset', base_odds: '1/8192', max_odds: '1/2730', gens: [1, 2, 3, 4, 5] },
      { name: 'Soft Reset (Modern)', base_odds: '1/4096', max_odds: '1/1365', gens: [6, 7, 8, 9] },
      { name: 'Masuda Method', base_odds: '1/1638', max_odds: '1/1638', gens: [4] }, // Gen 4 original rate
      { name: 'Masuda Method (Modern)', base_odds: '1/683', max_odds: '1/512', gens: [5, 6, 7, 8, 9] },
      { name: 'Poke Radar', base_odds: '1/200', max_odds: '1/200', gens: [4, 6] },
      { name: 'Chain Fishing', base_odds: '1/100', max_odds: '1/100', gens: [6] },
      { name: 'Friend Safari', base_odds: '1/512', max_odds: '1/512', gens: [6] },
      { name: 'DexNav', base_odds: '1/512', max_odds: '1/173', gens: [6] }, // ORAS is Gen 6
      { name: 'SOS Calling', base_odds: '1/315', max_odds: '1/273', gens: [7] },
      { name: 'Ultra Wormhole', base_odds: '1/3', max_odds: '1/3', gens: [7] },
      { name: 'Catch Combo', base_odds: '1/341', max_odds: '1/273', gens: [7] }, // LGPE is technically Gen 7 engine
      { name: 'Murder Method', base_odds: '1/683', max_odds: '1/512', gens: [8] }, // SwSh
      { name: 'Dynamax Adventures', base_odds: '1/300', max_odds: '1/100', gens: [8] },
      { name: 'Mass Outbreak (PLA)', base_odds: '1/158', max_odds: '1/128', gens: [8] }, // Legends Arceus
      { name: 'Mass Outbreak (SV)', base_odds: '1/1365', max_odds: '1/512', gens: [9] },
      { name: 'Sandwich Power 3', base_odds: '1/1024', max_odds: '1/683', gens: [9] },
    ]

    for (const m of methodsData) {
      // 1. Create Method
      const method = await Method.updateOrCreate(
        { name: m.name },
        { baseOdds: m.base_odds, maxOdds: m.max_odds }
      )

      // 2. Find Games in those Gens
      const games = await Game.query().whereIn('generation', m.gens)

      // 3. Attach to Games
      for (const game of games) {
        await MethodsInGame.updateOrCreate(
          { gameId: game.id, methodId: method.id },
          { gameId: game.id, methodId: method.id }
        )
      }
    }

    console.log('Done linking methods!')
  }
}
