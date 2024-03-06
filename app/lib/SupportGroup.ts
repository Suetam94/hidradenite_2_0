'use server'

import { type SupportGroup } from '@prisma/client'
import { type IGeneralValidated, type ISupportGroupEvent, type IUpdateSupportGroupEvent } from '@/app/lib/interfaces'
import { supportGroupEventSchema, updateSupportGroupEventSchema } from '@/app/lib/schemas'

import prisma from '@/app/lib/prisma.context'

const createSupportGroupEvent = async (data: ISupportGroupEvent): Promise<SupportGroup | IGeneralValidated> => {
  const validatedData = supportGroupEventSchema.safeParse(data)

  if (!validatedData.success) {
    return {
      error: true,
      message: JSON.stringify(validatedData.error.flatten().fieldErrors)
    }
  }

  const { eventTime, eventDate, location, image } = validatedData.data

  const supportGroupEvent = await prisma.supportGroup.create({
    data: {
      eventTime,
      eventDate,
      location,
      image
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

const listSupportGroupEvent = async (): Promise<SupportGroup[] | IGeneralValidated> => {
  const supportGroupEvents = await prisma.supportGroup.findMany()

  if (supportGroupEvents === undefined || supportGroupEvents === null) {
    return {
      error: true,
      message: 'It was not possible to list support group events.'
    }
  }

  return supportGroupEvents
}

const updateSupportGroupEvent = async (data: IUpdateSupportGroupEvent): Promise<SupportGroup | IGeneralValidated> => {
  const validatedData = updateSupportGroupEventSchema.safeParse(data)

  if (!validatedData.success) {
    return {
      error: true,
      message: JSON.stringify(validatedData.error.flatten().fieldErrors)
    }
  }

  const parsedData = validatedData.data

  const supportGroupEvent = await prisma.supportGroup.update({
    where: {
      id: parsedData.id
    },
    data: parsedData
  })

  if (supportGroupEvent === undefined || supportGroupEvent === null) {
    return {
      error: true,
      message: 'It was not possible to update a support group event.'
    }
  }

  return supportGroupEvent
}

const deleteSupportGroupEvent = async (id: number): Promise<boolean> => {
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
