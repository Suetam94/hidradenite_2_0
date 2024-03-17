'use client'

import React, { useEffect, useState } from 'react'
import Spinner from '@/app/ui/Spinner'
import { updateSupportGroupEvent, validateUpdateSupportGroupEvent } from '@/app/lib/SupportGroup'
import { type SupportGroup } from '@prisma/client'

interface ISupportGroupModal {
  supportGroup?: Partial<SupportGroup>
  isUpdating?: boolean
  modalResponse: (success: boolean) => void
  closeModal: (isOpen: boolean) => void
}

const SupportGroupModal = ({ supportGroup, modalResponse, isUpdating, closeModal }: ISupportGroupModal): React.JSX.Element => {
  const [formData, setFormData] = useState({
    eventDate: '',
    location: '',
    eventTime: '',
    image: '' as unknown as File
  })
  const [actualFormData, setActualFormData] = useState<Partial<SupportGroup> | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (supportGroup !== undefined) {
      setActualFormData({ ...supportGroup })
    }
  }, [supportGroup])

  const handleUpdateSupportGroupEvent = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const form = new FormData()

      if (actualFormData !== undefined && actualFormData.id !== 0) {
        form.append('id', actualFormData.id as unknown as string)
      }

      form.append('eventDate', formData.eventDate)
      form.append('location', formData.location)
      form.append('eventTime', formData.eventTime)
      form.append('image', formData.image)

      const { error, message } = await validateUpdateSupportGroupEvent(form)

      if (error) {
        throw new Error(JSON.stringify(message))
      }

      const updatedSupportGroupEvent = await updateSupportGroupEvent(form)

      console.log(updatedSupportGroupEvent)
      modalResponse(true)
      setIsLoading(false)
    } catch (e) {
      const err = e as Error
      console.log(err)
      modalResponse(false)
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    void handleUpdateSupportGroupEvent()
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
              value={isUpdating === true && formData.eventDate === '' ? actualFormData?.eventDate : formData.eventDate}
              onChange={handleChange}
              required={isUpdating === false}
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
              value={isUpdating === true && formData.location === '' ? actualFormData?.location : formData.location}
              onChange={handleChange}
              required={isUpdating === false}
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
              value={isUpdating === true && formData.eventTime === '' ? actualFormData?.eventTime : formData.eventTime}
              onChange={handleChange}
              required={isUpdating === false}
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
              required={isUpdating === false}
            />
          </div>
          <div className="text-center flex items-center justify-center mb-4">
            <button
              type="submit"
              className="bg-blue-500 flex justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isLoading ? <Spinner /> : isUpdating === true ? 'Editar Grupo de Apoio' : 'Criar Grupo de Apoio'}
            </button>
          </div>
          <div className="flex items-center justify-center text-center">
            <button
              className="bg-gray-600 flex justify-center hover:bg-gray-300 text-white font-bold py-2 px-4 rounded"
              onClick={() => { closeModal(false) }}
            >
              {isLoading ? <Spinner /> : 'Fechar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SupportGroupModal
