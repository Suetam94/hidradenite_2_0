'use client'

import React from 'react'
import { SmileySad } from '@phosphor-icons/react'

interface INoContent {
  text: string
}

const NoContent = ({ text }: INoContent): React.JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-600">
      <SmileySad className="text-6xl mb-4" weight="fill" />
      <p className="text-xl">{text ?? 'Não há conteúdo disponível.'}</p>
    </div>
  )
}

export default NoContent
