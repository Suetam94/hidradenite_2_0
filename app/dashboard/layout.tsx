import SideNav from '@/app/ui/dashboard/sidenav'
import React from 'react'

export default function Layout ({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <div className="flex flex-col md:flex-row md:h-screen">
      <div className="w-full md:w-64 bg-gray-800 flex-shrink-0">
        <SideNav />
      </div>
      <div className="flex-grow p-4 bg-gray-100 overflow-auto">
        {children}
      </div>
    </div>
  )
}
