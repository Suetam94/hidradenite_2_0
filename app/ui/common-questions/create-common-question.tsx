'use client'

import React, { useState } from 'react'
import Spinner from '@/app/ui/Spinner'
import FeedbackModal from '@/app/ui/feedback-modal'
import { createCommonQuestion } from '@/app/lib/CommonQuestion'

const CreateCommonQuestion = (): React.JSX.Element => {
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')

  const closeModal = (): void => {
    setModalOpen(false)
  }

  const handleCreateCommonQuestion = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const form = new FormData()

      form.append('question', formData.question)
      form.append('answer', formData.answer)

      const { error, message } = await createCommonQuestion(form)

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
    void handleCreateCommonQuestion()
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
      <div className="text-lg font-bold">Gerenciar perguntas frequentes</div>
      <button
        className="bg-base-blue flex justify-center hover:bg-purple text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          setModalOpen(true)
        }}
      >
        {isLoading ? <Spinner /> : 'Criar Nova Pergunta Frequente'}
      </button>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-12 rounded shadow-lg max-w-xl w-full">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="commonQuestionQuestion" className="block text-gray-700 font-bold mb-2">
                  Pergunta
                </label>
                <input
                  type="text"
                  id="commonQuestionQuestion"
                  name="commonQuestionQuestion"
                  className="border p-2 w-full"
                  defaultValue={formData.question}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="commonQuestionAnswer" className="block text-gray-700 font-bold mb-2">
                  Resposta
                </label>
                <input
                  type="url"
                  id="commonQuestionAnswer"
                  name="commonQuestionAnswer"
                  className="border p-2 w-full"
                  defaultValue={formData.answer}
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
                    {isLoading ? <Spinner /> : 'Criar Pergunta Frequente'}
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

export default CreateCommonQuestion
