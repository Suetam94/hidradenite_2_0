import React from 'react'
import Footer from '@/app/ui/footer'

export default async function Hidradenitis (): Promise<React.JSX.Element> {
  return (
    <div className="vh-100 flex flex-col justify-between bg-gray-100">
      <main className="h-full">
        <div className="container mx-auto p-4">
          <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 className="text-2xl font-bold mb-2 text-blue-500">O que é a HS?</h3>
            <p className="text-gray-700 mb-4">
              A Hidradenite Supurativa (HS) é um doença crônica inflamatória, que costuma apresentar nódulos, abscessos,
              fístulas e cicatrizes especialmente nas regiões de dobras, mas pode acometer qualquer região que tenha pelos.
              O diagnóstico e acompanhamento com seu Dermatologista podem ajudar a enfrentar cada passo diante da HS.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 className="text-2xl font-bold mb-2 text-blue-500">Diagnóstico</h3>
            <p className="text-gray-700 mb-4">
              O Diagnóstico é clínico, ou seja, a avaliação e o exame físico feitos por seu médico Dermatologista fornecem o
              diagnóstico correto da doença. Exames de imagem como Ultrassom e Ressonância Magnética podem ajudar a
              classificar a HS.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 className="text-2xl font-bold mb-2 text-blue-500">Orientações</h3>
            <p className="text-gray-700 mb-4">
              O diagnóstico e acompanhamento precoces podem evitar a progressão da doença e melhorar a sua qualidade de vida.
              Consulte com seu médico Dermatologista para saber mais.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
