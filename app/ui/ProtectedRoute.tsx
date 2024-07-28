'use client'

import { useRouter } from 'next/router'
import React, { useEffect, type ReactNode } from 'react'
import { authConfig, loginObserver } from '@/app/lib/User'

const ProtectedRoute = ({ children }: { children: ReactNode }): React.JSX.Element => {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = loginObserver(authConfig, (user) => {
      if (user == null) {
        void router.push('/login')
      }
    })

    return () => {
      unsubscribe()
    }
  }, [router])

  return <>{children}</>
}

export default ProtectedRoute
