'use client'

import React, { useState } from 'react'
import { SketchPicker, type ColorResult } from 'react-color'
import { type IColorPicker } from '@/app/lib/interfaces'

const ColorPicker = ({ title }: IColorPicker): React.JSX.Element => {
  const [color, setColor] = useState('#000000')
  const [displayColorPicker, setDisplayColorPicker] = useState(false)

  const handleClick = (): void => {
    setDisplayColorPicker(!displayColorPicker)
  }

  const handleClose = (): void => {
    setDisplayColorPicker(false)
  }

  const handleChange = (newColor: ColorResult): void => {
    const { hex } = newColor
    setColor(hex as string)
  }

  return (
    <div>
      <h3 className="block text-lg font-medium mb-2">{title}</h3>
      <div
        style={{
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: color
        }}
        onClick={handleClick}
      />
      {displayColorPicker && (
        <div
          style={{
            position: 'absolute',
            zIndex: 2
          }}
        >
          <div
            style={{
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px'
            }}
            onClick={handleClose}
          />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      )}
    </div>
  )
}

export default ColorPicker
