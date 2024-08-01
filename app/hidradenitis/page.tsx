import React from 'react'
import Footer from '@/app/ui/footer'

export default async function Hidradenitis (): Promise<React.JSX.Element> {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <main className="flex-grow">
        <div className="container mx-auto p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center text-blue-600">
            O Que é a Hidradenite?
          </h1>
          <section className="mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-blue-500">O que é a HS?</h3>
            <p className="text-gray-700">
              A Hidradenite Supurativa (HS) é uma doença crônica inflamatória, que costuma apresentar nódulos,
              abscessos, fístulas e cicatrizes especialmente nas regiões de dobras, mas pode acometer qualquer região
              que tenha pelos. O diagnóstico e acompanhamento com seu Dermatologista podem ajudar a enfrentar cada passo
              diante da HS.
            </p>
          </section>
          <section className="mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-blue-500">Diagnóstico</h3>
            <p className="text-gray-700">
              O Diagnóstico é clínico, ou seja, a avaliação e o exame físico feitos por seu médico Dermatologista
              fornecem o diagnóstico correto da doença. Exames de imagem como Ultrassom e Ressonância Magnética podem
              ajudar a classificar a HS.
            </p>
          </section>
          <section className="mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-blue-500">Orientações</h3>
            <p className="text-gray-700">
              O diagnóstico e acompanhamento precoces podem evitar a progressão da doença e melhorar a sua qualidade de
              vida. Consulte com seu médico Dermatologista para saber mais.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
