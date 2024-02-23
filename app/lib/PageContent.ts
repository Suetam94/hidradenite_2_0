'use server'

import { type PageContent, PrismaClient } from '@prisma/client'
import { type ContentType, type IGeneralError, type IPageContentText } from '@/app/lib/interfaces'
import { checkPage } from '@/app/lib/Page'
import { pageTextContent } from '@/app/lib/schemas'

const prisma = new PrismaClient()

export const pageContentManager = async (prevState: PageContent | IGeneralError, formData: FormData): Promise<PageContent | IGeneralError> => {
  const validateAttributes = pageTextContent.safeParse({
    page: formData.get('page'),
    contentId: formData.get('contentId'),
    textContent: formData.get('textContent')
  })

  if (!validateAttributes.success) {
    return {
      error: true,
      message: JSON.stringify(validateAttributes.error.flatten().fieldErrors)
    }
  }

  return await pageContent(validateAttributes.data, 'text')
}

export const pageContent = async (data: IPageContentText, contentType: ContentType): Promise<PageContent | IGeneralError> => {
  const validateAttributes = pageTextContent.safeParse(data)

  if (!validateAttributes.success) {
    return {
      error: true,
      message: JSON.stringify(validateAttributes.error.flatten().fieldErrors)
    }
  }

  const { page, textContent, contentId } = validateAttributes.data

  const pageId = await checkPage(page)

  if (pageId === 0) {
    return {
      error: true,
      message: 'There was a problem with the page that the content belongs'
    }
  }

  const hasContent: PageContent | null = await getPageContentByPageId(pageId ?? 0)

  let content
  if (hasContent !== null) {
    content = await prisma.pageContent.update({
      data: {
        textContent
      },
      where: {
        id: hasContent.id
      }
    })
  } else {
    content = await prisma.pageContent.create({
      data: {
        pageId: Number(pageId),
        textContent,
        contentId
      }
    })
  }

  return content
}

export const getPageContentByPageId = async (pageId: number): Promise<PageContent | null> => {
  if (pageId === 0) {
    return null
  }

  const pageContent = await prisma.pageContent.findFirst({
    where: {
      pageId
    }
  })

  if (pageContent?.id !== null) {
    return pageContent
  }

  return null
}

export const getPageContentByPageTitle = async (title: string): Promise<PageContent | null> => {
  if (title.length === 0) {
    return null
  }

  const pageContent = await prisma.pageContent.findFirst({
    where: {
      page: {
        title
      }
    }
  })

  if (pageContent?.id !== null) {
    return pageContent
  }

  return null
}
