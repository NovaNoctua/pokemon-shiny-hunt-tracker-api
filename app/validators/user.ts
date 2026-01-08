import vine from '@vinejs/vine'

export const userValidator = (userId?: number) =>
  vine.compile(
    vine.object({
      username: vine
        .string()
        .minLength(3)
        .maxLength(16)
        .unique(async (query, field) => {
          const q = query.from('users').where('username', field)
          if (userId) {
            q.whereNot('id', userId)
          }
          const user = await q.first()
          return !user
        })
        .optional(),
      email: vine.string().email().optional(),
      profilePicture: vine.file({ extnames: ['jpg', 'png', 'jpeg', 'gif'] }).optional(),
    })
  )
