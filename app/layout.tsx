import React from 'react'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import Header from '@/app/ui/header'
import type { Metadata } from 'next'
import { AuthProvider } from '@/hooks/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hidradenite Supurativa Brasil',
  description: 'Saiba mais sobre a Hidradenite Supurativa e como gerenciá-la de forma eficaz.',
  keywords: 'Hidradenite Supurativa, HS, dermatologia, condição crônica',
  openGraph: {
    title: 'Hidradenite Supurativa Brasil',
    description: 'Saiba mais sobre a Hidradenite Supurativa e como gerenciá-la de forma eficaz.',
    type: 'website',
    url: 'https://hidradenitebrasil.org/'
  }
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>): React.JSX.Element {
  return (
    <AuthProvider>
      <html lang="pt-br">
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </html>
    </AuthProvider>
  )
}
