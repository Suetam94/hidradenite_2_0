'use server'

import prisma from '@/app/lib/prisma.context'
import { type IGeneralValidated, type INormalizedAboutUs } from '@/app/lib/interfaces'
import { createAboutUsSchema, updateAboutUsSchema } from '@/app/lib/schemas'
import type { AboutUs } from '@prisma/client'

export const validateCreateAboutUs = async (formData: FormData): Promise<IGeneralValidated> => {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  let media

  if (formData.get('media') !== '') {
    media = formData.get('media') as File | undefined
  }

  let mediaContent

  if (media != null) {
    const mediaArrayBuffer = await media.arrayBuffer()
    mediaContent = Buffer.from(mediaArrayBuffer)
  }

  const data = {
    title,
    content,
    media: mediaContent
  }

  const validatedData = createAboutUsSchema.safeParse(data)

  if (!validatedData.success) {
    return {
      error: true,
      message: JSON.stringify(validatedData.error.flatten().fieldErrors)
    }
  }

  return {
    error: false,
    aboutUs: validatedData.data
  }
}

export const createAboutUs = async (formData: FormData): Promise<AboutUs | IGeneralValidated> => {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  let media

  if (formData.get('media') !== '') {
    media = formData.get('media') as File | undefined
  }

  let mediaContent

  if (media != null) {
    const mediaArrayBuffer = await media.arrayBuffer()
    mediaContent = Buffer.from(mediaArrayBuffer)
  }

  const aboutUs = await prisma.aboutUs.create({
    data: {
      title,
      content,
      media: mediaContent
    }
  })

  if (aboutUs === undefined || aboutUs === null) {
    return {
      error: true,
      message: 'It was not possible to create a new about us.'
    }
  }

  return aboutUs
}

export const listAboutUs = async (): Promise<INormalizedAboutUs[]> => {
  const aboutUs = await prisma.aboutUs.findMany()

  let normalizedAboutUs: INormalizedAboutUs[] = []

  if (aboutUs.length > 0) {
    normalizedAboutUs = aboutUs.map(about => {
      const isSvg = about.media !== null && about.media.toString('utf-8').startsWith('<svg') as boolean
      const media = about.media !== null ? about.media.toString('base64') : undefined
      return {
        ...about,
        media,
        isSvg
      }
    })
  }

  return normalizedAboutUs
}

export const validateUpdateAboutUs = async (formData: FormData): Promise<IGeneralValidated> => {
  const id = formData.get('id') as string
  let title = formData.get('title') as string | undefined
  let content = formData.get('content') as string | undefined
  let media

  const data: Partial<AboutUs> = {
    id: parseInt(id)
  }

  if (formData.get('media') !== '') {
    media = formData.get('media') as File | undefined
  }
  if (formData.get('title') !== '') {
    title = formData.get('title') as string | undefined
    data.title = title
  }
  if (formData.get('content') !== '') {
    content = formData.get('content') as string | undefined
    data.content = content
  }

  let mediaArrayBuffer: ArrayBuffer
  let mediaContent: Buffer | undefined

  if (media !== undefined) {
    mediaArrayBuffer = await media.arrayBuffer()
    mediaContent = Buffer.from(mediaArrayBuffer)
    data.media = mediaContent
  }

  const validatedData = updateAboutUsSchema.safeParse(data)

  if (!validatedData.success) {
    console.log(JSON.stringify(validatedData.error.flatten().fieldErrors))
    return {
      error: true,
      message: JSON.stringify(validatedData.error.flatten().fieldErrors)
    }
  }

  return {
    error: false,
    aboutUs: validatedData.data
  }
}

export const updateAboutUs = async (formData: FormData): Promise<AboutUs | IGeneralValidated> => {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  let media

  if (formData.get('media') !== '') {
    media = formData.get('media') as File | undefined
  }

  const data: Partial<AboutUs> = {}

  if (media !== undefined) {
    const mediaArrayBuffer = await media.arrayBuffer()
    data.media = Buffer.from(mediaArrayBuffer)
  }

  if (title.trim() !== '') {
    data.title = title
  }

  if (content.trim() !== '') {
    data.content = content
  }

  const aboutUs = await prisma.aboutUs.update({
    where: {
      id: Number(id)
    },
    data
  })

  if (aboutUs === undefined || aboutUs === null) {
    return {
      error: true,
      message: 'It was not possible to update an about us.'
    }
  }

  return aboutUs
}

export const deleteAboutUs = async (id: number): Promise<boolean> => {
  const existAboutUs = await prisma.aboutUs.findFirst({
    where: {
      id
    }
  })

  if (existAboutUs === undefined || existAboutUs === null) {
    return true
  }

  await prisma.aboutUs.delete({
    where: {
      id
    }
  })

  return true
}
