'use client'

import React, { useState } from 'react'
import ConfirmationModal from '@/app/ui/confirmation-modal'

interface IDashboardForm {
  initialValue: string
}

const DashboardForm = ({ initialValue }: IDashboardForm): React.JSX.Element => {
  const [textValue, setTextValue] = useState(initialValue)
  const [isEditing, setIsEditing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    setIsEditing(false)
    setIsModalOpen(true)
    // Handle form submission here
  }

  const handleEdit = (): void => {
    setIsEditing(true)
  }

  const handleSave = (): void => {
    setIsModalOpen(false)
    setIsEditing(false)
    // Handle form submission here
  }

  const handleModalClose = (): void => {
    setIsModalOpen(false)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto">
      <label className="block text-lg font-medium mb-2">Texto ao lado do instagram</label>
      <div className="border border-gray-300 rounded-md overflow-hidden">
        <textarea
          className="px-4 py-2 w-full h-32 resize-none focus:outline-none"
          placeholder="Enter text..."
          value={textValue}
          onChange={(e) => { setTextValue(e.target.value) }}
          disabled={!isEditing}
        />
      </div>
      <div className="mt-4 flex justify-end">
        {!isEditing && (
          <button
            type="button"
            className="bg-base-blue text-white px-4 py-2 mr-2 rounded hover:bg-[#3E9DD3] focus:outline-none"
            onClick={handleEdit}
          >
            Editar
          </button>
        )}
        <button type="submit" className="bg-[#FFA500] text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none">
          Salvar
        </button>
      </div>
      <ConfirmationModal isOpen={isModalOpen} onClose={handleModalClose} onSave={handleSave}/>
    </form>
  )
}

export default DashboardForm
