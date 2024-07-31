'use client'

import React, { useEffect, useState } from 'react'
import Spinner from '@/app/ui/Spinner'
import { type IArticleData, updateArticle } from '@/app/lib/Article'

interface IArticleModal {
  article?: Partial<IArticleData>
  isUpdating?: boolean
  modalResponse: (success: boolean) => void
  closeModal: (isOpen: boolean) => void
  setFeedbackMessage?: (message: string) => void
}

const ArticleModal: React.FC<IArticleModal> = ({
  article,
  modalResponse,
  isUpdating,
  closeModal,
  setFeedbackMessage
}) => {
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    resume: ''
  })
  const [actualFormData, setActualFormData] = useState<Partial<IArticleData> | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (article !== undefined) {
      setActualFormData({ ...article })
      setFormData({
        title: article.title ?? '',
        link: article.link ?? '',
        resume: article.resume ?? ''
      })
    }
  }, [article])

  const isFormDataEmpty = (formData: FormData): boolean => {
    const formObject = Object.fromEntries(formData.entries())
    return Object.values(formObject).every(value => value === '')
  }

  const sanitizeFormData = (formData: FormData): FormData => {
    const sanitizedForm = new FormData()
    formData.forEach((value, key) => {
      if (value !== '') {
        sanitizedForm.append(key, value)
      }
    })
    return sanitizedForm
  }

  const handleUpdateArticle = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const form = new FormData()

      form.append('title', formData.title)
      form.append('link', formData.link)
      form.append('resume', formData.resume)

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

      const { error, message } = await updateArticle(sanitizedForm)

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
    void handleUpdateArticle()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
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
              value={formData.title}
              onChange={handleChange}
              required={isUpdating === false}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="link" className="block text-gray-700 font-bold mb-2">
              Link
            </label>
            <input
              type="text"
              id="link"
              name="link"
              className="border p-2 w-full"
              value={formData.link}
              onChange={handleChange}
              required={isUpdating === false}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="resume" className="block text-gray-700 font-bold mb-2">
              Resumo
            </label>
            <textarea
              id="resume"
              name="resume"
              className="border p-2 w-full h-44 resize-none"
              value={formData.resume}
              onChange={handleChange}
              required
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
              type="button"
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

export default ArticleModal
