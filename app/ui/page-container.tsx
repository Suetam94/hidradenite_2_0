import React from 'react'

const PageContainer = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  return (
    <div className="w-full flex justify-center items-center bg-silver py-12 px-5 lg:px-0">
      <div
        className="w-full max-w-7xl grid grid-cols-1 gap-y-6 lg:grid-cols-3 lg:gap-x-5 justify-items-center content-between">
        {children}
      </div>
    </div>
  )
}

export default PageContainer
