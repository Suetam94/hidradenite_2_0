import React from 'react'
import Footer from '@/app/ui/footer'
import { readCommonQuestions } from '@/app/lib/CommonQuestion'
import FAQList from '@/app/ui/common-questions/common-questions-list'

export default async function CommonQuestions (): Promise<React.JSX.Element> {
  const questions = await readCommonQuestions()

  return (
    <div className="vh-100 flex flex-column justify-between">
      <main className="h-full">
        <FAQList commonQuestions={questions} />
      </main>
      <Footer />
    </div>
  )
}
