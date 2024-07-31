'use client'

import React, { useCallback, useEffect, useState } from 'react'
import CreateArticle from '@/app/ui/article/create-article'
import { type IArticleData, readArticles } from '@/app/lib/Article'
import ShowArticle from '@/app/ui/article/show-article'
import ProtectedRoute from '@/app/ui/ProtectedRoute'

const Page = (): React.JSX.Element => {
  const [articles, setArticles] = useState<IArticleData[]>([])

  const fetchArticles = useCallback(async () => {
    const articles = await readArticles()
    setArticles(articles)
  }, [])

  useEffect(() => {
    void fetchArticles()
  }, [fetchArticles])

  const handleDataChanged = (): void => {
    void fetchArticles()
  }

  return (
    <ProtectedRoute>
      <h2 className="text-xl font-bold mb-4 text-base-blue">Editando artigos</h2>
      <CreateArticle onArticleCreated={handleDataChanged} />
      <ShowArticle onDataChanged={handleDataChanged} articles={articles} />
    </ProtectedRoute>
  )
}

export default Page
