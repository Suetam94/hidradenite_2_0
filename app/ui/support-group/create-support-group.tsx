'use client'

import React, { useState } from 'react'
import { createSupportGroup } from '@/app/lib/SupportGroup'
import Spinner from '@/app/ui/Spinner'
import FeedbackModal from '@/app/ui/feedback-modal'

interface ICreateSupportGroupProps {
  onSupportGroupCreated: () => void
}

const CreateSupportGroup = ({ onSupportGroupCreated }: ICreateSupportGroupProps): React.JSX.Element => {
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    eventDate: '',
    location: '',
    eventTime: '',
    image: '' as unknown as File
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')

  const closeModal = (): void => {
    setModalOpen(false)
  }

  const handleCreateSupportGroupEvent = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const form = new FormData()

      form.append('eventDate', formData.eventDate)
      form.append('location', formData.location)
      form.append('eventTime', formData.eventTime)
      form.append('image', formData.image)

      const { error, message } = await createSupportGroup(form)

      if (error) {
        throw new Error(message)
      }

      setIsLoading(false)

      setModalTitle(message)
      setIsModalOpen(true)
      onSupportGroupCreated()
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
    void handleCreateSupportGroupEvent()
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
        image: file
      })
    }
  }

  return (
    <div className="flex justify-between items-center bg-gray-200 p-4">
      <div className="text-lg font-bold">Gerenciar grupos de apoio</div>
      <button
        className="bg-base-blue flex justify-center hover:bg-purple text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          setModalOpen(true)
        }}
      >
        {isLoading ? <Spinner /> : 'Criar Novo Grupo de Apoio'}
      </button>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="eventDate" className="block text-gray-700 font-bold mb-2">
                  Data do Evento
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  className="border p-2 w-full"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
                  Localização
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="border p-2 w-full"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="eventTime" className="block text-gray-700 font-bold mb-2">
                  Hora do Evento
                </label>
                <input
                  type="time"
                  id="eventTime"
                  name="eventTime"
                  className="border p-2 w-full"
                  value={formData.eventTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                  Imagem
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="border p-2 w-full"
                  onChange={handleImageChange}
                  required
                />
              </div>
              <div className="text-center mb-4">
                <button
                  type="submit"
                  className="bg-blue-500 flex justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {isLoading ? <Spinner /> : 'Criar Grupo de Apoio'}
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

export default CreateSupportGroup
