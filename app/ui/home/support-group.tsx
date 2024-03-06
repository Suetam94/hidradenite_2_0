import React from 'react'
import SupportGroupCarousel from '@/app/ui/support-group/support-group-carousel'
import { type ISupportGroupEvent } from '@/app/lib/interfaces'

const SupportGroup = (): React.JSX.Element => {
  const events: ISupportGroupEvent[] = [
    {
      eventDate: '12 de março',
      location: 'Local 1',
      eventTime: '18:00',
      image: 'url_da_imagem_1.jpg'
    },
    {
      eventDate: '12 de março',
      location: 'Local 1',
      eventTime: '18:00',
      image: 'url_da_imagem_1.jpg'
    }
  ]

  return (
    <div className="w-full flex justify-center items-center bg-silver py-12 px-5 lg:px-0">
      <div className="w-full max-w-7xl">
        <SupportGroupCarousel events={events} />
      </div>
    </div>
  )
}

export default SupportGroup
