'use client'

import React, { useState } from 'react'
import LoginForm from '@/app/ui/login/login-form'
import RegisterForm from '@/app/ui/login/register-form'

const LoginRegisterPage = (): React.JSX.Element => {
  const [formType, setFormType] = useState('login')

  const handleToggleForm = (type: string): void => {
    setFormType(type)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-800">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {formType === 'login'
          ? (
          <LoginForm onToggleForm={handleToggleForm} />
            )
          : (
          <RegisterForm onToggleForm={handleToggleForm} />
            )}
      </div>
    </div>
  )
}

export default LoginRegisterPage
