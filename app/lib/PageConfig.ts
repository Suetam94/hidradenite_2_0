import {
  addDoc,
  collection,
  doc,
  getDocs, query, type QuerySnapshot,
  updateDoc, where
} from 'firebase/firestore'
import { db, storage } from '@/config/firebase'
import { fileSchema, hexColorSchema, textSchema } from '@/app/lib/validation/home'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

interface IReturn {
  error: boolean
  message: string
  data?: {
    color?: string
    imageUrl?: string
    textContent?: {
      text: string
      color: string
    }
  }
}

export const saveGeneralColor = async (color: string): Promise<IReturn> => {
  try {
    const validate = hexColorSchema.safeParse(color)
    if (!validate.success) {
      return {
        error: true,
        message: validate.error.message
      }
    }

    const q = query(collection(db, 'config'), where('type', '==', 'color'))
    const querySnapshot: QuerySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id
      const docRef = doc(db, 'config', docId)
      await updateDoc(docRef, { color })

      return {
        error: false,
        message: 'Cor atualizada com sucesso.'
      }
    } else {
      await addDoc(collection(db, 'config'), { color, type: 'color' })

      return {
        error: false,
        message: 'Cor salva com sucesso.'
      }
    }
  } catch (e) {
    return {
      error: true,
      message: (e as Error).message
    }
  }
}

export const getGeneralColor = async (): Promise<IReturn> => {
  try {
    const q = query(collection(db, 'config'), where('type', '==', 'color'))
    const querySnapshot: QuerySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const color = querySnapshot.docs[0].data().color as string
      return {
        error: false,
        message: 'Cor encontrada com sucesso.',
        data: { color }
      }
    } else {
      return {
        error: true,
        message: 'Nenhuma cor encontrada.'
      }
    }
  } catch (e) {
    return {
      error: true,
      message: (e as Error).message
    }
  }
}

export const saveBannerImage = async (formData: FormData): Promise<IReturn> => {
  try {
    const file = formData.get('file') as File
    const validate = fileSchema.safeParse(file)

    if (!validate.success) {
      return {
        error: true,
        message: validate.error.errors[0].message
      }
    }

    const storageRef = ref(storage, `config/banner/${file.name}`)
    const snapshot = await uploadBytes(storageRef, file)
    const imageUrl = await getDownloadURL(snapshot.ref)

    const q = query(collection(db, 'config'), where('type', '==', 'banner'))
    const querySnapshot: QuerySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id
      const docRef = doc(db, 'config', docId)
      await updateDoc(docRef, { imageUrl })

      return {
        error: false,
        message: 'Banner atualizado com sucesso',
        data: { imageUrl }
      }
    } else {
      await addDoc(collection(db, 'config'), { imageUrl, type: 'banner' })

      return {
        error: false,
        message: 'Banner salvo com sucesso',
        data: { imageUrl }
      }
    }
  } catch (e) {
    return {
      error: true,
      message: (e as Error).message
    }
  }
}

export const getBannerImage = async (): Promise<IReturn> => {
  try {
    const q = query(collection(db, 'config'), where('type', '==', 'banner'))
    const querySnapshot: QuerySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const bannerData = querySnapshot.docs[0].data()
      const imageUrl = bannerData.imageUrl
      return {
        error: false,
        message: 'Banner encontrado com sucesso.',
        data: {
          imageUrl
        }
      }
    } else {
      return {
        error: true,
        message: 'Nenhum banner encontrado.'
      }
    }
  } catch (e) {
    return {
      error: true,
      message: (e as Error).message
    }
  }
}

export const saveTextContent = async (text: string, color: string, contentId: string): Promise<IReturn> => {
  try {
    const validate = textSchema.safeParse({ text, color, contentId })

    if (!validate.success) {
      return {
        error: true,
        message: validate.error.message
      }
    }

    const q = query(collection(db, 'config'), where('type', '==', 'text'), where('contentId', '==', contentId))
    const querySnapshot: QuerySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id
      const docRef = doc(db, 'config', docId)
      await updateDoc(docRef, { text, color })

      return {
        error: false,
        message: 'Texto atualizado com sucesso.'
      }
    } else {
      await addDoc(collection(db, 'config'), { text, color, contentId, type: 'text' })

      return {
        error: false,
        message: 'Texto salvo com sucesso.'
      }
    }
  } catch (e) {
    return {
      error: true,
      message: (e as Error).message
    }
  }
}

export const getTextContent = async (contentId: string): Promise<IReturn> => {
  try {
    const q = query(collection(db, 'config'), where('type', '==', 'text'), where('contentId', '==', contentId))
    const querySnapshot: QuerySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const textData = querySnapshot.docs[0].data()
      return {
        error: false,
        message: 'Texto encontrado com sucesso.',
        data: {
          textContent: {
            text: textData.text,
            color: textData.color
          }
        }
      }
    } else {
      return {
        error: true,
        message: 'Nenhum texto encontrado com o contentId fornecido.'
      }
    }
  } catch (e) {
    return {
      error: true,
      message: (e as Error).message
    }
  }
}
