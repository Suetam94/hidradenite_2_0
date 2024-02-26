'use server'

import { type PageContent, PrismaClient } from '@prisma/client'
import {
  type ContentType,
  type IGeneralError,
  type IPageContentMedia, type IPageContentMediaClient,
  type IPageContentText,
  type PageContentType
} from '@/app/lib/interfaces'
import { checkPage } from '@/app/lib/Page'
import { pageTextContent, pageMediaContent } from '@/app/lib/schemas'

const prisma = new PrismaClient()

export const pageContent = async (data: PageContentType, contentType: ContentType): Promise<PageContent | IGeneralError> => {
  switch (contentType) {
    case 'text':
      return await managePageContentText(data as IPageContentText)
    case 'media':
      return await managePageContentMedia(data as IPageContentMedia)
    default:
      return {
        error: true,
        message: `Content type provided is invalid: ${contentType}`
      }
  }
}

export const getMediaBufferAndManage = async (formData: FormData): Promise<PageContent | IGeneralError> => {
  const file = formData.get('file') as File
  const page = formData.get('page') as string
  const contentId = formData.get('contentId') as string

  const mediaArrayBuffer = await file.arrayBuffer()
  const mediaContent = Buffer.from(mediaArrayBuffer)

  const content = await pageContent({ page, contentId, mediaContent }, 'media')

  console.log(content)

  return content
}

export const managePageContentText = async (data: IPageContentText): Promise<PageContent | IGeneralError> => {
  const validateAttributes = pageTextContent.safeParse(data)

  if (!validateAttributes.success) {
    return {
      error: true,
      message: JSON.stringify(validateAttributes.error.flatten().fieldErrors)
    }
  }

  const { page, textContent, contentId, color } = validateAttributes.data

  const pageId = await checkPage(page)

  if (pageId === 0) {
    return {
      error: true,
      message: 'There was a problem with the page that the content belongs'
    }
  }

  const hasContent: PageContent | null = await getPageContentByPageId(pageId ?? 0, contentId)

  let content
  if (hasContent !== null) {
    content = await prisma.pageContent.update({
      data: {
        textContent: textContent !== null && textContent !== '' ? textContent : hasContent.textContent,
        color: color !== null && color !== '' ? color : hasContent.color
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
        contentId,
        color
      }
    })
  }

  return content
}

export const managePageContentMedia = async (data: IPageContentMedia) => {
  const validateAttributes = pageMediaContent.safeParse(data)

  if (!validateAttributes.success) {
    return {
      error: true,
      message: JSON.stringify(validateAttributes.error.flatten().fieldErrors)
    }
  }

  const { page, mediaContent, contentId } = validateAttributes.data

  const pageId = await checkPage(page)

  if (pageId === 0) {
    return {
      error: true,
      message: 'There was a problem with the page that the content belongs'
    }
  }

  const hasContent: PageContent | null = await getPageContentByPageId(pageId ?? 0, contentId)

  let content
  if (hasContent !== null) {
    content = await prisma.pageContent.update({
      data: {
        mediaContent: mediaContent !== null ? mediaContent : hasContent.mediaContent
      },
      where: {
        id: hasContent.id
      }
    })
  } else {
    content = await prisma.pageContent.create({
      data: {
        pageId: Number(pageId),
        mediaContent,
        contentId
      }
    })
  }

  return content
}

export const getPageContentByPageId = async (pageId: number, contentId: string): Promise<PageContent | null> => {
  if (pageId === 0) {
    return null
  }

  const pageContent = await prisma.pageContent.findFirst({
    where: {
      pageId,
      contentId
    }
  })

  if (pageContent?.id !== null) {
    return pageContent
  }

  return null
}

export const getPageContentByPageTitle = async (title: string, contentId: string): Promise<PageContent | null> => {
  if (title.length === 0) {
    return null
  }

  const pageContent = await prisma.pageContent.findFirst({
    where: {
      contentId,
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

export const getPageContentMediaByPageTitle = async (title: string, contentId: string): Promise<string | null> => {
  if (title.length === 0) {
    return null
  }

  const pageContent = await prisma.pageContent.findFirst({
    where: {
      contentId,
      page: {
        title
      }
    }
  })

  if (pageContent?.id !== null) {
    if (pageContent) {
      const {mediaContent} = pageContent
      if (mediaContent !== null) {
        const buffer = Buffer.from(mediaContent).toString('base64')
        return `data:image/png;base64,${buffer}`
      }
    }
  }

  return null
}
