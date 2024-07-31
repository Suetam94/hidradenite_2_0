'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import FeedbackModal from '@/app/ui/feedback-modal'
import Spinner from '@/app/ui/Spinner'
import { loginUser } from '@/app/lib/User'

const LoginForm = (): React.JSX.Element => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleLogUser = async (): Promise<void> => {
    try {
      setIsLoading(true)

      const { error, message } = await loginUser({ email, password })

      if (error) {
        throw new Error(message)
      }

      console.log('Login successful, redirecting to /dashboard...')
      router.push('/dashboard')
    } catch (e) {
      const err = e as Error
      setModalTitle(err.message)
      setIsModalOpen(true)
    } finally {
      setIsLoading(false)
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
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            placeholder="Digite seu email"
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
            onChange={(e) => { setPassword(e.target.value) }}
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
      <FeedbackModal isOpen={isModalOpen} onClose={setIsModalOpen} title={modalTitle} />
    </div>
  )
}

export default LoginForm
