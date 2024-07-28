import { z } from 'zod'

export const commonQuestionSchema = z.object({
  answer: z.string().min(1, { message: 'Answer is required' }),
  question: z.string().min(1, { message: 'Question is required' })
})

export const createCommonQuestionSchema = commonQuestionSchema

export const updateCommonQuestionSchema = commonQuestionSchema.partial().extend({
  id: z.string().min(1, { message: 'Id is required' })
})
