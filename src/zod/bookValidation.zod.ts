import * as zod from 'zod'

export const createBookValidation = zod.object({
    title: zod.string(),
    description: zod.string(),
    content: zod.string()
})