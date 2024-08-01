import React from 'react'
import { LinkedinLogo } from '@phosphor-icons/react'

const CreatedBy = (): React.JSX.Element => {
  return (
    <div className="w-full bg-gray-800 text-white py-4 flex flex-col items-center mt-5">
      <p className="text-sm">Created by</p>
      <a
        href="https://www.linkedin.com/in/mateus-vin%C3%ADcius-da-silva-8156301a5/"
        target="_blank"
        rel="noreferrer"
        className="text-blue-400 flex items-center mt-2 hover:underline"
      >
        <LinkedinLogo size={20} className="mr-2" />
        Mateus Vinícius da Silva
      </a>
    </div>
  )
}

export default CreatedBy
