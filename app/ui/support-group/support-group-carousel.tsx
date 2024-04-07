'use client'

import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import GroupSupportCard from './support-group-card'
import { type INormalizedSupportGroupEvent } from '@/app/lib/interfaces'

interface IShowSupportGroup {
  supportGroups: INormalizedSupportGroupEvent[]
}

const GroupSupportCarousel = ({ supportGroups }: IShowSupportGroup): React.JSX.Element => {
  return (
    <Carousel
      showArrows={true}
      showStatus={false}
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000}
      renderIndicator={(onClickHandler, isSelected, index, label) => {
        if (isSelected) {
          return (
            <li
              key={index}
              onClick={onClickHandler}
              style={{ background: '#000', width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block', margin: '0 4px' }}
              title={label}
              aria-label={`Slide ${index + 1}`}
            />
          )
        }
        return (
          <li
            key={index}
            onClick={onClickHandler}
            style={{ background: '#ccc', width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block', margin: '0 4px' }}
            title={label}
            aria-label={`Slide ${index + 1}`}
          />
        )
      }}
    >
      {supportGroups.map((event, index) => (
        <div key={index}>
          <GroupSupportCard imageString={event.image} eventTime={event.eventTime} eventDate={event.eventDate} location={event.location} isSvg={event.isSvg} />
        </div>
      ))}
    </Carousel>
  )
}

export default GroupSupportCarousel
