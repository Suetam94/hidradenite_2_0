import React from 'react'
import Footer from '@/app/ui/footer'
import { readAboutUs } from '@/app/lib/AboutUs'
import NoContent from '@/app/ui/no-content'

export default async function AboutUs (): Promise<React.JSX.Element> {
  const aboutUs = await readAboutUs()

  if (aboutUs.length === 0) {
    return <NoContent text={'Não há conteúdo para mostrar.'} />
  }

  return (
    <div className="vh-100 flex flex-column justify-between">
      <main className="h-full">
        <div className="container mx-auto p-4">
          {aboutUs.map((section) => (
            <div key={section.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <h2 className="text-2xl font-bold mb-2 text-blue-500">{section.title}</h2>
              <p className="text-gray-700 mb-4">{section.content}</p>
              {section.mediaURL != null && (
                <div className="mb-4">
                  <img src={section.mediaURL} alt={section.title} className="rounded-lg shadow-sm" />
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
