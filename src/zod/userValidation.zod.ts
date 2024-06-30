import * as zod from 'zod'

export const userRegisterValidation = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8)
})

export const userLoginValidation = userRegisterValidation.pick({
    username: true,
    email: true,
    password: true
}).extend({
    username: zod.string().optional()
})

