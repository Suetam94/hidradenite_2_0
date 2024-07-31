'use client'

import React, { useCallback, useEffect, useState } from 'react'
import CreateCommonQuestion from '@/app/ui/common-questions/create-common-question'
import { type ICommonQuestionData, readCommonQuestions } from '@/app/lib/CommonQuestion'
import ShowCommonQuestion from '@/app/ui/common-questions/show-common-question'
import ProtectedRoute from '@/app/ui/ProtectedRoute'

const Page = (): React.JSX.Element => {
  const [commonQuestions, setCommonQuestions] = useState<ICommonQuestionData[]>([])

  const fetchCommonQuestion = useCallback(async () => {
    const commonQuestions = await readCommonQuestions()
    setCommonQuestions(commonQuestions)
  }, [])

  useEffect(() => {
    void fetchCommonQuestion()
  }, [fetchCommonQuestion])

  const handleCommonQuestionCreated = (): void => {
    void fetchCommonQuestion()
  }

  return (
    <ProtectedRoute>
      <h2 className="text-xl font-bold mb-4 text-base-blue">Editando perguntas frequentes</h2>
      <CreateCommonQuestion onCreate={handleCommonQuestionCreated} />
      <ShowCommonQuestion commonQuestions={commonQuestions} />
    </ProtectedRoute>
  )
}

export default Page
