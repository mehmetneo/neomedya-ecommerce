import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Neomedya E-ticaret - Modern Giyim Mağazası',
  description: 'En trend ve kaliteli giyim ürünleri. Erkek, kadın ve çocuk kıyafetleri. Hızlı teslimat ve güvenli alışveriş.',
  keywords: 'giyim, moda, kıyafet, alışveriş, online mağaza, neomedya',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
          {children}
        </div>
      </body>
    </html>
  )
} 