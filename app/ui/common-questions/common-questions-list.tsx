import React from 'react'
import NoContent from '@/app/ui/no-content'
import { type ICommonQuestionData } from '@/app/lib/CommonQuestion'

interface FAQListProps {
  commonQuestions: ICommonQuestionData[]
}

const FAQList: React.FC<FAQListProps> = ({ commonQuestions }) => {
  if (commonQuestions.length === 0) {
    return (
      <NoContent text={'Não há perguntas para mostrar.'} />
    )
  }

  return (
    <div className="container mx-auto p-4">
      {commonQuestions.map((faq) => (
        <div key={faq.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <h2 className="text-xl font-bold mb-2 text-blue-500">{faq.question}</h2>
          <p className="text-gray-700 mb-4">{faq.answer}</p>
        </div>
      ))}
    </div>
  )
}

export default FAQList
