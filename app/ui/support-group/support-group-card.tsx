'use client'

import React, { useState } from 'react'
import { type ISupportGroupEvent } from '@/app/lib/interfaces'
import SupportGroupModal from '@/app/ui/support-group/support-group-modal'

const SupportGroupCard = ({
  id,
  eventTime,
  eventDate,
  location,
  imageString,
  isSvg,
  isUpdating = false
}: ISupportGroupEvent): React.JSX.Element => {
  const [modalResponse, setModalResponse] = useState<boolean>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  let dataUrl = null

  if (isSvg === true) {
    dataUrl = `data:image/svg+xml;base64, ${imageString}`
  } else {
    dataUrl = `data:image/png;base64, ${imageString}`
  }

  return (
    <div className="rounded-lg shadow-md bg-white overflow-hidden p-10">
      <img src={dataUrl} alt="Grupo de apoio" className="w-full h-40 object-fit-contain" />
      <div className="px-4 py-4">
        <h3 className="text-2xl font-semibold text-gray-800">Grupo de Apoio</h3>
      </div>
      <div className="bg-gray-100 px-4 py-2 border-t border-gray-200">
        <p className="text-base text-gray-500">
          {eventDate} - {eventTime}
        </p>
        <p className="text-base text-gray-500">{location}</p>
      </div>
      {isUpdating && (
        <div className="flex justify-around items-center mt-4">
          <button onClick={() => { setIsModalOpen(true) }} className="bg-cyan-400 flex justify-center hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
            Editar
          </button>
          <button className="bg-red-500 flex justify-center hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
            Excluir
          </button>
        </div>
      )}
      {isModalOpen && (
        <SupportGroupModal
          supportGroup={{ id, eventDate, location, eventTime }}
          modalResponse={setModalResponse}
          closeModal={setIsModalOpen}
          isUpdating={isUpdating}
        />
      )}
    </div>
  )
}

export default SupportGroupCard
