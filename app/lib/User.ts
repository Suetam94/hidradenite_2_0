'use client'

import { signInWithEmailAndPassword } from 'firebase/auth'
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

export const loginUser = async ({ email, password }: ILogin): Promise<IReturn> => {
  try {
    const validate = UserSchema.safeParse({ email, password })

    if (!validate.success) {
      return {
        error: true,
        message: validate.error.message
      }
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    localStorage.setItem('user', JSON.stringify(user))

    return { error: false, message: 'Login bem-sucedido' }
  } catch (e) {
    return {
      error: true,
      message: (e as Error).message
    }
  }
}
