'use server'

import prisma from '@/app/lib/prisma.context'
import type { CommomQuestion } from '@prisma/client'
import type { IGeneralValidated } from '@/app/lib/interfaces'
import { createCommonQuestionSchema, updateCommonQuestionSchema } from '@/app/lib/schemas'

export const validateCreateCommonQuestion = (formData: FormData): IGeneralValidated => {
  const question = formData.get('question') as string
  const answer = formData.get('answer') as string

  const validatedData = createCommonQuestionSchema.safeParse({ question, answer })

  if (!validatedData.success) {
    return {
      error: true,
      message: JSON.stringify(validatedData.error.flatten().fieldErrors)
    }
  }

  return {
    error: false,
    commonQuestion: validatedData.data
  }
}

export const createCommonQuestion = async (formData: FormData): Promise<CommomQuestion | IGeneralValidated> => {
  const question = formData.get('question') as string
  const answer = formData.get('answer') as string

  const commonQuestion = await prisma.commomQuestion.create({
    data: {
      question, answer
    }
  })

  if (commonQuestion === undefined || commonQuestion === null) {
    return {
      error: true,
      message: 'It was not possible to create a new common question event.'
    }
  }

  return commonQuestion
}

export const listCommonQuestion = async (): Promise<CommomQuestion[]> => {
  const commonQuestions = await prisma.commomQuestion.findMany()

  if (commonQuestions === undefined) {
    return []
  }

  return commonQuestions
}

export const validateUpdateCommonQuestion = (formData: FormData): IGeneralValidated => {
  const question = formData.get('question') as string
  const answer = formData.get('answer') as string

  const validatedData = updateCommonQuestionSchema.safeParse({ question, answer })

  if (!validatedData.success) {
    return {
      error: true,
      message: JSON.stringify(validatedData.error.flatten().fieldErrors)
    }
  }

  return {
    error: false,
    commonQuestion: validatedData.data
  }
}

export const updateCommonQuestion = async (formData: FormData): Promise<CommomQuestion | IGeneralValidated> => {
  const id = formData.get('question') as unknown as number
  const question = formData.get('question') as string
  const answer = formData.get('answer') as string

  const data: Partial<CommomQuestion> = {}

  if (question.trim() === '') {
    data.question = question
  }

  if (answer.trim() === '') {
    data.answer = answer
  }

  const commonQuestion = await prisma.commomQuestion.update({
    where: {
      id: Number(id)
    },
    data
  })

  if (commonQuestion === undefined || commonQuestion === null) {
    return {
      error: true,
      message: 'It was not possible to update a common question.'
    }
  }

  return commonQuestion
}

export const deleteCommonQuestion = async (id: number): Promise<boolean> => {
  const existCommonQuestion = await prisma.commomQuestion.findFirst({
    where: {
      id
    }
  })

  if (existCommonQuestion === undefined || existCommonQuestion === null) {
    return true
  }

  await prisma.article.delete({
    where: {
      id
    }
  })

  return true
}
