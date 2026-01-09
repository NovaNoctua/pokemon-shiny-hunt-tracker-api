import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const entryValidator = vine.compile(
  vine.object({
    nickname: vine.string().maxLength(16),
    notes: vine.string().maxLength(512),
    phaseNumber: vine.number().positive().withoutDecimals(),
    finalCounter: vine.number().positive(),
    obtainedAt: vine.date().transform((data) => DateTime.fromJSDate(data)),
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

export const entryHuntValidator = vine.compile(
  vine.object({
    nickname: vine.string().maxLength(16),
    notes: vine.string().maxLength(512),
    phaseNumber: vine.number().positive().withoutDecimals(),
  })
)
