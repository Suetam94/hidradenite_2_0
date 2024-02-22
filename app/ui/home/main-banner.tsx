import React from 'react'

const MainBanner = (): React.JSX.Element => {
  return (
    <div className="w-full h-32 xl:h-96 bg-main-banner bg-bottom xl:bg-center flex justify-center bg-cover px-5 xl:px-0">
      <div className="w-full max-w-7xl flex items-center justify-center xl:items-end xl:justify-start">
        <h3 className="text-white mb-5 text-2xl lg:text-4xl xl:text-5xl font-bold">Você não está sozinho!</h3>
      </div>
    </div>
  )
}

export default MainBanner
