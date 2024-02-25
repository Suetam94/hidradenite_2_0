'use client'

import React, { useEffect, useState } from 'react'
import { SketchPicker, type ColorResult } from 'react-color'
import { type IColorPicker, type IPageContentText } from '@/app/lib/interfaces'
import { getPageContentByPageTitle, pageContent } from '@/app/lib/PageContent'
import FeedbackModal from '@/app/ui/feedback-modal'
import Spinner from '@/app/ui/Spinner'

const ColorPicker = ({
  title,
  page,
  contentId
}: IColorPicker): React.JSX.Element => {
  const [initialColor, setInitialColor] = useState('#FFF')
  const [color, setColor] = useState(initialColor)
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSending, setIsSending] = useState<boolean>(false)

  const getColorPageContent = async () => {
    try {
      if (page && contentId) {
        const pageDbContent = await getPageContentByPageTitle(page, contentId)
        if (pageDbContent !== null) {
          const {
            color
          } = pageDbContent
          if (color !== null) {
            setInitialColor(color)
            setColor(color)
          }
        }
      }
    } catch (error) {
      console.error('Erro ao obter conteúdo da página:', error)
    }
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      await getColorPageContent()
      setIsLoading(false)
    })()
  }, [])

  const handleClick = (): void => {
    setDisplayColorPicker(!displayColorPicker)
  }

  const handleClose = (): void => {
    setDisplayColorPicker(false)
  }

  const handleChange = (newColor: ColorResult): void => {
    const { hex } = newColor
    setColor(hex)
  }

  const handleResetInitialColor = (): void => {
    setColor(initialColor)
  }

  const handleSaveColor = async () => {
    const updateColor: IPageContentText = {
      page,
      contentId,
      color
    }

    try {
      setIsSending(true)
      await pageContent(updateColor, 'text')
      setIsSending(false)
      setIsOpen(true)
      console.log('Color saved successfully.')
    } catch (error) {
      console.error('Failed to save color:', error)
    }
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <div className="flex items-center gap-5">
        {
          isLoading
            ? <div className="w-40 flex justify-center items-center h-16 border border-gray-300 rounded-md"><Spinner /></div>
            : <div
              className="w-40 h-16 border border-gray-300 rounded-md hover:bg-gray-200 cursor-pointer"
              style={{ backgroundColor: color }}
              onClick={handleClick}
            />
        }
        {displayColorPicker
          ? (
            <div className="bg-white">
              <button
                type="button"
                className="bg-gray-500 text-white my-2 px-4 py-2 mr-2 rounded hover:hover:bg-gray-400 focus:outline-none"
                onClick={handleClose}
              >
                Fechar
              </button>
              <SketchPicker styles={{
                default: {
                  picker: {
                    width: '400px',
                    height: '300px'
                  }
                }
              }} color={color} onChange={handleChange} />
            </div>
            )
          : <div className="flex items-center gap-2">
            <button
              type="button"
              className="bg-gray-500 min-w-20 text-center text-white my-10 px-4 py-2 mr-2 rounded hover:hover:bg-gray-400 focus:outline-none"
              onClick={handleResetInitialColor}
            >
              {
                isSending ? <Spinner /> : 'Resetar cor'
              }
            </button>
            <button onClick={handleSaveColor} type="submit"
                    className="bg-[#FFA500] min-w-20 text-center text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none">
              {
                isSending ? <Spinner /> : 'Salvar'
              }
            </button>
          </div>
        }
      </div>
      <FeedbackModal isOpen={isOpen} onClose={setIsOpen} title="A cor foi salva com sucesso!" />
    </div>
  )
}

export default ColorPicker
