import React from 'react'
import { listSupportGroupEvent } from '@/app/lib/SupportGroup'
import CreateSupportGroup from '@/app/ui/support-group/create-support-group'
import ShowSupportGroup from '@/app/ui/support-group/show-support-group'

const Page = async (): Promise<React.JSX.Element> => {
  const supportGroups = await listSupportGroupEvent()

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-base-blue">Editando grupos de apoio</h2>
      <CreateSupportGroup />
      <ShowSupportGroup supportGroups={supportGroups} />
    </div>
  )
}

export default Page
