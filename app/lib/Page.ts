'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const checkPage = async (title: string): Promise<number | undefined> => {
  const page = await prisma.page.findFirst({
    where: {
      title
    }
  })

  if (page !== null) {
    if (page.id !== null) {
      return page.id
    }
  }

  const newPage = await prisma.page.create({
    data: {
      title
    }
  })

  if ((newPage?.id !== null)) {
    return newPage.id
  }

  return 0
}
