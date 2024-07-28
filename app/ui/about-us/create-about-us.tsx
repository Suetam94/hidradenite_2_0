'use client'

import React, { useState } from 'react'
import Spinner from '@/app/ui/Spinner'
import FeedbackModal from '@/app/ui/feedback-modal'
import { createAboutUs } from '@/app/lib/AboutUs'

const CreateAboutUs = (): React.JSX.Element => {
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    media: '' as unknown as File
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')

  const closeModal = (): void => {
    setModalOpen(false)
  }

  const handleCreateAboutUs = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const form = new FormData()

      form.append('title', formData.title)
      form.append('content', formData.content)
      form.append('media', formData.media)

      const { error, message } = await createAboutUs(form)

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
    void handleCreateAboutUs()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = (e.target.files != null) ? e.target.files[0] : null
    if (file !== null) {
      setFormData({
        ...formData,
        media: file
      })
    }
  }

  return (
    <div className="flex justify-between items-center bg-gray-200 p-4">
      <div className="text-lg font-bold">Gerenciar seções da página sobre nós</div>
      <button
        className="bg-base-blue flex justify-center hover:bg-purple text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          setModalOpen(true)
        }}
      >
        {isLoading ? <Spinner /> : 'Criar Nova Seção da Página Sobre Nós'}
      </button>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                  Título da seção
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
                <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
                  Conteúdo
                </label>
                <input
                  type="text"
                  id="content"
                  name="content"
                  className="border p-2 w-full"
                  defaultValue={formData.content}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="media" className="block text-gray-700 font-bold mb-2">
                  Imagem
                </label>
                <input
                  type="file"
                  id="media"
                  name="media"
                  className="border p-2 w-full"
                  onChange={handleImageChange}
                />
              </div>
              <div className="text-center mb-4">
                <button
                  type="submit"
                  className="bg-blue-500 flex justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {isLoading ? <Spinner /> : 'Criar Nova Seção'}
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
            </form>
          </div>
        </div>
      )}
      <FeedbackModal isOpen={isModalOpen} onClose={setIsModalOpen} title={modalTitle} />
    </div>
  )
}

export default CreateAboutUs
