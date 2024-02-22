import React from 'react'
import Image from 'next/image'

const Purpose = (): React.JSX.Element => {
  return (
    <div className="w-full flex justify-center items-center bg-silver py-12 px-5 lg:px-0">
      <div className="w-full max-w-7xl grid grid-cols-1 gap-y-6 lg:grid-cols-3 lg:gap-x-5 justify-items-center content-between">
        <div className="flex flex-col items-center justify-between">
          <Image style={{
            height: '244px'
          }} src="/patientSupport.svg" width={250} height={244} alt="Imagem de um grupo de pessoas" />
          <h4 className="text-lg font-semibold text-purple">Grupos de Apoio</h4>
          <p className="text-center text-base">
            Nossos grupos de apoio aliviam um pouco o isolamento e a carga emocional que acompanham uma vida com
            Hidradenite Supurativa.
          </p>
        </div>
        <div className="flex flex-col items-center justify-between">
          <Image style={{
            height: '244px'
          }} src="/questions.svg" width={250} height={244} alt="Imagem de um ponto de interrogação" />
          <h4 className="text-lg font-semibold text-purple">Dúvidas</h4>
          <p className="text-center text-base">Esclarecer as dúvidas muitas vezes é a parte principal do tratamento.</p>
        </div>
        <div className="flex flex-col items-center justify-between">
          <Image style={{
            height: '244px'
          }} src="/knowledge.svg" width={250} height={244} alt="Imagem de livros" />
          <h4 className="text-lg font-semibold text-purple">Conhecimento</h4>
          <p className="text-center text-base">
            Aumentar a conscientização sobre a Hidradenite Supurativa é vital para promover a compaixão, a compreensão e
            um diagnóstico correto e oportuno.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Purpose
