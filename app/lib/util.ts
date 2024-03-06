'use server'

import { compare, hash } from 'bcrypt'

export const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, 10)
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await compare(password, hashedPassword)
}

export const isAdminCodeValid = (code: string): boolean => {
  const adminCode = process.env.ADMIN_CODE
  return adminCode === code
}
