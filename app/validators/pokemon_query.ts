import vine from '@vinejs/vine'

export const pokemonQueryValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
  })
)
