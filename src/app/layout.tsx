import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GlobalMenu from '@/components/GlobalMenu'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NEOMEDYA E-Ticaret Platformları',
  description: 'Modern, hızlı ve kullanıcı dostu e-ticaret siteleri',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <GlobalMenu />
        {children}
      </body>
    </html>
  )
} 