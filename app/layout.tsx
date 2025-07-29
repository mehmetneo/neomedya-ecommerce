import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Neomedya E-ticaret - Modern Giyim Mağazası',
  description: 'En trend ve kaliteli giyim ürünleri. Erkek, kadın ve çocuk kıyafetleri. Hızlı teslimat ve güvenli alışveriş.',
  keywords: 'giyim, moda, kıyafet, alışveriş, online mağaza, neomedya',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
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