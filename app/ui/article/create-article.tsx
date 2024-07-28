'use client'

import React, { useState } from 'react'
import Spinner from '@/app/ui/Spinner'
import FeedbackModal from '@/app/ui/feedback-modal'
import { createArticle } from '@/app/lib/Article'

const CreateArticle = (): React.JSX.Element => {
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    resume: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')

  const closeModal = (): void => {
    setModalOpen(false)
  }

  const handleCreateArticle = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const form = new FormData()

      form.append('title', formData.title)
      form.append('link', formData.link)
      form.append('resume', formData.resume)

      const { error, message } = await createArticle(form)

      if (error) {
        throw new Error(message)
      }

      setIsLoading(false)

      setModalTitle(message)
      setIsModalOpen(true)
    } catch (e) {
      const err = e as Error
      setIsLoading(false)
      setModalTitle(`${err.message}`)
      setIsModalOpen(true)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    closeModal()
    void handleCreateArticle()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <div className="flex justify-between items-center bg-gray-200 p-4">
      <div className="text-lg font-bold">Gerenciar artigos</div>
      <button
        className="bg-base-blue flex justify-center hover:bg-purple text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          setModalOpen(true)
        }}
      >
        {isLoading ? <Spinner /> : 'Criar Novo Artigo'}
      </button>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-12 rounded shadow-lg max-w-xl w-full">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="border p-2 w-full"
                  defaultValue={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="link" className="block text-gray-700 font-bold mb-2">
                  Link/Endereço
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  className="border p-2 w-full"
                  defaultValue={formData.link}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="resume" className="block text-gray-700 font-bold mb-2">
                  Resumo do artigo
                </label>
                <textarea
                  id="resume"
                  name="resume"
                  className="border p-2 w-full h-44 resize-none"
                  defaultValue={formData.resume}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-center mb-4">
                  <button
                    type="submit"
                    className="bg-blue-500 flex justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {isLoading ? <Spinner /> : 'Criar Artigo'}
                  </button>
                </div>
                <div className="text-center">
                  <button
                    className="bg-gray-600 flex justify-center hover:bg-gray-300 text-white font-bold py-2 px-4 rounded"
                    onClick={closeModal}
                  >
                    {isLoading ? <Spinner /> : 'Fechar'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      <FeedbackModal isOpen={isModalOpen} onClose={setIsModalOpen} title={modalTitle} />
    </div>
  )
}

export default CreateArticle
