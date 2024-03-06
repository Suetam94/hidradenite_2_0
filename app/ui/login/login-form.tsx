'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import nookies from 'nookies'
import { logUser, validateUserBeforeLogIn } from '@/app/lib/User'
import { type IGetUser } from '@/app/lib/interfaces'
import FeedbackModal from '@/app/ui/feedback-modal'
import Spinner from '@/app/ui/Spinner'

interface LoginFormProps {
  onToggleForm: (formType: string) => void
}

const LoginForm = ({ onToggleForm }: LoginFormProps): React.JSX.Element => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleUserCookies = (user: Omit<IGetUser, 'error'>): void => {
    nookies.set(null, 'user', JSON.stringify(user), {
      maxAge: 3600 * 24 * 360,
      path: '/'
    })
  }

  const handleLogUser = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const { username: validateUsername, password: validatedPassword, error, message } = await validateUserBeforeLogIn({ username, password })

      if (error !== undefined && error) {
        throw new Error(JSON.stringify(message))
      }

      if (validateUsername !== undefined && validatedPassword !== undefined) {
        const loggedUser = await logUser({ username: validateUsername, password: validatedPassword })
        const { error, ...user } = loggedUser
        if (error) {
          throw new Error('Não foi possível fazer login.')
        }

        handleUserCookies(user)
        setIsLoading(false)
        router.push('/dashboard')
      }
    } catch (e) {
      const err = e as Error
      setModalTitle(err.message)
      setIsModalOpen(true)
    }
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    void handleLogUser()
  }

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">Nome de usuário</label>
          <input
            required
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            placeholder="Digite seu nome de usuário"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 px-4 py-2"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Senha</label>
          <input
            required
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            placeholder="Digite sua senha"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
        >
          {isLoading ? <Spinner /> : 'Entrar'}
        </button>
      </form>
      <p
        className="text-center mt-4 text-blue-600 cursor-pointer"
        onClick={() => {
          onToggleForm('register')
        }}
      >
        Registrar
      </p>
      <FeedbackModal isOpen={isModalOpen} onClose={setIsModalOpen} title={modalTitle} />
    </div>

  )
}

export default LoginForm
