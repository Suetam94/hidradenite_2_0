import React from 'react'
import CreateArticle from '@/app/ui/article/create-article'
import { readArticles } from '@/app/lib/Article'
import ShowArticle from '@/app/ui/article/show-article'
import ProtectedRoute from '@/app/ui/ProtectedRoute'

const Page = async (): Promise<React.JSX.Element> => {
  const articles = await readArticles()
  return (
    <ProtectedRoute>
      <h2 className="text-xl font-bold mb-4 text-base-blue">Editando artigos</h2>
      <CreateArticle />
      <ShowArticle articles={articles} />
    </ProtectedRoute>
  )
}

export default Page
