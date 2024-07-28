import React from 'react'
import SupportGroupCard from '@/app/ui/support-group/support-group-card'
import { type ISupportGroupData } from '@/app/lib/SupportGroup'

interface IShowSupportGroup {
  supportGroups: ISupportGroupData[]
}

const ShowSupportGroup = ({ supportGroups }: IShowSupportGroup): React.JSX.Element => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {supportGroups.map(({ id, eventDate, location, eventTime, mediaURL }) => {
        return (
          <div key={`${id}_support_group`} className="p-4">
            <SupportGroupCard id={id} eventDate={eventDate} location={location} eventTime={eventTime} imageString={mediaURL} isUpdating={true} />
          </div>
        )
      })}
    </div>
  )
}

export default ShowSupportGroup
