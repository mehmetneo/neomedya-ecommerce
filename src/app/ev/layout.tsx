import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NEOMEDYA EV - Ev Dekorasyon ve Mobilya',
  description: 'Modern ev dekorasyon ürünleri, mobilya ve ev aksesuarları. Evinizi güzelleştiren ürünler ve dekorasyon fikirleri.',
}

export default function EvLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 