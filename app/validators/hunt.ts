import vine from '@vinejs/vine'

export const huntValidator = vine.compile(
  vine.object({
    pokemonId: vine.number().exists(async (db, value) => {
      const pokemon = await db.from('pokemon').where('id', value).first()
      return !!pokemon
    }),
    gameId: vine.number().exists(async (db, value) => {
      const game = await db.from('games').where('id', value).first()
      return !!game
    }),
    methodId: vine.number().exists(async (db, value) => {
      const method = await db.from('methods').where('id', value).first()
      return !!method
    }),
  })
)
