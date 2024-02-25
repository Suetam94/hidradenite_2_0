import React from 'react'
import { type IFeedbackModal } from '@/app/lib/interfaces'
import { X } from '@phosphor-icons/react'

const FeedbackModal = ({ isOpen, onClose, title }: IFeedbackModal): React.JSX.Element | null => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50 transition-opacity"></div>
      <div className="bg-white rounded-lg shadow-md z-10 w-80 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={() => onClose(false)} className="focus:outline-none text-gray-500 hover:text-gray-700">
            <X />
          </button>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 focus:outline-none"
            onClick={() => onClose(false)}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackModal
