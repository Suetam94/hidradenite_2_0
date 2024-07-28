import { z } from 'zod'

export const supportGroupSchema = z.object({
  eventDate: z.string().min(1, { message: 'Title is required' }),
  location: z.string().min(1, { message: 'Title is required' }),
  eventTime: z.string().min(1, { message: 'Title is required' }),
  image: z.instanceof(Buffer, { message: 'Image must be a file' })
})

export const createSupportGroupSchema = supportGroupSchema

export const updateSupportGroupSchema = supportGroupSchema.partial().extend({
  id: z.string().min(1, { message: 'Id is required' })
})
