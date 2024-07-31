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
import { db } from '@/config/firebase'
import {
  createCommonQuestionSchema,
  updateCommonQuestionSchema
} from '@/app/lib/validation/common-question'
import { type ZodSchema } from 'zod'

export interface ICreateCommonQuestionData {
  question: string
  answer: string
}

export interface ICommonQuestionData extends ICreateCommonQuestionData {
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

export async function createCommonQuestion (formData: FormData): Promise<IReturn> {
  const question = formData.get('question') as string
  const answer = formData.get('answer') as string

  console.log(question)

  const validationResult = await validateSchema(createCommonQuestionSchema, { question, answer })
  if (validationResult != null) return validationResult

  try {
    await addDoc(collection(db, 'commonQuestion'), {
      question,
      answer
    } satisfies ICreateCommonQuestionData)

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

export async function readCommonQuestions (): Promise<ICommonQuestionData[]> {
  try {
    const querySnapshot: QuerySnapshot = await getDocs(collection(db, 'commonQuestion'))
    return querySnapshot.docs.map((doc: { id: string, data: () => any }) => ({
      id: doc.id,
      ...doc.data()
    })) as ICommonQuestionData[]
  } catch (error) {
    console.error('Error reading documents: ', error)
    return []
  }
}

export async function updateCommonQuestion (formData: FormData): Promise<IReturn> {
  const id = formData.get('id') as string
  const question = formData.get('question') as string
  const answer = formData.get('answer') as string

  const validationResult = await validateSchema(updateCommonQuestionSchema, { question, answer })
  if (validationResult != null) return validationResult

  try {
    const docRef = doc(db, 'commonQuestion', id)
    await updateDoc(docRef, {
      question,
      answer
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

export async function deleteCommonQuestion (id: string): Promise<IReturn> {
  try {
    await deleteDoc(doc(db, 'commonQuestion', id))

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
