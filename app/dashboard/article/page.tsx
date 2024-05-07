import React from 'react'
import CreateArticle from '@/app/ui/article/create-article'
import { listArticles } from '@/app/lib/Article'
import ShowArticle from '@/app/ui/article/show-article'

const Page = async (): Promise<React.JSX.Element> => {
  const articles = await listArticles()
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-base-blue">Editando artigos</h2>
      <CreateArticle />
      <ShowArticle articles={articles} />
    </div>
  )
}

export default Page
