import React from 'react'
import CreateCommonQuestion from '@/app/ui/common-questions/create-common-question'
import { listCommonQuestion } from '@/app/lib/CommonQuestion'
import ShowCommonQuestion from '@/app/ui/common-questions/show-common-question'

const Page = async (): Promise<React.JSX.Element> => {
  const commonQuestions = await listCommonQuestion()
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-base-blue">Editando perguntas frequentes</h2>
      <CreateCommonQuestion />
      <ShowCommonQuestion commonQuestions={commonQuestions} />
    </div>
  )
}

export default Page
