import vine, { SimpleMessagesProvider } from '@vinejs/vine'

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

registerValidator.messagesProvider = new SimpleMessagesProvider({
  'required': 'The {{ field }} is required',
  'email': 'The email format is invalid',
  'minLength': 'The {{ field }} must have at least {{ min }} characters',
  'maxLength': 'The {{ field }} must have maximum {{ max }} characters',
  'database.unique': 'This {{ field }} has already been taken',
})
