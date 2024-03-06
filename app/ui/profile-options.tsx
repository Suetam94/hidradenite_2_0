import React from 'react'
import Link from 'next/link'

const ProfileOptions = (): React.JSX.Element => {
  return (
    <div className="lg:mt-0 gap-y-6 lg:gap-x-4 lg:gap-y-0 justify-between items-center text-sm capitalize flex flex-col-reverse lg:flex-row text-center pb-5 lg:pb-0">
      <Link className="text-lg lg:text-base text-base-blue duration-300 hover:underline" href="/login">
        entrar
      </Link>
      <Link
        className="text-lg lg:text-base w-32 h-12 lg:w-24 lg:h-10 bg-base-blue rounded flex justify-center items-center text-white duration-300 hover:brightness-125"
        href="#"
      >
        Registrar
      </Link>
    </div>
  )
}

export default ProfileOptions
