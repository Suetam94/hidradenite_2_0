import React from 'react'
import Footer from '@/app/ui/footer'
import { readArticles } from '@/app/lib/Article'
import ArticlesList from '@/app/ui/article/articles-list'

export default async function ScientificInfo (): Promise<React.JSX.Element> {
  const scientificInfo = await readArticles()

  return (
    <div className="vh-100 flex flex-column justify-between">
      <main className="h-full">
        <ArticlesList articles={scientificInfo} />
      </main>
      <Footer />
    </div>
  )
}
