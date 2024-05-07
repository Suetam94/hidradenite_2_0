import React from 'react'
import { type CommomQuestion } from '@prisma/client'
import CommonQuestionCard from '@/app/ui/common-questions/common-question-card'

interface ICommonQuestion {
  commonQuestions: CommomQuestion[]
}

const ShowCommonQuestion = ({ commonQuestions }: ICommonQuestion): React.JSX.Element => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {commonQuestions.map(({ id, question, answer }) => {
        return (
          <div key={`${id}_article`} className="p-4">
            <CommonQuestionCard id={id} answer={answer} question={question} isUpdating={true} />
          </div>
        )
      })}
    </div>
  )
}

export default ShowCommonQuestion
