import React from 'react'
import SupportGroupCarousel from '@/app/ui/support-group/support-group-carousel'
import { readSupportGroup } from '@/app/lib/SupportGroup'

const SupportGroup = async (): Promise<React.JSX.Element> => {
  const events = await readSupportGroup()

  return (
    <div className="w-full flex justify-center items-center bg-silver py-12 px-5 lg:px-0">
      <div className="w-full max-w-7xl">
        <SupportGroupCarousel supportGroups={events} />
      </div>
    </div>
  )
}

export default SupportGroup
