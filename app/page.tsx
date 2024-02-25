import React from 'react'
import MainBanner from '@/app/ui/home/main-banner'
import KnowHS from '@/app/ui/home/knowHS'
import Purpose from '@/app/ui/home/purpose'
import Footer from '@/app/ui/footer'

export default function Home (): React.JSX.Element {
  return (
    <>
      <main className="w-full">
        <MainBanner />
        <KnowHS />
        <Purpose />
      </main>
      <Footer />
    </>
  )
}
