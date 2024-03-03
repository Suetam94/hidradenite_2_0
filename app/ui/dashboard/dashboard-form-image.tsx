'use client'

import React, { useEffect, useState } from 'react'
import { Img } from 'react-image'
import { type IDashboardImageForm } from '@/app/lib/interfaces'
import {
  getMediaBufferAndManage,
  getPageContentMediaByPageTitle
} from '@/app/lib/PageContent'
import FeedbackModal from '@/app/ui/feedback-modal'
import Spinner from '@/app/ui/Spinner'

const DashboardFormImage = ({ page, contentId, formTitle }: IDashboardImageForm): React.JSX.Element => {
  const [image, setImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const getPageContentMedia = async (): Promise<void> => {
    try {
      const mediaContent = await getPageContentMediaByPageTitle(page, contentId)
      setImage(mediaContent)
    } catch (e) {
      const error = e as Error
      console.error(`Error: ${error.message}`)
    }
  }

  useEffect(() => {
    void (async () => {
      setIsLoading(true)
      await getPageContentMedia()
      setIsLoading(false)
    })()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile != null) {
      const reader = new FileReader()
      reader.onload = () => {
        const dataURL = reader.result as string
        setImage(dataURL)
        setFile(selectedFile)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleDownload = (): void => {
    if (image != null) {
      const a = document.createElement('a')
      a.href = image
      a.download = 'image.png'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  const handleClearImage = (): void => {
    setImage(null)
    setFile(null)
  }

  const handleSaveImage = async (): Promise<void> => {
    try {
      if (file === null) {
        throw new Error('Nenhum arquivo selecionado.')
      }

      const formData = new FormData()
      formData.append('file', file)
      formData.append('page', page)
      formData.append('contentId', contentId)

      setIsUploading(true)
      await getMediaBufferAndManage(formData)
      setIsUploading(false)
      setModalTitle('Imagem salva com sucesso!')
      setIsOpen(true)
    } catch (e) {
      const error = e as Error
      console.error('Erro ao salvar imagem:', error.message)
      setModalTitle(`Erro! ${error.message}`)
      setIsOpen(true)
    }
  }

  return (
    <div className="max-w-full w-full mx-auto">
      <label className="block text-lg font-medium mb-2">{formTitle}</label>
      {(image == null) && (
        <div>
          <label htmlFor="image" className="block text-lg font-medium mb-2">
            Upload Image
          </label>
          <div className="flex items-center justify-center bg-gray-100 p-4 rounded-md">
            <label htmlFor="image-upload" className="cursor-pointer">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <input type="file" id="image-upload" accept="image/*" className="sr-only" onChange={handleFileChange} />
            </label>
          </div>
        </div>
      )}
      {(image != null) && (
        <div className="mt-4">
          <Img
            src={image}
            alt="Uploaded"
            className="w-full h-auto rounded-md"
            style={{
              maxWidth: '500px',
              maxHeight: '500px'
            }}
          />
        </div>
      )}
      {(image != null) && (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleDownload}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 focus:outline-none"
          >
            { isUploading ? <Spinner /> : 'Download Image' }
          </button>
          <button
            type="button"
            onClick={handleClearImage}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 focus:outline-none"
          >
            {isUploading ? <Spinner /> : 'Clear Image'}
          </button>
        </div>
      )}
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={file == null}
          className="bg-[#FFA500] text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
          onClick={() => handleSaveImage}
        >
          {isUploading || isLoading ? <Spinner/> : 'Salvar'}
        </button>
      </div>
      <FeedbackModal isOpen={isOpen} onClose={setIsOpen} title={modalTitle} />
    </div>
  )
}

export default DashboardFormImage
