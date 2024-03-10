import React from 'react'
import SupportGroupCard from '@/app/ui/support-group/support-group-card'
import { type INormalizedSupportGroupEvent } from '@/app/lib/interfaces'

interface IShowSupportGroup {
  supportGroups: INormalizedSupportGroupEvent[]
}

const ShowSupportGroup = ({ supportGroups }: IShowSupportGroup): React.JSX.Element => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {supportGroups.map(({ id, eventDate, location, eventTime, image, isSvg }) => {
        return (
          <div key={`${id}_support_group`} className="p-4">
            <SupportGroupCard eventDate={eventDate} location={location} eventTime={eventTime} imageString={image} isSvg={isSvg} />
          </div>
        )
      })}
    </div>
  )
}

export default ShowSupportGroup
