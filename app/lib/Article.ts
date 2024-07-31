'use server'

import { addDoc, collection, deleteDoc, doc, getDocs, type QuerySnapshot, updateDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { createArticleSchema, updateArticleSchema } from '@/app/lib/validation/article'
import type { ZodSchema } from 'zod'

export interface ICreateArticleData {
  title: string
  link: string
  resume: string
}

export interface IArticleData extends ICreateArticleData {
  id: string
}

interface IReturn {
  error: boolean
  message: string
}

async function validateSchema<Data> (schema: ZodSchema<Data>, data: any): Promise<IReturn | null> {
  const validation = schema.safeParse(data)
  if (!validation.success) {
    return {
      error: true,
      message: validation.error.message
    }
  }
  return null
}

export async function createArticle (formData: FormData): Promise<IReturn> {
  const title = formData.get('title') as string
  const link = formData.get('link') as string
  const resume = formData.get('resume') as string

  const validationResult = await validateSchema(createArticleSchema, { title, link, resume })
  if (validationResult != null) return validationResult

  try {
    await addDoc(collection(db, 'article'), {
      title,
      link,
      resume
    } satisfies ICreateArticleData)

    return {
      error: false,
      message: 'Novo conteúdo da página criado com sucesso!'
    }
  } catch (error) {
    console.error('Error creating document: ', error)
    return {
      error: true,
      message: (error as Error).message
    }
  }
}

export async function readArticles (): Promise<IArticleData[]> {
  try {
    const querySnapshot: QuerySnapshot = await getDocs(collection(db, 'article'))
    return querySnapshot.docs.map((doc: { id: string, data: () => any }) => ({
      id: doc.id,
      ...doc.data()
    })) as IArticleData[]
  } catch (error) {
    console.error('Error reading documents: ', error)
    return []
  }
}

export async function updateArticle (formData: FormData): Promise<IReturn> {
  const id = formData.get('id') as string
  const title = formData.get('title') as string | null
  const link = formData.get('link') as string | null
  const resume = formData.get('resume') as string | null

  const data = { id, title, link, resume }

  const sanitizedData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null))

  const validationResult = await validateSchema(updateArticleSchema, sanitizedData)
  if (validationResult != null) return validationResult

  try {
    const docRef = doc(db, 'article', id)

    await updateDoc(docRef, sanitizedData)

    return {
      error: false,
      message: 'Conteúdo da página atualizado com sucesso!'
    }
  } catch (error) {
    console.error('Error updating document: ', error)
    return {
      error: true,
      message: (error as Error).message
    }
  }
}

export async function deleteArticle (id: string): Promise<IReturn> {
  try {
    await deleteDoc(doc(db, 'article', id))

    return {
      error: false,
      message: 'Conteúdo da página deletado com sucesso!'
    }
  } catch (error) {
    console.error('Error deleting document: ', error)
    return {
      error: true,
      message: (error as Error).message
    }
  }
}
