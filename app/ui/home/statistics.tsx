import React from 'react'

const Statistics = (): React.JSX.Element => {
  return (
    <div className="w-full flex justify-center bg-purple text-white rounded p-5 mt-10">
      <div className="w-full max-w-7xl grid grid-cols-1 gap-y-6 lg:gap-y-0 lg:grid-cols-3">
        <div className="flex flex-col items-center justify-start">
          <span className="text-xl lg:text-base font-bold">1 em 100</span>
          <span className="text-lg lg:text-sm text-center">Pessoas pensam ter Hidradenite Supurativa</span>
        </div>
        <div className="flex flex-col items-center justify-start">
          <span className="text-xl lg:text-base font-bold">10 anos</span>
          <span className="text-lg lg:text-sm text-center">É o tempo médio até o diagnóstico correto</span>
        </div>
        <div className="flex flex-col items-center justify-start">
          <span className="text-xl lg:text-base font-bold">10%</span>
          <span className="text-lg lg:text-sm text-center">Dos pacientes com HS relatam terem perdido o emprego devido a doença</span>
        </div>
      </div>
    </div>
  )
}

export default Statistics
