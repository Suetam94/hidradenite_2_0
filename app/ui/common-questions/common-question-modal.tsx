'use client'

import React, { useEffect, useState } from 'react'
import Spinner from '@/app/ui/Spinner'
import { type CommomQuestion } from '@prisma/client'
import { validateUpdateCommonQuestion, updateCommonQuestion } from '@/app/lib/CommonQuestion'

interface ICommonQuestionModal {
  commonQuestion?: Partial<CommomQuestion>
  isUpdating?: boolean
  modalResponse: (success: boolean) => void
  closeModal: (isOpen: boolean) => void
}

const CommonQuestionModal = ({ commonQuestion, modalResponse, isUpdating, closeModal }: ICommonQuestionModal): React.JSX.Element => {
  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  })
  const [actualFormData, setActualFormData] = useState<Partial<CommomQuestion> | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (commonQuestion !== undefined) {
      setActualFormData({ ...commonQuestion })
    }
  }, [commonQuestion])

  const handleUpdateCommonQuestion = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const form = new FormData()

      if (actualFormData !== undefined && actualFormData.id !== 0) {
        form.append('id', actualFormData.id as unknown as string)
      }

      form.append('question', formData.question)
      form.append('answer', formData.answer)

      const { error, message } = validateUpdateCommonQuestion(form)

      if (error) {
        throw new Error(JSON.stringify(message))
      }

      await updateCommonQuestion(form)

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
    void handleUpdateCommonQuestion()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-8 rounded shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="question" className="block text-gray-700 font-bold mb-2">
              Pergunta
            </label>
            <input
              type="text"
              id="question"
              name="question"
              className="border p-2 w-full"
              value={isUpdating === true && formData.question === '' ? actualFormData?.question : formData.question}
              onChange={handleChange}
              required={isUpdating === false}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="answer" className="block text-gray-700 font-bold mb-2">
              Resposta
            </label>
            <input
              type="text"
              id="answer"
              name="answer"
              className="border p-2 w-full"
              value={isUpdating === true && formData.answer === '' ? actualFormData?.answer : formData.answer}
              onChange={handleChange}
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

export default CommonQuestionModal
