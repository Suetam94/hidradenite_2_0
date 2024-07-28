import React from 'react'
import Link from 'next/link'

const SideNav = (): React.JSX.Element => {
  return (
    <nav className="bg-gray-800 h-screen w-64 flex flex-col flex-grow">
      <ul className="p-4 flex-grow">
        <li className="mb-4">
          <Link href="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
        </li>
        <li className="mb-4">
          <Link href="/dashboard/about-us" className="text-white hover:text-gray-300">Sobre nós</Link>
        </li>
        <li className="mb-4">
          <Link href="/dashboard/article" className="text-white hover:text-gray-300">Artigos</Link>
        </li>
        <li className="mb-4">
          <Link href="/dashboard/common-questions" className="text-white hover:text-gray-300">Perguntas
            frequentes</Link>
        </li>
        <li className="mb-4">
          <Link href="/dashboard/support-group" className="text-white hover:text-gray-300">Grupos de apoio</Link>
        </li>
      </ul>
    </nav>
  )
}

export default SideNav
