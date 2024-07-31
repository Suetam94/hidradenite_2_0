import React from 'react'
import AboutUsCard from '@/app/ui/about-us/about-us-card'
import { type IAboutUsData } from '@/app/lib/AboutUs'

interface IAboutUs {
  aboutUs: IAboutUsData[]
  onDataChanged: () => void
}

const ShowAboutUs = ({ aboutUs, onDataChanged }: IAboutUs): React.JSX.Element => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {aboutUs.map(({ id, title, content, mediaURL }) => {
        return (
          <div key={`${id}_article`} className="p-4">
            <AboutUsCard id={id} title={title} content={content} imageString={mediaURL} isUpdating={true} onDataChanged={onDataChanged} />
          </div>
        )
      })}
    </div>
  )
}

export default ShowAboutUs
