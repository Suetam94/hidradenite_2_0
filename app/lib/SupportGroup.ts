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
import { createSupportGroupSchema, updateSupportGroupSchema } from '@/app/lib/validation/support-group'
import type { ZodSchema } from 'zod'

export interface ICreateSupportGroupData {
  eventDate: string
  location: string
  eventTime: string
  mediaURL?: string
}

export interface ISupportGroupData extends Required<ICreateSupportGroupData> {
  id: string
}

interface IReturn {
  error: boolean
  message: string
}

async function uploadMedia (mediaFile: File | null, path: string): Promise<string> {
  if (mediaFile == null) return ''
  const storageRef = ref(storage, `${path}/${mediaFile.name}`)
  const snapshot = await uploadBytes(storageRef, mediaFile)
  return await getDownloadURL(snapshot.ref)
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

export async function createSupportGroup (formData: FormData): Promise<IReturn> {
  const eventDate = formData.get('eventDate') as string
  const location = formData.get('location') as string
  const eventTime = formData.get('eventTime') as string
  const image = formData.get('image') as File | null

  const validationResult = await validateSchema(createSupportGroupSchema, { eventDate, location, eventTime, image })
  if (validationResult != null) return validationResult

  try {
    const mediaURL = await uploadMedia(image, 'supportGroupMedia')

    await addDoc(collection(db, 'supportGroup'), {
      eventDate,
      location,
      eventTime,
      mediaURL
    } satisfies ICreateSupportGroupData)

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

export async function readSupportGroup (): Promise<ISupportGroupData[]> {
  try {
    const querySnapshot: QuerySnapshot = await getDocs(collection(db, 'supportGroup'))
    return querySnapshot.docs.map((doc: { id: string, data: () => any }) => ({
      id: doc.id,
      ...doc.data()
    })) as ISupportGroupData[]
  } catch (error) {
    console.error('Error reading documents: ', error)
    return []
  }
}

export async function updateSupportGroup (formData: FormData): Promise<IReturn> {
  const id = formData.get('id') as string
  const eventDate = formData.get('eventDate') as string
  const location = formData.get('location') as string
  const eventTime = formData.get('eventTime') as string
  const image = formData.get('image') as File | null

  const validationResult = await validateSchema(updateSupportGroupSchema, { id, eventDate, location, eventTime, image })
  if (validationResult != null) return validationResult

  try {
    let mediaURL = ''
    if (image != null) {
      mediaURL = await uploadMedia(image, 'supportGroupMedia')
    }

    const docRef = doc(db, 'supportGroup', id)
    await updateDoc(docRef, {
      eventDate,
      location,
      eventTime,
      ...((mediaURL !== '') && { mediaURL })
    })

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

export async function deleteSupportGroup (id: string, mediaURL?: string): Promise<IReturn> {
  try {
    if (mediaURL != null) {
      const storageRef = ref(storage, mediaURL)
      await deleteObject(storageRef)
    }

    await deleteDoc(doc(db, 'supportGroup', id))

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
