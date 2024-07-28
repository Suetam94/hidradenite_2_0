import React from 'react'
import { getBannerImage, getTextContent } from '@/app/lib/PageConfig'

const MainBanner = async (): Promise<React.JSX.Element> => {
  const { data: bannerData } = await getBannerImage()
  const { data: bannerTextData } = await getTextContent('main-banner-text')
  const mainBanner = bannerData?.imageUrl
  const mainBannerText = bannerTextData?.textContent

  return (
    <div style={{
      backgroundImage: `url(${mainBanner})`
    }} className="w-full h-32 xl:h-96 bg-bottom xl:bg-center flex justify-center bg-cover px-5 xl:px-0">
      <div className="w-full max-w-7xl flex items-center justify-center xl:items-end xl:justify-start">
        <h3 style={{
          color: mainBannerText?.color ?? '#FFF'
        }} className="mb-5 text-2xl lg:text-4xl xl:text-5xl font-bold">{mainBannerText?.text}</h3>
      </div>
    </div>
  )
}

export default MainBanner
