import vine from '@vinejs/vine'

export const pokemonQueryValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).withoutDecimals().optional(),
    limit: vine.number().min(1).max(100).withoutDecimals().optional(),
    search: vine.string().optional(),
  })
)
