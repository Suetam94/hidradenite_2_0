'use client'

import React, { useState } from 'react'
import DeleteModal from '@/app/ui/delete-modal'
import FeedbackModal from '@/app/ui/feedback-modal'
import { deleteCommonQuestion, type ICommonQuestionData } from '@/app/lib/CommonQuestion'
import CommonQuestionModal from '@/app/ui/common-questions/common-question-modal'

interface ICommonQuestion extends ICommonQuestionData {
  isUpdating: boolean
  onDataChanged: () => void
}

const CommonQuestionCard = ({
  id,
  answer,
  question,
  isUpdating = false,
  onDataChanged
}: ICommonQuestion): React.JSX.Element => {
  const [modalResponse, setModalResponse] = useState<boolean | null>(null)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [feedbackMessage, setFeedbackMessage] = useState<string>('Oops! Algo deu errado, tente novamente!')

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
      return text
    }
    return text.substring(0, maxLength) + '...'
  }

  const handleDeleteCommonQuestion = (id: string): void => {
    try {
      void deleteCommonQuestion(id)
      setFeedbackMessage('Registro excluído com sucesso')
      onDataChanged()
      setDeleteModal(false)
      setModalResponse(true)
    } catch (e) {
      console.error(e)
      setFeedbackMessage('Algo deu errado, por favor, tente novamente.')
      setModalResponse(false)
    }
  }

  const closeFeedbackModal = (): void => {
    onDataChanged()
    setModalResponse(null)
    setFeedbackMessage('Oops! Algo deu errado, tente novamente!')
  }

  return (
    <div className="rounded-lg shadow-md bg-white overflow-hidden h-[500px] flex flex-col justify-between p-10">
      <div className="px-4 py-4">
        <h3 className="text-2xl font-semibold text-gray-800">{question}</h3>
      </div>
      <div className="bg-gray-100 px-4 py-2 border-t border-gray-200">
        <p className="text-base text-gray-500">{truncateText(answer, 150)}</p>
      </div>
      {isUpdating && (
        <div className="flex justify-around items-center mt-4">
          <button
            onClick={() => {
              setIsModalOpen(true)
            }}
            className="bg-cyan-400 flex justify-center hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          >
            Editar
          </button>
          <button
            onClick={() => {
              setDeleteModal(true)
            }}
            className="bg-red-500 flex justify-center hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
          >
            Excluir
          </button>
        </div>
      )}
      {isModalOpen && (
        <CommonQuestionModal
          commonQuestion={{ id, question, answer }}
          modalResponse={setModalResponse}
          closeModal={setIsModalOpen}
          isUpdating={isUpdating}
          setFeedbackMessage={setFeedbackMessage}
        />
      )}
      {id !== undefined && (
        <DeleteModal
          isOpen={deleteModal}
          closeModal={setDeleteModal}
          deleteAction={handleDeleteCommonQuestion}
          param={id}
        />
      )}
      {modalResponse !== null && (
        <FeedbackModal
          isOpen={true}
          onClose={closeFeedbackModal}
          title={feedbackMessage ?? ''}
        />
      )}
    </div>
  )
}

export default CommonQuestionCard
