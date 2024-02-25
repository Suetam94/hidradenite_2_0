'use client'

import React, { useEffect, useState } from 'react'
import ConfirmationModal from '@/app/ui/confirmation-modal'
import { getPageContentByPageTitle, pageContent } from '@/app/lib/PageContent'
import { type IDashboardForm } from '@/app/lib/interfaces'
import Spinner from '@/app/ui/Spinner'

const DashboardForm = ({
  page,
  contentId,
  formTitle,
  defaultColor
}: IDashboardForm): React.JSX.Element => {
  const [textValue, setTextValue] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    void (async () => {
      setIsLoading(true)
      const pageContent = await getPageContentByPageTitle(page, contentId)
      if (pageContent !== null) {
        const { textContent } = pageContent
        if (textContent !== null) {
          setTextValue(textContent)
        }
      }
      setIsLoading(false)
    })()
  }, [page])

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    setIsEditing(false)
    setIsModalOpen(true)
  }

  const handleEdit = (): void => {
    setIsEditing(true)
  }

  const handleCancelEdit = (): void => {
    setIsEditing(false)
  }

  const handleSave = async (answer: boolean): Promise<void> => {
    setIsModalOpen(false)
    setIsEditing(false)
    if (answer) {
      setIsLoading(true)
      if (textValue !== undefined) {
        await pageContent({
          page,
          contentId,
          textContent: textValue,
          color: defaultColor
        }, 'text')
      }
    }
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto">
      <label className="block text-lg font-medium mb-2">{formTitle}</label>
      <div className="border border-gray-300 h-32 rounded-md overflow-hidden flex justify-center items-center">
        {
          isLoading
            ? <Spinner />
            : <textarea
              className="px-4 py-2 w-full h-32 resize-none focus:outline-none"
              placeholder="Enter text..."
              value={textValue ?? ''}
              onChange={(e) => {
                setTextValue(e.target.value)
              }}
              disabled={!isEditing}
              name="textContent"
            />
        }
      </div>
      <div className="mt-4 flex justify-end">
        {!isEditing
          ? (
          <button
            type="button"
            className="bg-base-blue text-white px-4 py-2 mr-2 rounded hover:bg-[#3E9DD3] focus:outline-none"
            onClick={handleEdit}
          >
            Editar
          </button>
            )
          : (<button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 mr-2 rounded hover:hover:bg-gray-400 focus:outline-none"
          onClick={handleCancelEdit}
        >
          Cancelar
        </button>)}
        <button type="submit" className="bg-[#FFA500] text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none">
          Salvar
        </button>
      </div>
      <ConfirmationModal isOpen={isModalOpen} onSave={handleSave} />
    </form>
  )
}

export default DashboardForm
