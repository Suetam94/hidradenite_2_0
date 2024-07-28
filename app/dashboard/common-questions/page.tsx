import React from 'react'
import CreateCommonQuestion from '@/app/ui/common-questions/create-common-question'
import { readCommonQuestions } from '@/app/lib/CommonQuestion'
import ShowCommonQuestion from '@/app/ui/common-questions/show-common-question'
import ProtectedRoute from '@/app/ui/ProtectedRoute'

const Page = async (): Promise<React.JSX.Element> => {
  const commonQuestions = await readCommonQuestions()
  return (
    <ProtectedRoute>
      <h2 className="text-xl font-bold mb-4 text-base-blue">Editando perguntas frequentes</h2>
      <CreateCommonQuestion />
      <ShowCommonQuestion commonQuestions={commonQuestions} />
    </ProtectedRoute>
  )
}

export default Page
