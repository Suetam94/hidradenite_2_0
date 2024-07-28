'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'
import Spinner from '@/app/ui/Spinner'

interface IDeleteModal {
  isOpen: boolean
  closeModal: (isOpen: boolean) => void
  deleteAction: (param: string) => boolean
  param: string
}

const DeleteModal = ({ isOpen, closeModal, deleteAction, param }: IDeleteModal): React.JSX.Element => {
  if (!isOpen) {
    return <></>
  }

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const handleDelete = (): void => {
    setIsLoading(true)
    deleteAction(param)
    setIsLoading(false)
    closeModal(true)
    router.refresh()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-8 rounded shadow-lg">
        <p className="text-lg font-semibold mb-4">Tem certeza que deseja excluir este item?</p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              handleDelete()
            }}
          >
            {isLoading ? <Spinner /> : 'Excluir'}
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              closeModal(false)
            }}
          >
            {isLoading ? <Spinner /> : 'Cancelar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
