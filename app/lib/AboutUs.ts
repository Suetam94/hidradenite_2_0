'use server'

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  type QuerySnapshot,
  updateDoc
} from 'firebase/firestore'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '@/config/firebase'
import { createAboutUsSchema, updateAboutUsSchema } from '@/app/lib/validation/about-us'
import { type ZodSchema } from 'zod'

export interface ICreateAboutUsData {
  title: string
  content: string
  mediaURL?: string
}

export interface IAboutUsData {
  id: string
  title: string
  content: string
  mediaURL?: string
}

interface IReturn {
  error: boolean
  message: string
}

async function uploadMedia (mediaFile: File | null): Promise<string> {
  if (mediaFile == null) return ''
  const storageRef = ref(storage, `aboutUsMedia/${mediaFile.name}`)
  const snapshot = await uploadBytes(storageRef, mediaFile)
  return await getDownloadURL(snapshot.ref)
}

async function validateSchema<Data> (schema: ZodSchema<Data>, data: any): Promise<IReturn | null> {
  const validation = schema.safeParse(data)
  if (!(validation.success)) {
    return {
      error: true,
      message: validation.error.message
    }
  }
  return null
}

export async function createAboutUs (formData: FormData): Promise<IReturn> {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const mediaFile = formData.get('media') as File | null

  const validationResult = await validateSchema(createAboutUsSchema, { title, content, mediaFile })
  if (validationResult != null) return validationResult

  try {
    const mediaURL = await uploadMedia(mediaFile)

    await addDoc(collection(db, 'aboutUs'), {
      title,
      content,
      mediaURL
    } satisfies ICreateAboutUsData)

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

export async function readAboutUs (): Promise<IAboutUsData[]> {
  const querySnapshot: QuerySnapshot = await getDocs(collection(db, 'aboutUs'))
  return querySnapshot.docs.map((doc: { id: string, data: () => any }) => ({
    id: doc.id,
    ...doc.data()
  })) as IAboutUsData[]
}

export async function updateAboutUs (formData: FormData): Promise<IReturn> {
  const id = formData.get('id') as string
  const title = formData.get('title') as string | null
  const content = formData.get('content') as string | null
  const mediaFile = formData.get('media') as File | null

  const data = { id, title, content, mediaFile }
  const sanitizedData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null))

  const validationResult = await validateSchema(updateAboutUsSchema, sanitizedData)
  if (validationResult != null) return validationResult

  try {
    let mediaURL = ''
    if (mediaFile != null) {
      mediaURL = await uploadMedia(mediaFile)
    }

    delete sanitizedData.mediaFile

    if (mediaURL !== '') {
      sanitizedData.mediaURL = mediaURL
    }

    const docRef = doc(db, 'aboutUs', id)
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

export async function deleteAboutUs (id: string, mediaURL?: string): Promise<IReturn> {
  try {
    if (mediaURL != null) {
      const storageRef = ref(storage, mediaURL)
      await deleteObject(storageRef)
    }

    await deleteDoc(doc(db, 'aboutUs', id))

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
