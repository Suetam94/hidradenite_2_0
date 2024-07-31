import React from 'react'
import NoContent from '@/app/ui/no-content'
import { type IArticleData } from '@/app/lib/Article'

interface ArticleListProps {
  articles: IArticleData[]
}

const ArticlesList: React.FC<ArticleListProps> = ({ articles }) => {
  if (articles.length === 0) {
    return (
      <NoContent text={'Não há artigos para mostrar.'} />
    )
  }

  return (
    <div className="container mx-auto p-4">
      {articles.map((article) => (
        <div key={article.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <h3 className="text-2xl font-bold mb-2 text-blue-500">{article.title}</h3>
          <p className="text-gray-700 mb-4">{article.resume}</p>
          <a href={article.link} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
            Leia mais
          </a>
        </div>
      ))}
    </div>
  )
}

export default ArticlesList
