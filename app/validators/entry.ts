import vine from '@vinejs/vine'

export const entryValidator = vine.compile(
  vine.object({
    nickname: vine.string().minLength(1).maxLength(16).optional(),
    notes: vine.string().minLength(0).maxLength(512).optional(),
    phaseNumber: vine.number().positive().withoutDecimals().optional(),
    finalCounter: vine.number().positive().optional(),
    obtainedAt: vine.date().optional(),
    pokemonId: vine
      .number()
      .exists(async (db, value) => {
        const pokemon = await db.from('pokemon').where('id', value).first()
        return !!pokemon
      })
      .optional(),
    gameId: vine
      .number()
      .exists(async (db, value) => {
        const game = await db.from('games').where('id', value).first()
        return !!game
      })
      .optional(),
    methodId: vine
      .number()
      .exists(async (db, value) => {
        const method = await db.from('methods').where('id', value).first()
        return !!method
      })
      .optional(),
  })
)
