'use client'

import React, { useEffect, useState } from 'react'
import DeleteModal from '@/app/ui/delete-modal'
import FeedbackModal from '@/app/ui/feedback-modal'
import AboutUsModal from '@/app/ui/about-us/about-us-modal'
import { deleteAboutUs } from '@/app/lib/AboutUs'

export interface IAboutUs {
  id?: string
  title?: string
  content?: string
  imageString?: string
  isUpdating?: boolean
  onDataChanged: () => void
}

const AboutUsCard = ({
  id,
  title,
  content,
  imageString,
  isUpdating = false,
  onDataChanged
}: IAboutUs): React.JSX.Element => {
  const [modalResponse, setModalResponse] = useState<boolean | null>(null)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [imgSrc, setImgSrc] = useState(imageString)
  const [isValid, setIsValid] = useState(true)
  const [feedbackMessage, setFeedbackMessage] = useState<string>('Oops! Algo deu errado, tente novamente!')

  const handleDeleteAboutUs = (id: string): void => {
    try {
      void deleteAboutUs(id)
      setFeedbackMessage('Registro excluído com sucesso')
      onDataChanged()
      setModalResponse(true)
    } catch (e) {
      console.error(e)
      setFeedbackMessage('Algo deu errado, por favor, tente novamente.')
      setModalResponse(false)
    }
  }

  const closeFeedbackModal = (): void => {
    setModalResponse(null)
    setFeedbackMessage('Oops! Algo deu errado, tente novamente!')
    onDataChanged()
  }

  useEffect((): void => {
    setImgSrc(imageString)
    setIsValid(true)
  }, [imageString])

  const handleError = (): void => {
    setIsValid(false)
  }

  const handleLoad = (): void => {
    setIsValid(true)
  }

  return (
    <div className="rounded-lg shadow-md bg-white h-[500px] flex flex-col justify-between overflow-hidden p-10">
      {imgSrc != null && isValid
        ? (
        <img
          src={imgSrc}
          alt="Grupo de apoio"
          onError={handleError}
          onLoad={handleLoad}
          className="w-full h-40 object-contain"
        />
          )
        : (
        <div className="h-40 w-full"></div>
          )}
      <div className="px-4 py-4">
        <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="bg-gray-100 px-4 py-2 border-t border-gray-200 break-words">
        <p className="text-base text-gray-500">{content}</p>
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
        <AboutUsModal
          aboutUs={{ id, title, content }}
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
          deleteAction={handleDeleteAboutUs}
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

export default AboutUsCard
