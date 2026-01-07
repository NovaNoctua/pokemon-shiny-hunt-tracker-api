import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Pokemon from '../../app/models/pokemon.js'

export default class extends BaseSeeder {
  async run() {
    console.log('Starting PokeAPI Seeding...')

    // 1. Fetch List (Limit to 151 for Gen 1 initially to prevent timeouts vs 1000+)
    // Change limit=151 to limit=1025 to fetch ALL pokemon.
    const LIMIT = 1025
    const listResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}`)
    const listData = (await listResponse.json()) as { results: { name: string; url: string }[] }

    console.log(`Fetched list of ${listData.results.length} pokemon. Fetching details...`)

    const pokemonToCreate = []

    // Process in chunks to avoid rate limiting
    const CHUNK_SIZE = 10
    for (let i = 0; i < listData.results.length; i += CHUNK_SIZE) {
      const chunk = listData.results.slice(i, i + CHUNK_SIZE)

      const chunkPromises = chunk.map(async (pItem) => {
        try {
          // Fetch Details (Types, Sprites, Id)
          const detailsRes = await fetch(pItem.url)

          if (!detailsRes.ok) {
            console.error(`Failed to fetch details for ${pItem.name}`)
            return null
          }

          const details = (await detailsRes.json()) as any

          // Fetch Species (Generation)
          const speciesRes = await fetch(details.species.url)
          const species = (await speciesRes.json()) as any

          // Determine Generation number from name "generation-i" -> 1, "generation-ii" -> 2 etc.
          // Or simpler: Extract ID from generation URL ".../generation/1/"
          const generationUrlParts = species.generation.url.split('/').filter((s: string) => s)
          const generationId = parseInt(generationUrlParts[generationUrlParts.length - 1])

          // Map Types
          const type1 = details.types[0]?.type?.name || 'unknown'
          const type2 = details.types[1]?.type?.name || null

          // Image (Official Artwork or Front Default)
          const imagePath =
            details.sprites.other?.['official-artwork']?.front_shiny || details.sprites.front_shiny

          // Capitalize Name
          const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

          return {
            name: capitalize(details.name),
            dexNumber: details.id,
            generation: generationId,
            type1: capitalize(type1),
            type2: type2 ? capitalize(type2) : null,
            imagePath: imagePath || '',
          }
        } catch (err) {
          console.error(`Error processing ${pItem.name}:`, err)
          return null
        }
      })

      const results = await Promise.all(chunkPromises)

      for (const res of results) {
        if (res) pokemonToCreate.push(res)
      }

      console.log(
        `Processed ${Math.min(i + CHUNK_SIZE, listData.results.length)} / ${listData.results.length}`
      )
    }

    // Bulk Insert (updateOrCreate to avoid duplicates)
    console.log(`Inserting ${pokemonToCreate.length} pokemon into database...`)

    // We use updateOrCreateMany to upsert based on dexNumber
    await Pokemon.updateOrCreateMany('dexNumber', pokemonToCreate)

    console.log('Done!')
  }
}
