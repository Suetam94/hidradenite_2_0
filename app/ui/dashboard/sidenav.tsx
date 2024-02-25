import React from 'react'
import Link from 'next/link'

const SideNav = (): React.JSX.Element => {
  return (
    <nav className="bg-gray-800 h-screen w-64 flex flex-col flex-grow">
      <ul className="p-4 flex-grow">
        <li className="mb-4">
          <Link href="#" className="text-white hover:text-gray-300">Dashboard</Link>
        </li>
        <li className="mb-4">
          <Link href="#" className="text-white hover:text-gray-300">Profile</Link>
        </li>
        <li className="mb-4">
          <Link href="#" className="text-white hover:text-gray-300">Settings</Link>
        </li>
      </ul>
    </nav>
  )
}

export default SideNav
