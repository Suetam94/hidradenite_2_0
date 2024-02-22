'use client'

import React, { useState } from 'react'

const DashboardFormImage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        const dataURL = reader.result as string
        setImage(dataURL)
        setFile(selectedFile)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleDownload = () => {
    if (image) {
      const a = document.createElement('a')
      a.href = image
      a.download = 'image.png'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  const handleClearImage = () => {
    setImage(null);
    setFile(null);
  };

  return (
    <div className="max-w-full w-full mx-auto">
      {!image && (
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
      {image && (
        <div className="mt-4">
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-auto rounded-md"
            style={{ maxWidth: '500px', maxHeight: '500px' }}
          />
        </div>
      )}
      {image && (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleDownload}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 focus:outline-none"
          >
            Download Image
          </button>
          <button
            type="button"
            onClick={handleClearImage}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 focus:outline-none"
          >
            Clear Image
          </button>
        </div>
      )}
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={!file}
          className="bg-[#FFA500] text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
        >
          Salvar
        </button>
      </div>
    </div>
  )
}

export default DashboardFormImage
