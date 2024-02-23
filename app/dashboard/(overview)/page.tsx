import React from 'react'
import DashboardCard from '@/app/ui/dashboard/dashboard-card'

export default async function Page (): Promise<React.JSX.Element> {
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
      <div className="grid grid-cols-2 gap-x-10">
        <DashboardCard title="Página Inicial" description="Edite o conteúdo básico da página inicial" route="home" />
        <DashboardCard title="Galeria" description="Gerencie as imagens da página de galeria" route="#" />
        <DashboardCard title="Artigos" description="Gerencie os artigos da página de informações científicas" route="#" />
        <DashboardCard title="Grupos de Apoio" description="Gerencie as datas dos grupos de apoio" route="#" />
        <DashboardCard title="Perguntas Frequentes" description="Gerencie as perguntas frequentes" route="#" />
        <DashboardCard title="Sobre Nós" description="Gerencie a página sobre nós" route="#" />
      </div>
    </main>
  )
}
