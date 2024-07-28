import React from 'react'
import { readAboutUs } from '@/app/lib/AboutUs'
import ShowAboutUs from '@/app/ui/about-us/show-about-us'
import CreateAboutUs from '@/app/ui/about-us/create-about-us'
import ProtectedRoute from '@/app/ui/ProtectedRoute'

const Page = async (): Promise<React.JSX.Element> => {
  const aboutUs = await readAboutUs()
  return (
    <ProtectedRoute>
      <h2 className="text-xl font-bold mb-4 text-base-blue">Editando sobre nós</h2>
      <CreateAboutUs />
      <ShowAboutUs aboutUs={aboutUs} />
    </ProtectedRoute>
  )
}

export default Page
