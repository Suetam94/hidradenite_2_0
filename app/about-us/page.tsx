import React from 'react'
import Footer from '@/app/ui/footer'
import { type IAboutUsData, readAboutUs } from '@/app/lib/AboutUs'
import NoContent from '@/app/ui/no-content'

export default async function AboutUs (): Promise<React.JSX.Element> {
  const aboutUs = await readAboutUs()

  const normalizedAboutUs = aboutUs.map(item => {
    const us: Partial<IAboutUsData> = { ...item }

    if ((item.mediaURL?.includes('undefined')) === true) {
      us.mediaURL = undefined
    }

    return us
  })

  if (aboutUs.length === 0) {
    return <NoContent text={'Não há conteúdo para mostrar.'} />
  }

  return (
    <div className="vh-100 flex flex-column justify-between">
      <main>
        <div className="container mx-auto flex justify-content-center items-center flex-col p-4">
          {normalizedAboutUs.map((section) => (
            <div key={section.id} className="bg-white p-4 mb-4 flex flex-col items-center justify-center">
              {section.mediaURL !== undefined && (
                <div className="mb-4 flex justify-center">
                  <img src={section.mediaURL} alt={section.title} className="rounded-lg shadow-sm" />
                </div>
              )}
              <h2 className="text-2xl font-bold mb-2 text-blue-500 text-center">{section.title}</h2>
              <p className="text-gray-700 mb-4 text-justify">{section.content}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
