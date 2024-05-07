'use server'

import prisma from '@/app/lib/prisma.context'
import { createArticleSchema, updateArticleSchema } from '@/app/lib/schemas'
import { type IArticle, type IGeneralValidated } from '@/app/lib/interfaces'
import { type Article } from '@prisma/client'

export const validateCreateArticle = (formData: FormData): IGeneralValidated => {
  const title = formData.get('articleTitle') as string
  const link = formData.get('articleLink') as string
  const resume = formData.get('articleResume') as string

  const validatedData = createArticleSchema.safeParse({ title, link, resume })

  if (!validatedData.success) {
    return {
      error: true,
      message: JSON.stringify(validatedData.error.flatten().fieldErrors)
    }
  }

  return {
    error: false,
    article: validatedData.data
  }
}

export const createArticle = async (formData: FormData): Promise<Article | IGeneralValidated> => {
  const title = formData.get('articleTitle') as string
  const link = formData.get('articleLink') as string
  const resume = formData.get('articleResume') as string

  const article = await prisma.article.create({
    data: {
      title, link, resume
    }
  })

  if (article === undefined || article === null) {
    return {
      error: true,
      message: 'It was not possible to create a new support group event.'
    }
  }

  return article
}

export const validateUpdateArticle = (formData: FormData): IGeneralValidated => {
  const id = formData.get('id') as string
  const title = formData.get('articleTitle') as string
  const link = formData.get('articleLink') as string
  const resume = formData.get('articleResume') as string

  const validatedData = updateArticleSchema.safeParse({ id, title, link, resume })

  if (!validatedData.success) {
    return {
      error: true,
      message: JSON.stringify(validatedData.error.flatten().fieldErrors)
    }
  }

  return {
    error: false,
    article: validatedData.data as IArticle
  }
}

export const updateArticle = async (formData: FormData): Promise<Article | IGeneralValidated> => {
  const id = formData.get('id') as unknown as number
  const title = formData.get('title') as string
  const link = formData.get('link') as string
  const resume = formData.get('resume') as string

  const data: Partial<Article> = {}

  if (title.trim() !== '') {
    data.title = title
  }

  if (link.trim() !== '') {
    data.link = link
  }

  if (resume.trim() !== '') {
    data.resume = resume
  }

  const article = await prisma.article.update({
    where: {
      id: Number(id)
    },
    data
  })

  if (article === undefined || article === null) {
    return {
      error: true,
      message: 'It was not possible to update an article.'
    }
  }

  return article
}

export const listArticles = async (): Promise<Article[]> => {
  const articles = await prisma.article.findMany()

  if (articles === undefined) {
    return []
  }

  return articles
}

export const deleteArticle = async (id: number): Promise<boolean> => {
  const existArticle = await prisma.article.findFirst({
    where: {
      id
    }
  })

  if (existArticle === undefined || existArticle === null) {
    return true
  }

  await prisma.article.delete({
    where: {
      id
    }
  })

  return true
}
