import { z } from 'zod'

export const articleSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  link: z.string().min(1, { message: 'Link is required' }),
  resume: z.string().min(1, { message: 'Resume is required' })
})

export const createArticleSchema = articleSchema

export const updateArticleSchema = articleSchema.partial().extend({
  id: z.string().min(1, { message: 'Id is required' })
})
