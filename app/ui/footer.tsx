'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Browser, InstagramLogo, PaperPlaneTilt, TwitterLogo, YoutubeLogo } from '@phosphor-icons/react'

const Footer = (): React.JSX.Element => {
  return (
    <footer className="w-full min-h-80 bg-base-blue flex justify-center pb-5">
      <div
        className="w-full max-w-7xl flex flex-col lg:flex-row justify-center items-center lg:justify-between lg:items-start">
        <div className="text-white text-sm">
          <Link href="/">
            <Image
              src="/new-logo-footer.svg"
              width={294}
              height={84}
              alt="Logotipo hidradenite supurativa brasil"
            />
          </Link>
          <div className="hidden my-6 lg:my-10 lg:block">
            <p>Copyright © {new Date().getFullYear()} Hidradenite Supurativa Brasil</p>
            <p>All rights reserved</p>
          </div>
          <div className="flex justify-center items-center gap-4">
            <Link
              className="rounded-full bg-base-blue brightness-75 w-10 h-10 flex justify-center items-center duration-300 hover:brightness-125"
              href="/">
              <InstagramLogo size={20}/>
            </Link>
            <Link
              className="rounded-full bg-base-blue brightness-75 w-10 h-10 flex justify-center items-center duration-300 hover:brightness-125"
              href="/">
              <YoutubeLogo size={20}/>
            </Link>
            <Link
              className="rounded-full bg-base-blue brightness-75 w-10 h-10 flex justify-center items-center duration-300 hover:brightness-125"
              href="/">
              <TwitterLogo size={20}/>
            </Link>
            <Link
              className="rounded-full bg-base-blue brightness-75 w-10 h-10 flex justify-center items-center duration-300 hover:brightness-125"
              href="/">
              <Browser size={20}/>
            </Link>
          </div>
        </div>
        <div className="hidden lg:block capitalize mt-16">
          <h3 className="text-xl text-white font-semibold mb-6">links úteis</h3>
          <ul className="flex flex-col gap-3 text-white">
            <li className="hover:font-bold duration-300">
              <Link href="#">sobre nós</Link>
            </li>
            <li className="hover:font-bold duration-300">
              <Link href="#">santa casa de curitiba</Link>
            </li>
            <li className="hover:font-bold duration-300">
              <Link href="#">entre em contato</Link>
            </li>
            <li className="hover:font-bold duration-300">
              <Link href="#">SBD</Link>
            </li>
          </ul>
        </div>
        <div className="hidden lg:block capitalize mt-16">
          <h3 className="text-xl text-white font-semibold mb-6">Hidradenite Brasil</h3>
          <ul className="flex flex-col gap-3 text-white">
            <li className="hover:font-bold duration-300">
              <Link href="#">atualizações</Link>
            </li>
            <li className="hover:font-bold duration-300">
              <Link href="#">informações científicas</Link>
            </li>
            <li className="hover:font-bold duration-300">
              <Link href="#">perguntas frequentes</Link>
            </li>
          </ul>
        </div>
        <div className="capitalize mt-16">
          <h3 className="text-xl text-white font-semibold mb-6">nosso grupo</h3>
          <form className="flex justify-between w-64 h-10 bg-white rounded">
            <input className="outline-0 rounded pl-1.5" type="text" placeholder="Seu número de telefone aqui"/>
            <button className="pr-1.5" type="submit">
              <PaperPlaneTilt size={20}/>
            </button>
          </form>
        </div>
        <div className="lg:hidden mt-6 mb-2 text-white lg:my-10">
          <p>Copyright © {new Date().getFullYear()} Hidradenite Supurativa Brasil</p>
          <p>All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
