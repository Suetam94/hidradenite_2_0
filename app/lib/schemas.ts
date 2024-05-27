import { z } from 'zod'

export const pageTextContent = z.object({
  page: z.string(),
  contentId: z.string(),
  textContent: z.string().optional(),
  color: z.string().optional()
})

export const pageMediaContent = z.object({
  page: z.string(),
  contentId: z.string(),
  mediaContent: z.instanceof(Buffer)
})

export const pageTitle = z.object({
  title: z.string()
})

export const supportGroupEventSchema = z.object({
  eventTime: z.string(),
  eventDate: z.string(),
  location: z.string(),
  image: z.instanceof(Buffer)
})

export const updateSupportGroupEventSchema = z.object({
  id: z.number().min(1),
  eventTime: z.string().optional(),
  eventDate: z.string().optional(),
  location: z.string().optional(),
  image: z.instanceof(Buffer).optional()
})

export const createUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(100),
  name: z.string(),
  isAdmin: z.boolean(),
  phone: z.string()
})

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().min(3).max(20).optional(),
  password: z.string().min(6).max(100).optional(),
  name: z.string().optional(),
  isAdmin: z.boolean().optional(),
  phone: z.string().optional()
})

export const logUserSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(100)
})

export const createArticleSchema = z.object({
  title: z.string().min(3),
  link: z.string().url(),
  resume: z.string().min(10)
})

export const updateArticleSchema = z.object({
  id: z.number(),
  title: z.string().min(3).optional(),
  link: z.string().url().optional(),
  resume: z.string().min(10).optional()
})

export const createCommonQuestionSchema = z.object({
  question: z.string().min(3),
  answer: z.string()
})

export const updateCommonQuestionSchema = z.object({
  id: z.number(),
  question: z.string().min(3).optional(),
  answer: z.string().optional()
})

export const createAboutUsSchema = z.object({
  title: z.string().min(3),
  content: z.string(),
  media: z.instanceof(Buffer).optional()
})

export const updateAboutUsSchema = z.object({
  id: z.number().min(1),
  title: z.string().min(3).optional(),
  content: z.string().optional(),
  media: z.instanceof(Buffer).optional()
})
