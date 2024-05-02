import React from 'react'
import CreateArticle from '@/app/ui/article/create-article'

const Page = async (): Promise<React.JSX.Element> => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-base-blue">Editando artigos</h2>
      <CreateArticle />
    </div>
  )
}

export default Page
