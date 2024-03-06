'use client'

import React, { useEffect, useState } from 'react'
import { type ICreateUser } from '@/app/lib/interfaces'
import { createUser, isUserAdmin, validateUserData } from '@/app/lib/User'
import FeedbackModal from '@/app/ui/feedback-modal'
import Spinner from '@/app/ui/Spinner'

interface RegisterFormProps {
  onToggleForm: (formType: string) => void
}

type Field = keyof ICreateUser

const RegisterForm = ({ onToggleForm }: RegisterFormProps): React.JSX.Element => {
  const [user, setUser] = useState<Partial<ICreateUser> | null>(null)
  const [adminCode, setAdminCode] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleManageUserInputs = (field: Field, value: string | boolean): void => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value
    }))
  }

  const handleIsAdmin = async (): Promise<void> => {
    const isAdmin = await isUserAdmin(adminCode)
    handleManageUserInputs('isAdmin', isAdmin)
  }

  useEffect(() => {
    void (async () => {
      await handleIsAdmin()
    })()
  }, [adminCode])

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    void handleCreateUser()
  }

  const handleCreateUser = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const { error, message, user: userParsedData } = await validateUserData(user as ICreateUser)

      if (error) {
        throw new Error(JSON.stringify(message))
      }

      if (userParsedData !== undefined) {
        const { error, message, username } = await createUser(userParsedData)

        if (error !== undefined && error) {
          throw new Error(JSON.stringify(message))
        }

        setModalTitle(`Usuário ${username} criado com sucesso!`)
        setIsModalOpen(true)
      }
      setIsLoading(false)
    } catch (e) {
      const err = e as Error
      setModalTitle(err.message)
      setIsModalOpen(true)
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Registrar</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
          <input
            required
            type="email"
            id="email"
            name="email"
            placeholder="Digite seu email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 px-4 py-2"
            onChange={(event) => {
              handleManageUserInputs('email', event.target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Senha</label>
          <input
            required
            type="password"
            id="password"
            name="password"
            placeholder="Digite sua senha"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 px-4 py-2"
            onChange={(event) => {
              handleManageUserInputs('password', event.target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-gray-700 font-semibold mb-1">Celular</label>
          <input
            required
            type="text"
            id="phone"
            name="phone"
            placeholder="Digite seu celular"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 px-4 py-2"
            onChange={(event) => {
              handleManageUserInputs('phone', event.target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">Nome de usuário</label>
          <input
            required
            type="text"
            id="username"
            name="username"
            placeholder="Digite seu nome de usuário"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 px-4 py-2"
            onChange={(event) => {
              handleManageUserInputs('username', event.target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">Nome completo</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            placeholder="Digite seu nome completo"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 px-4 py-2"
            onChange={(event) => {
              handleManageUserInputs('name', event.target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="adminCode" className="block text-gray-700 font-semibold mb-1">Código de administrador</label>
          <input
            type="text"
            id="adminCode"
            name="adminCode"
            placeholder="Digite seu código de administrador (campo opcional)"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 px-4 py-2"
            onChange={(event) => {
              setAdminCode(event.target.value)
            }}
          />
        </div>
        <button type="submit"
                disabled={isLoading}
                className="w-full bg-purple flex justify-center items-center text-center text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-200">{isLoading
                  ? <Spinner />
                  : 'Registrar'}
        </button>
      </form>
      <p className="text-center mt-4 text-blue-600 cursor-pointer" onClick={() => {
        onToggleForm('login')
      }}>Voltar para Login</p>
      <FeedbackModal isOpen={isModalOpen} onClose={setIsModalOpen} title={modalTitle} confirmAction={onToggleForm} confirmParam={'login'} />
    </div>
  )
}

export default RegisterForm
