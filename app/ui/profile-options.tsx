'use client'

import React from 'react'
import Link from 'next/link'
import { Gear } from '@phosphor-icons/react'

const ProfileOptions = (): React.JSX.Element => {
  return (
    <div className="lg:mt-0 gap-y-6 lg:gap-x-4 lg:gap-y-0 justify-between items-center text-sm capitalize flex flex-col-reverse lg:flex-row text-center lg:pb-0">
      <Link className="text-lg lg:text-base text-blue-950 duration-300 hover:underline" href="/login">
        <Gear size={24} />
      </Link>
    </div>
  )
}

export default ProfileOptions
