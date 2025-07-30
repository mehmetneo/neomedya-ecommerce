'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const GlobalMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })

  useEffect(() => {
    try {
      const user = localStorage.getItem('user')
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
      
      setIsLoggedIn(!!user)
      setCartCount(cart.length)
      setWishlistCount(wishlist.length)
    } catch (error) {
      console.log('localStorage okuma hatası:', error)
    }
  }, [])

  const handleLogin = () => {
    setShowLoginModal(true)
    setIsMenuOpen(false)
  }

  const handleRegister = () => {
    setShowRegisterModal(true)
    setIsMenuOpen(false)
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginForm.email === 'demo@neomedy.com' && loginForm.password === 'demo123') {
      localStorage.setItem('user', JSON.stringify({ name: 'Demo User', email: loginForm.email }))
      setIsLoggedIn(true)
      setShowLoginModal(false)
      setLoginForm({ email: '', password: '' })
      alert('Giriş başarılı!')
    } else {
      alert('Hatalı email veya şifre!')
    }
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Şifreler eşleşmiyor!')
      return
    }
    localStorage.setItem('user', JSON.stringify({ name: registerForm.name, email: registerForm.email }))
    setIsLoggedIn(true)
    setShowRegisterModal(false)
    setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' })
    alert('Kayıt başarılı!')
  }

  const handleLogout = () => {
    try {
      localStorage.removeItem('user')
    } catch (error) {
      console.log('localStorage silme hatası:', error)
    }
    setIsLoggedIn(false)
    setIsUserMenuOpen(false)
    alert('Çıkış yapıldı!')
  }

  return (
    <>
      {/* Modern Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-lg sm:text-xl font-bold">N</span>
              </div>
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NEOMEDYA
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/ev" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                🏠 EV
              </Link>
              <Link href="/tech" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                💻 TECH
              </Link>
              <Link href="/giyim" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                👕 GİYİM
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search - Hidden on mobile */}
              <button className="hidden sm:block p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                🔍
              </button>

              {/* Cart */}
              <Link href="/sepet" className="relative p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                🛒
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Wishlist */}
              <Link href="/favorilerim" className="relative p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                ❤️
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* User Menu - Desktop */}
              {isLoggedIn ? (
                <div className="hidden sm:block relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">U</span>
                    </div>
                    <span className="font-medium">Kullanıcı</span>
                    <span className="text-gray-400">▼</span>
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200/50 backdrop-blur-md">
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">U</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Demo User</p>
                            <p className="text-sm text-gray-500">demo@neomedy.com</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-2">
                        <Link href="/profil" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                          👤 Profil
                        </Link>
                        <Link href="/siparislerim" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                          📦 Siparişlerim
                        </Link>
                        <Link href="/favorilerim" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                          ❤️ Favorilerim
                        </Link>
                        <Link href="/ayarlar" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                          ⚙️ Ayarlar
                        </Link>
                        <hr className="my-2" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          🚪 Çıkış Yap
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-2">
                  <button
                    onClick={handleLogin}
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                  >
                    Giriş Yap
                  </button>
                  <button
                    onClick={handleRegister}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
                  >
                    Kayıt Ol
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                  <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="bg-white/95 backdrop-blur-md border-t border-gray-200/50 py-4">
              <div className="px-4 space-y-4">
                {/* Platform Links */}
                <div className="space-y-3">
                  <Link 
                    href="/ev" 
                    className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🏠 NEOMEDYA EV
                  </Link>
                  <Link 
                    href="/tech" 
                    className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    💻 NEOMEDYA TECH
                  </Link>
                  <Link 
                    href="/giyim" 
                    className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    👕 NEOMEDYA GİYİM
                  </Link>
                </div>

                <hr className="border-gray-200" />

                {/* User Actions */}
                {isLoggedIn ? (
                  <div className="space-y-3">
                    <Link 
                      href="/profil" 
                      className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      👤 Profil
                    </Link>
                    <Link 
                      href="/siparislerim" 
                      className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      📦 Siparişlerim
                    </Link>
                    <Link 
                      href="/favorilerim" 
                      className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      ❤️ Favorilerim
                    </Link>
                    <Link 
                      href="/ayarlar" 
                      className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      ⚙️ Ayarlar
                    </Link>
                    <hr className="border-gray-200" />
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="w-full text-left text-red-600 hover:text-red-700 font-medium transition-colors duration-200 py-2"
                    >
                      🚪 Çıkış Yap
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleLogin}
                      className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Giriş Yap
                    </button>
                    <button
                      onClick={handleRegister}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                    >
                      Kayıt Ol
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Giriş Yap</h2>
              <p className="text-gray-600">Hesabınıza giriş yapın</p>
            </div>
            
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="demo@neomedy.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="demo123"
                  required
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 px-4 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
                >
                  Giriş Yap
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Kayıt Ol</h2>
              <p className="text-gray-600">Yeni hesap oluşturun</p>
            </div>
            
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                <input
                  type="text"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Ad Soyad"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="email@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Şifre"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Şifre Tekrar</label>
                <input
                  type="password"
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Şifre Tekrar"
                  required
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="flex-1 px-4 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
                >
                  Kayıt Ol
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default GlobalMenu 