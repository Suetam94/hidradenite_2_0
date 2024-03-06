import React from 'react'
import nookies from 'nookies'
import DashboardForm from '@/app/ui/dashboard/dashboard-form'
import DashboardFormImage from '@/app/ui/dashboard/dashboard-form-image'
import ColorPicker from '@/app/ui/dashboard/color-picker'

const Page = (): React.JSX.Element => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-base-blue">Editando a página inicial</h2>
      <div className="grid grid-cols-1 gap-y-10">
        <DashboardFormImage page="home" contentId="main-banner-image" formTitle="Imagem do banner da página inicial" />
        <DashboardForm formTitle="Texto ao lado do instagram" page="home" contentId="text-aside-instagram" />
        <DashboardForm formTitle="Texto do banner principal" page="home" contentId="main-banner-text" />
        <ColorPicker title="Cor do texto do banner" page="home" contentId="main-banner-text" />
      </div>
    </div>
  )
}

export default Page
