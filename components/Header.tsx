'use client'

import { useState } from 'react'
import Link from 'next/link'

interface HeaderProps {
  onCartClick: () => void
  cartItemCount: number
}

export default function Header({ onCartClick, cartItemCount }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-secondary-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gradient">
              Neomedya
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-secondary-700 hover:text-primary-600 transition-colors font-medium">
              Ana Sayfa
            </Link>
            <Link href="/erkek" className="text-secondary-700 hover:text-primary-600 transition-colors font-medium">
              Erkek
            </Link>
            <Link href="/kadin" className="text-secondary-700 hover:text-primary-600 transition-colors font-medium">
              Kadın
            </Link>
            <Link href="/cocuk" className="text-secondary-700 hover:text-primary-600 transition-colors font-medium">
              Çocuk
            </Link>
            <Link href="/ayakkabi" className="text-secondary-700 hover:text-primary-600 transition-colors font-medium">
              Ayakkabı
            </Link>
            <Link href="/aksesuar" className="text-secondary-700 hover:text-primary-600 transition-colors font-medium">
              Aksesuar
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-secondary-600 hover:text-primary-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Wishlist */}
            <button className="p-2 text-secondary-600 hover:text-primary-600 transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="p-2 text-secondary-600 hover:text-primary-600 transition-colors relative"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 text-secondary-600 hover:text-primary-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-secondary-200 py-2 z-50">
                  <Link href="/giris" className="block px-4 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    Giriş Yap
                  </Link>
                  <Link href="/kayit" className="block px-4 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    Üye Ol
                  </Link>
                  <Link href="/profilim" className="block px-4 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    Profilim
                  </Link>
                  <Link href="/siparislerim" className="block px-4 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    Siparişlerim
                  </Link>
                  <Link href="/admin" className="block px-4 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    Admin Panel
                  </Link>
                  <hr className="my-2" />
                  <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors">
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-secondary-600 hover:text-primary-600 transition-colors"
            >
              {isMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-secondary-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Ürün ara..."
                className="w-full px-4 py-3 pl-12 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-secondary-200">
            <div className="py-4 space-y-4">
              <Link href="/" className="block text-secondary-700 hover:text-primary-600 transition-colors font-medium">
                Ana Sayfa
              </Link>
              <Link href="/erkek" className="block text-secondary-700 hover:text-primary-600 transition-colors font-medium">
                Erkek
              </Link>
              <Link href="/kadin" className="block text-secondary-700 hover:text-primary-600 transition-colors font-medium">
                Kadın
              </Link>
              <Link href="/cocuk" className="block text-secondary-700 hover:text-primary-600 transition-colors font-medium">
                Çocuk
              </Link>
              <Link href="/ayakkabi" className="block text-secondary-700 hover:text-primary-600 transition-colors font-medium">
                Ayakkabı
              </Link>
              <Link href="/aksesuar" className="block text-secondary-700 hover:text-primary-600 transition-colors font-medium">
                Aksesuar
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 