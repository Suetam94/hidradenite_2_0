import React from 'react'
import { type INormalizedAboutUs } from '@/app/lib/interfaces'
import AboutUsCard from '@/app/ui/about-us/about-us-card'

interface IAboutUs {
  aboutUs: INormalizedAboutUs[]
}

const ShowAboutUs = ({ aboutUs }: IAboutUs): React.JSX.Element => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {aboutUs.map(({ id, title, content, media, isSvg }) => {
        return (
          <div key={`${id}_article`} className="p-4">
            <AboutUsCard id={id} title={title} content={content} isSvg={isSvg} imageString={media} isUpdating={true} />
          </div>
        )
      })}
    </div>
  )
}

export default ShowAboutUs
