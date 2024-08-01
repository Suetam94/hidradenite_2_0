'use client'

import React, { useState } from 'react'
import { PaperPlaneTilt } from '@phosphor-icons/react'

const OurGroup = (): React.JSX.Element => {
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const message = `Olá, gostaria de estar entrando no grupo da hidradenite, meu número é ${phoneNumber}`
    const whatsappUrl = `https://wa.me/5549988408008?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="capitalize mt-16 flex flex-col items-center bg-base-blue py-8 px-4 rounded-lg">
      <h3 className="text-xl sm:text-2xl md:text-3xl text-white font-semibold mb-6">Nosso Grupo</h3>
      <form className="flex w-full max-w-md bg-white rounded-lg overflow-hidden" onSubmit={handleSubmit}>
        <input
          className="outline-0 pl-4 flex-grow text-gray-700"
          type="text"
          placeholder="Seu número de telefone"
          value={phoneNumber}
          onChange={(e) => { setPhoneNumber(e.target.value) }}
        />
        <button className="bg-blue-500 text-white p-3 flex items-center justify-center hover:bg-blue-600 transition-colors duration-300" type="submit">
          <PaperPlaneTilt size={20} />
        </button>
      </form>
    </div>
  )
}

export default OurGroup
