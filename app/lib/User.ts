'use server'

import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { UserSchema } from '@/app/lib/validation/user'

export interface ILogin {
  email: string
  password: string
}

export interface IReturn {
  error: boolean
  message: string
}

export const authConfig = auth
export const loginObserver = onAuthStateChanged

export const loginUser = async ({ email, password }: ILogin): Promise<IReturn> => {
  try {
    const validate = UserSchema.safeParse({ email, password })

    if (!validate.success) {
      return {
        error: true,
        message: validate.error.message
      }
    }

    await signInWithEmailAndPassword(auth, email, password)

    return {
      error: false,
      message: 'Login feito com sucesso!'
    }
  } catch (e) {
    return {
      error: true,
      message: (e as Error).message
    }
  }
}
