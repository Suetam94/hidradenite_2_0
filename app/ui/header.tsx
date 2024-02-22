import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/app/ui/navbar'
import ProfileOptions from '@/app/ui/profile-options'
import MenuMobile from '@/app/ui/menu-mobile'

const Header = (): React.JSX.Element => {
  return (
    <header className="w-full h-20 bg-silver flex justify-center px-0.5 lg:px-5 xl:px-0">
      <div className="w-full relative max-w-full lg:max-w-7xl flex flex-row justify-between items-center text-base">
        <Link href="/">
          <Image src="/new-logo.svg" width={210} height={60} alt="Logotipo hidradenite supurativa brasil" />
        </Link>
        <div className="hidden lg:block">
          <Navbar />
        </div>
        <div className="hidden lg:flex justify-center items-center">
          <ProfileOptions />
        </div>
        <MenuMobile />
      </div>
    </header>
  )
}

export default Header
