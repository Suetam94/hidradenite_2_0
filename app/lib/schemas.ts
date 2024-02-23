import { z } from 'zod'

export const pageTextContent = z.object({
  page: z.string(),
  contentId: z.string(),
  textContent: z.string()
})

export const pageMediaContent = z.object({
  page: z.string(),
  contentId: z.string(),
  mediaContent: z.any()
})

export const pageTitle = z.object({
  title: z.string()
})
