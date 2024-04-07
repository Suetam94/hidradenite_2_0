'use server'

import { type SupportGroup } from '@prisma/client'
import { type IGeneralValidated, type INormalizedSupportGroupEvent } from '@/app/lib/interfaces'
import { supportGroupEventSchema, updateSupportGroupEventSchema } from '@/app/lib/schemas'

import prisma from '@/app/lib/prisma.context'

export const validateCreateSupportGroupEvent = async (formData: FormData): Promise<IGeneralValidated> => {
  const eventDate = formData.get('eventDate') as string
  const location = formData.get('location') as string
  const eventTime = formData.get('eventTime') as string
  const image = formData.get('image') as File

  const mediaArrayBuffer = await image.arrayBuffer()
  const mediaContent = Buffer.from(mediaArrayBuffer)

  const data = {
    eventDate,
    location,
    eventTime,
    image: mediaContent
  }

  const validatedData = supportGroupEventSchema.safeParse(data)

  if (!validatedData.success) {
    return {
      error: true,
      message: JSON.stringify(validatedData.error.flatten().fieldErrors)
    }
  }

  return {
    error: false,
    supportGroup: validatedData.data
  }
}

export const createSupportGroupEvent = async (formData: FormData): Promise<SupportGroup | IGeneralValidated> => {
  const eventDate = formData.get('eventDate') as string
  const location = formData.get('location') as string
  const eventTime = formData.get('eventTime') as string
  const image = formData.get('image') as File

  const mediaArrayBuffer = await image.arrayBuffer()
  const mediaContent = Buffer.from(mediaArrayBuffer)

  if (mediaContent !== undefined) {
    const supportGroupEvent = await prisma.supportGroup.create({
      data: {
        eventTime,
        eventDate,
        location,
        image: mediaContent
      }
    })

    if (supportGroupEvent === undefined || supportGroupEvent === null) {
      return {
        error: true,
        message: 'It was not possible to create a new support group event.'
      }
    }

    return supportGroupEvent
  }

  return {
    error: true,
    message: 'It was not possible to create a new support group event.'
  }
}

export const listSupportGroupEvent = async (): Promise<INormalizedSupportGroupEvent[]> => {
  const supportGroups = await prisma.supportGroup.findMany()

  let normalizedSupportGroups: INormalizedSupportGroupEvent[] = []

  if (supportGroups.length > 0) {
    normalizedSupportGroups = supportGroups.map(group => {
      const isSvg = group.image.toString('utf-8').startsWith('<svg') as boolean
      const image = group.image.toString('base64')
      return {
        ...group,
        image,
        isSvg
      }
    })
  }

  return normalizedSupportGroups
}

export const validateUpdateSupportGroupEvent = async (formData: FormData): Promise<IGeneralValidated> => {
  const id = formData.get('id') as string
  let eventDate = formData.get('eventDate') as string | undefined
  let location = formData.get('location') as string | undefined
  let eventTime = formData.get('eventTime') as string | undefined
  let image

  if (formData.get('image') !== '') {
    image = formData.get('image') as File | undefined
  }
  if (formData.get('eventDate') !== '') {
    eventDate = formData.get('eventDate') as string | undefined
  }
  if (formData.get('location') !== '') {
    location = formData.get('location') as string | undefined
  }
  if (formData.get('eventTime') !== '') {
    eventTime = formData.get('eventTime') as string | undefined
  }

  let mediaArrayBuffer: ArrayBuffer
  let mediaContent: Buffer | undefined

  if (image !== undefined) {
    mediaArrayBuffer = await image.arrayBuffer()
    mediaContent = Buffer.from(mediaArrayBuffer)
  }

  const data: Partial<SupportGroup> = {
    id: Number(id),
    eventDate,
    location,
    eventTime,
    image: mediaContent
  }

  const validatedData = updateSupportGroupEventSchema.safeParse(data)

  if (!validatedData.success) {
    return {
      error: true,
      message: JSON.stringify(validatedData.error.flatten().fieldErrors)
    }
  }

  return {
    error: false,
    updatedSupportGroup: validatedData.data
  }
}

export const updateSupportGroupEvent = async (formData: FormData): Promise<SupportGroup | IGeneralValidated> => {
  const id = formData.get('id') as unknown as number
  const eventDate = formData.get('eventDate') as string
  const location = formData.get('location') as string
  const eventTime = formData.get('eventTime') as string
  let image

  if (formData.get('image') !== '') {
    image = formData.get('image') as File | undefined
  }

  const data: Partial<SupportGroup> = {}

  if (image !== undefined) {
    const mediaArrayBuffer = await image.arrayBuffer()
    data.image = Buffer.from(mediaArrayBuffer)
  }

  if (eventDate.trim() !== '') {
    data.eventDate = eventDate
  }

  if (location.trim() !== '') {
    data.location = location
  }

  if (eventTime.trim() !== '') {
    data.eventTime = eventTime
  }

  const supportGroupEvent = await prisma.supportGroup.update({
    where: {
      id: Number(id)
    },
    data
  })

  if (supportGroupEvent === undefined || supportGroupEvent === null) {
    return {
      error: true,
      message: 'It was not possible to update a support group event.'
    }
  }

  return supportGroupEvent
}

export const deleteSupportGroupEvent = async (id: number): Promise<boolean> => {
  const existSupportGroup = await prisma.supportGroup.findFirst({
    where: {
      id
    }
  })

  if (existSupportGroup === undefined || existSupportGroup === null) {
    return true
  }

  await prisma.supportGroup.delete({
    where: {
      id
    }
  })

  return true
}
