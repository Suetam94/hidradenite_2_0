import React from 'react'
import ArticleCard from '@/app/ui/article/article-card'
import { type IArticleData } from '@/app/lib/Article'

interface IArticle {
  articles: IArticleData[]
  onDataChanged: () => void
}

const ShowArticle = ({ articles, onDataChanged }: IArticle): React.JSX.Element => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {articles.map(({ id, resume, title, link }) => {
        return (
          <div key={`${id}_article`} className="p-4">
            <ArticleCard id={id} link={link} title={title} resume={resume} isUpdating={true} onDataChanged={onDataChanged} />
          </div>
        )
      })}
    </div>
  )
}

export default ShowArticle
