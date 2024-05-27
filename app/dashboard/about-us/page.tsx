import React from 'react'
import { listAboutUs } from '@/app/lib/AboutUs'
import ShowAboutUs from '@/app/ui/about-us/show-about-us'
import CreateAboutUs from '@/app/ui/about-us/create-about-us'

const Page = async (): Promise<React.JSX.Element> => {
  const aboutUs = await listAboutUs()
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-base-blue">Editando sobre nós</h2>
      <CreateAboutUs />
      <ShowAboutUs aboutUs={aboutUs} />
    </div>
  )
}

export default Page
