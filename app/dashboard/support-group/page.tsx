'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { type ISupportGroupData, readSupportGroup } from '@/app/lib/SupportGroup'
import CreateSupportGroup from '@/app/ui/support-group/create-support-group'
import ShowSupportGroup from '@/app/ui/support-group/show-support-group'
import ProtectedRoute from '@/app/ui/ProtectedRoute'

const Page = (): React.JSX.Element => {
  const [supportGroup, setSupportGroup] = useState<ISupportGroupData[]>([])

  const fetchSupportGroup = useCallback(async () => {
    const supportGroup = await readSupportGroup()
    setSupportGroup(supportGroup)
  }, [])

  useEffect(() => {
    void fetchSupportGroup()
  }, [fetchSupportGroup])

  const handleDataChanged = (): void => {
    void fetchSupportGroup()
  }

  return (
    <ProtectedRoute>
      <h2 className="text-xl font-bold mb-4 text-base-blue">Editando grupos de apoio</h2>
      <CreateSupportGroup onSupportGroupCreated={handleDataChanged} />
      <ShowSupportGroup onDataChanged={handleDataChanged} supportGroups={supportGroup} />
    </ProtectedRoute>
  )
}

export default Page
