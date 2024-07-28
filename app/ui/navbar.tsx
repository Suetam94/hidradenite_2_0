import React from 'react'
import Link from 'next/link'

const Navbar = (): React.JSX.Element => {
  return (
    <nav>
      <ul className="flex flex-col gap-y-6 lg:flex-row lg:gap-4 capitalize text-stone-700 text-center lg:m-0">
        <li className="duration-300 hover:font-semibold hover:text-purple">
          <Link className="no-underline capitalize duration-300 hover:font-semibold hover:text-purple font-semibold lg:font-normal text-lg text-stone-700" href="/scientific-info">informações científicas</Link>
        </li>
        <li className="duration-300 hover:font-semibold hover:text-purple">
          <Link className="no-underline capitalize duration-300 hover:font-semibold hover:text-purple font-semibold lg:font-normal text-lg text-stone-700" href="/common-questions">perguntas frequentes</Link>
        </li>
        <li className="duration-300 hover:font-semibold hover:text-purple">
          <Link className="no-underline capitalize duration-300 hover:font-semibold hover:text-purple font-semibold lg:font-normal text-lg text-stone-700" href="/about-us">sobre nós</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
