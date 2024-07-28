'use client'

import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import GroupSupportCard from './support-group-card'

export interface INormalizedSupportGroupEvent {
  id: string
  eventDate: string
  location: string
  eventTime: string
  mediaURL: string
}

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
          <GroupSupportCard imageString={event.mediaURL} eventTime={event.eventTime} eventDate={event.eventDate} location={event.location} id={event.id} isUpdating={false} />
        </div>
      ))}
    </Carousel>
  )
}

export default GroupSupportCarousel
