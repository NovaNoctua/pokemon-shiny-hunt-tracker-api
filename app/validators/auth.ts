import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .minLength(3)
      .maxLength(32)
      .unique(async (query, field) => {
        const user = await query.from('users').where('username', field).first()
        return !user
      }),
    email: vine
      .string()
      .email()
      .unique(async (query, field) => {
        const user = await query.from('users').where('email', field).first()
        return !user
      }),
    password: vine.string().minLength(8).maxLength(512).confirmed(),
    profilePicture: vine.file({ extnames: ['jpg', 'png', 'jpeg', 'gif'] }).optional(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(3).maxLength(32),
    password: vine.string().minLength(8).maxLength(512),
  })
)
