'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, type ReactNode } from 'react'
import { useAuth } from '@/hooks/AuthContext'

const ProtectedRoute = ({ children }: { children: ReactNode }): React.JSX.Element => {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (user == null)) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}

export default ProtectedRoute
