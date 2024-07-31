'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { type IAboutUsData, readAboutUs } from '@/app/lib/AboutUs'
import ShowAboutUs from '@/app/ui/about-us/show-about-us'
import CreateAboutUs from '@/app/ui/about-us/create-about-us'
import ProtectedRoute from '@/app/ui/ProtectedRoute'

const Page = (): React.JSX.Element => {
  const [aboutUs, setAboutUs] = useState<IAboutUsData[]>([])

  const fetchAboutUs = useCallback(async () => {
    const aboutUs = await readAboutUs()
    setAboutUs(aboutUs)
  }, [])

  useEffect(() => {
    void fetchAboutUs()
  }, [fetchAboutUs])

  const handleDataChanged = (): void => {
    void fetchAboutUs()
  }

  return (
    <ProtectedRoute>
      <h2 className="text-xl font-bold mb-4 text-base-blue">Editando sobre nós</h2>
      <CreateAboutUs onCreate={handleDataChanged} />
      <ShowAboutUs onDataChanged={handleDataChanged} aboutUs={aboutUs} />
    </ProtectedRoute>
  )
}

export default Page
