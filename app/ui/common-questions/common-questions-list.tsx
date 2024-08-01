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
    <div className="container mx-auto p-4 sm:p-6 md:p-8 flex-grow">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center text-blue-600">
        Perguntas Frequentes
      </h2>
      <div className="divide-y divide-gray-200">
        {commonQuestions.map((faq) => (
          <div key={faq.id} className="py-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-blue-500">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQList
