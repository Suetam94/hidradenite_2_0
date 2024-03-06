import React from 'react'
import { type ISupportGroupEvent } from '@/app/lib/interfaces'

const SupportGroupCard = ({ eventTime, eventDate, location, image }: ISupportGroupEvent): React.JSX.Element => {
  return (
    <div className="rounded-lg shadow-md bg-white overflow-hidden p-10">
      <img src="./new-logo.svg" alt="Grupo de apoio" className="w-full h-40 object-fit-contain" />
      <div className="px-4 py-4">
        <h3 className="text-2xl font-semibold text-gray-800">Grupo de Apoio</h3>
      </div>
      <div className="bg-gray-100 px-4 py-2 border-t border-gray-200">
        <p className="text-base text-gray-500">{eventDate} - {eventTime}</p>
        <p className="text-base text-gray-500">{location}</p>
      </div>
    </div>
  )
}

export default SupportGroupCard
