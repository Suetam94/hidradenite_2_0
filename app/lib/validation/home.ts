import { z } from 'zod'

const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

export const hexColorSchema = z.string({ required_error: 'Color must be a string' }).regex(hexColorRegex, {
  message: 'Invalid hex color format'
})

export const fileSchema = z.instanceof(Buffer, { message: 'Invalid file format' })

export const textSchema = z.object({
  text: z.string().min(1, { message: 'Text is required' }),
  color: hexColorSchema,
  contentId: z.string().min(1, { message: 'ContentId is required' })
})
