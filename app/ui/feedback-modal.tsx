import React from 'react'
import { type IFeedbackModal } from '@/app/lib/interfaces'
import { X } from '@phosphor-icons/react'

const FeedbackModal = ({ isOpen, onClose, title, confirmAction, confirmParam }: IFeedbackModal): React.JSX.Element | null => {
  if (!isOpen) {
    return null
  }

  const handleCloseAction = (): void => {
    if (confirmAction != null && confirmParam !== undefined) {
      confirmAction(confirmParam)
    }

    onClose(false)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50 transition-opacity"></div>
      <div className="bg-white rounded-lg shadow-md z-10 w-96 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={() => { onClose(false) }}
            className="focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-gray-700 hover:text-red-500 px-3 py-2 rounded-md"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={handleCloseAction}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeedbackModal
