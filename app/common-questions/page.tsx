import React from 'react'
import Footer from '@/app/ui/footer'
import { readCommonQuestions } from '@/app/lib/CommonQuestion'
import FAQList from '@/app/ui/common-questions/common-questions-list'

export default async function CommonQuestions(): Promise<React.JSX.Element> {
  const questions = await readCommonQuestions()

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <main className="flex-grow">
        <FAQList commonQuestions={questions} />
      </main>
      <Footer />
    </div>
  )
}
