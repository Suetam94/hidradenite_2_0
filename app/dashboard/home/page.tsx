import React from 'react'
import DashboardForm from '@/app/ui/dashboard/dashboard-form'
import DashboardFormImage from '@/app/ui/dashboard/dashboard-form-image'
import ColorPicker from '@/app/ui/dashboard/color-picker'
import ProtectedRoute from '@/app/ui/ProtectedRoute'

const Page = (): React.JSX.Element => {
  return (
    <ProtectedRoute>
      <h2 className="text-xl font-bold mb-4 text-base-blue">Editando a página inicial</h2>
      <div className="grid grid-cols-1 gap-y-10">
        <DashboardFormImage formTitle="Imagem do banner da página inicial" />
        <DashboardForm formTitle="Texto ao lado do instagram" contentId="text-aside-instagram" />
        <DashboardForm formTitle="Texto do banner principal" contentId="main-banner-text" />
        <ColorPicker title="Cor do texto do banner" />
      </div>
    </ProtectedRoute>
  )
}

export default Page
