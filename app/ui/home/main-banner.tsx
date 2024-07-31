import React from 'react'
import { getBannerImage, getGeneralColor, getTextContent } from '@/app/lib/PageConfig'
import banner from '../../../public/novoBannerPrincipal.jpg'

const standardText = {
  text: 'Você não está sozinho!',
  color: '#FFF'
}

const MainBanner = async (): Promise<React.JSX.Element> => {
  const { data: bannerData } = await getBannerImage()
  const { data: bannerTextData } = await getTextContent('main-banner-text')
  const mainBanner = bannerData?.imageUrl !== undefined ? `url(${bannerData?.imageUrl})` : `url(${banner.src})`
  const mainBannerText = bannerTextData?.textContent !== undefined ? bannerTextData?.textContent : standardText
  const { data: general } = await getGeneralColor()

  return (
    <div style={{
      backgroundImage: mainBanner
    }} className="w-full h-32 xl:h-96 bg-bottom xl:bg-center flex justify-center bg-cover px-5 xl:px-0">
      <div className="w-full max-w-7xl flex items-center justify-center xl:items-end xl:justify-start">
        <h3 style={{
          color: general?.color !== '' ? general?.color : '#FFF'
        }} className="mb-5 text-2xl lg:text-4xl xl:text-5xl font-bold">{mainBannerText?.text}</h3>
      </div>
    </div>
  )
}

export default MainBanner
