import React from 'react'
import LoginRegisterPage from '@/app/ui/login/login-register-page'

const Page = (): React.JSX.Element => {
  return (
    <div className="w-full flex justify-center items-center bg-silver px-5 lg:px-0">
      <div className="w-full h-screen">
        <LoginRegisterPage />
      </div>
    </div>
  )
}

export default Page
