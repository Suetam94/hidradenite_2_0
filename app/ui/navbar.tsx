'use client'

import React from 'react'
import Link from 'next/link'
import { X } from '@phosphor-icons/react'

const Navbar = ({ onLinkClicked, isMobile }: { onLinkClicked?: () => void, isMobile?: boolean }): React.JSX.Element => {
  return (
    <nav>
      <ul className="flex flex-col gap-y-6 lg:flex-row lg:gap-4 text-stone-700 text-center lg:m-0">
        <li onClick={onLinkClicked} className="duration-300 hover:font-semibold hover:text-purple">
          <Link
            className="no-underline duration-300 hover:font-semibold hover:text-purple font-semibold lg:font-normal text-lg text-stone-700"
            href="/hidradenitis"
          >
            O Que é a Hidradenite?
          </Link>
        </li>
        <li onClick={onLinkClicked} className="duration-300 hover:font-semibold hover:text-purple">
          <Link
            className="no-underline capitalize duration-300 hover:font-semibold hover:text-purple font-semibold lg:font-normal text-lg text-stone-700"
            href="/scientific-info"
          >
            informações científicas
          </Link>
        </li>
        <li onClick={onLinkClicked} className="duration-300 hover:font-semibold hover:text-purple">
          <Link
            className="no-underline capitalize duration-300 hover:font-semibold hover:text-purple font-semibold lg:font-normal text-lg text-stone-700"
            href="/common-questions"
          >
            perguntas frequentes
          </Link>
        </li>
        <li onClick={onLinkClicked} className="duration-300 hover:font-semibold hover:text-purple">
          <Link
            className="no-underline capitalize duration-300 hover:font-semibold hover:text-purple font-semibold lg:font-normal text-lg text-stone-700"
            href="/about-us"
          >
            sobre nós
          </Link>
        </li>
        {isMobile === true && (
          <li
            onClick={onLinkClicked}
            className="mt-4 cursor-pointer text-lg text-stone-700 hover:text-stone-900 flex items-center justify-center"
          >
            <X size={24} className="mr-2" />
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
