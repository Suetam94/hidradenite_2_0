import React from 'react'
import NoContent from '@/app/ui/no-content'
import { type ICommonQuestionData } from '@/app/lib/CommonQuestion'

interface FAQListProps {
  commonQuestions: ICommonQuestionData[]
}

const FAQList: React.FC<FAQListProps> = ({ commonQuestions }) => {
  if (commonQuestions.length === 0) {
    return <NoContent text={'Não há perguntas para mostrar.'} />
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Perguntas Frequentes</h2>
      <div className="divide-y divide-gray-200">
        {commonQuestions.map((faq) => (
          <div key={faq.id} className="py-4">
            <h3 className="text-xl font-semibold mb-2 text-blue-500">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQList
