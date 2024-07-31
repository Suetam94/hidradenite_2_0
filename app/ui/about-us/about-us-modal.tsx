'use client'

import React, { useEffect, useState } from 'react'
import Spinner from '@/app/ui/Spinner'
import { updateAboutUs } from '@/app/lib/AboutUs'
import { isFormDataEmpty, sanitizeFormData } from '@/app/lib/util'

export interface IAboutUs {
  id?: string
  title?: string
  content?: string
  imageString?: string
  isUpdating?: boolean
}

interface ICommonQuestionModal {
  aboutUs?: Partial<IAboutUs>
  isUpdating?: boolean
  modalResponse: (success: boolean) => void
  closeModal: (isOpen: boolean) => void
  setFeedbackMessage?: (message: string) => void
}

const AboutUsModal = ({ aboutUs, modalResponse, isUpdating, closeModal, setFeedbackMessage }: ICommonQuestionModal): React.JSX.Element => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    media: '' as unknown as File
  })
  const [actualFormData, setActualFormData] = useState<Partial<IAboutUs> | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (aboutUs !== undefined) {
      setActualFormData({ ...aboutUs })
    }
  }, [aboutUs])

  const handleUpdateAboutUs = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const form = new FormData()

      form.append('title', formData.title)
      form.append('content', formData.content)
      form.append('media', formData.media)

      if (actualFormData !== undefined && actualFormData.id !== '' && actualFormData.id !== undefined) {
        form.append('id', actualFormData.id)
      }

      const sanitizedForm = sanitizeFormData(form)

      if (isFormDataEmpty(sanitizedForm)) {
        modalResponse(false)
        setIsLoading(false)
        if (setFeedbackMessage != null) {
          setFeedbackMessage('Por favor, preencha pelo menos um campo.')
        }
        return
      }

      const { error, message } = await updateAboutUs(sanitizedForm)

      if (error) {
        throw new Error(message)
      }

      modalResponse(true)
      setIsLoading(false)
      if (setFeedbackMessage != null) {
        setFeedbackMessage('Operação realizada com sucesso')
      }
      closeModal(false)
    } catch (e) {
      const err = e as Error
      console.error(err)
      modalResponse(false)
      setIsLoading(false)
      if (setFeedbackMessage != null) {
        setFeedbackMessage(err.message)
      }
      closeModal(false)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    void handleUpdateAboutUs()
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
              value={isUpdating === true && formData.title === '' ? actualFormData?.title : formData.title}
              onChange={handleChange}
              required={isUpdating === false}
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
              value={isUpdating === true && formData.content === '' ? actualFormData?.content : formData.content}
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
              {isLoading ? <Spinner /> : isUpdating === true ? 'Editar Seção Sobre Nós' : 'Criar Seção Sobre Nós'}
            </button>
          </div>
          <div className="flex items-center justify-center text-center">
            <button
              className="bg-gray-600 flex justify-center hover:bg-gray-300 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                closeModal(false)
              }}
            >
              {isLoading ? <Spinner /> : 'Fechar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AboutUsModal
