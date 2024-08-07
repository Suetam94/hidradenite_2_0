import React from 'react'
import Instagram from '@/app/ui/social/instagram'
import Statistics from '@/app/ui/home/statistics'
import { getTextContent } from '@/app/lib/PageConfig'

const KnowHs = async (): Promise<React.JSX.Element> => {
  const { data } = await getTextContent('text-aside-instagram')

  return (
    <section className="w-full flex justify-center items-center bg-silver px-5 xl:px-0">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-y-4 lg:gap-x-6 py-10">
        <div>
          <Instagram />
        </div>
        <div className="self-center">
          <div className="grid grid-cols-1 gap-y-16">
            <h2 className="uppercase text-3xl text-title-gray font-bold text-center mb-5">
              conheça mais sobre a hidradenite supurativa
            </h2>
            {(data !== undefined) && <p className="text-justify text-lg text-subtitle-gray">
              {data.textContent?.text}
            </p>}
            <Statistics />
          </div>
        </div>
      </div>
    </section>
  )
}

export default KnowHs
