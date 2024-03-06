'use server'

import prisma from '@/app/lib/prisma.context'
import {
  type ICreateUser,
  type ICreateUserReturn,
  type IGeneralValidated, type IGetUser,
  type IGetUserParam,
  type ILogUser
} from '@/app/lib/interfaces'
import { createUserSchema, logUserSchema } from '@/app/lib/schemas'
import { type User } from '@prisma/client'
import { comparePassword, hashPassword } from '@/app/lib/util'

export const isUserAdmin = async (code: string | undefined): Promise<boolean> => {
  const adminCode = process.env.ADMIN_CODE
  return code === adminCode
}

export const validateUserData = async (data: ICreateUser): Promise<IGeneralValidated> => {
  const validatedData = createUserSchema.safeParse(data)

  if (!validatedData.success) {
    return {
      error: true,
      message: `${JSON.stringify(validatedData.error.flatten().fieldErrors)}`
    }
  }

  const duplicatedUsername = await userAlreadyExists({ username: data.username })

  if (duplicatedUsername) {
    return {
      error: true,
      message: 'O nome de usuário já existe, tente outro!'
    }
  }

  const duplicatedEmail = await userAlreadyExists({ email: data.email })

  if (duplicatedEmail) {
    return {
      error: true,
      message: 'O email já está sendo usado por outro usuário, tente outro!'
    }
  }

  return {
    error: false,
    user: validatedData.data
  }
}

export const createUser = async (data: ICreateUser): Promise<ICreateUserReturn> => {
  const { isAdmin, name, phone, password, username, email } = data

  const hashedPassword = await hashPassword(password)

  const user = await prisma.user.create({
    data: {
      isAdmin,
      name,
      phone,
      password: hashedPassword,
      username,
      email
    },
    select: {
      username: true,
      email: true
    }
  })

  if (user === null) {
    return {
      error: true,
      message: 'Não foi possível criar o usuário, tente novamente!'
    }
  }

  return user
}

export const validateUserBeforeLogIn = async (data: ILogUser): Promise<ICreateUserReturn> => {
  const validatedData = logUserSchema.safeParse(data)

  if (!validatedData.success) {
    return {
      error: true,
      message: JSON.stringify(validatedData.error.flatten().fieldErrors)
    }
  }

  const { username: validatedUser, password } = validatedData.data

  const userExists = await userAlreadyExists({ username: validatedUser })

  if (!userExists) {
    return {
      error: true,
      message: 'O usuário não existe, tente novamente!'
    }
  }

  return {
    username: validatedUser,
    password
  }
}

export const logUser = async (data: ILogUser): Promise<IGetUser> => {
  const { username: validatedUser, password } = data

  const user = await getUser({ username: validatedUser })

  const { password: hashedPassword, username, email, name, phone, id, isAdmin, updatedAt, createdAt } = user as User

  const isMatch = await comparePassword(password, hashedPassword as string)

  if (!isMatch) {
    return {
      error: true,
      message: 'The password is invalid.'
    }
  }

  return {
    error: false,
    username,
    email,
    name,
    phone,
    id,
    isAdmin,
    updatedAt,
    createdAt
  }
}

export const userAlreadyExists = async ({ id, username, email }: IGetUserParam): Promise<boolean> => {
  const user = await getUser({ id, username, email })
  return user !== null
}
const getUser = async ({ id, username, email }: IGetUserParam): Promise<User | null> => {
  return (id != null)
    ? prisma.user.findUnique({ where: { id } })
    : (username != null)
        ? prisma.user.findUnique({ where: { username } })
        : (email != null)
            ? prisma.user.findUnique({ where: { email } })
            : null
}
