'use client'

import React from 'react'
import LoginForm from '@/app/ui/login/login-form'

const LoginRegisterPage = (): React.JSX.Element => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-800">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <LoginForm />
      </div>
    </div>
  )
}

export default LoginRegisterPage
