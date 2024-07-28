import { z } from 'zod'

export const aboutUsSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
  media: z.instanceof(Buffer, { message: 'Media must be a file' }).optional()
})

export const createAboutUsSchema = aboutUsSchema

export const updateAboutUsSchema = aboutUsSchema.partial().extend({
  id: z.string().min(1, { message: 'Id is required' })
})
