import React from 'react'
import DashboardForm from '@/app/ui/dashboard/dashboard-form'
import DashboardFormImage from '@/app/ui/dashboard/dashboard-form-image'

const Page = (): React.JSX.Element => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-base-blue">Editando a página inicial</h2>
      <div className="grid grid-cols-1 gap-y-10">
        <DashboardFormImage />
        <DashboardForm page={'home'} contentId={'text-aside-instagram'} />
      </div>
    </div>
  )
}

export default Page
