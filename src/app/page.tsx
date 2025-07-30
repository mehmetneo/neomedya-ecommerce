'use client'

import React from 'react'
import Link from 'next/link'

const HomePage = () => {
  const scrollToPlatforms = () => {
    const element = document.getElementById('platform-showcase')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const openWhatsApp = () => {
    const phoneNumber = '905012429791'
    const message = 'Merhaba! NEOMEDYA e-ticaret platformları hakkında bilgi almak istiyorum.'
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20 sm:pt-16">
      {/* Hero Section - Showcase Focus */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 mb-6 sm:mb-8">
              <span className="text-yellow-400">⭐</span>
              <span className="text-xs sm:text-sm font-medium">Modern E-Ticaret Platformları</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                NEOMEDYA
              </span>
              <br />
              E-Ticaret Çözümleri
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Modern, hızlı ve kullanıcı dostu e-ticaret platformları. 
              Her sektör için özel olarak tasarlanmış çözümler.
            </p>
            
            <div className="flex justify-center mb-8 sm:mb-12">
              <button 
                onClick={scrollToPlatforms}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                🚀 Platformları İncele
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">⚡</div>
                <h3 className="font-bold text-base sm:text-lg mb-2">Hızlı Performans</h3>
                <p className="text-blue-100 text-xs sm:text-sm">Optimize edilmiş altyapı</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">📱</div>
                <h3 className="font-bold text-base sm:text-lg mb-2">Mobil Uyumlu</h3>
                <p className="text-blue-100 text-xs sm:text-sm">Tüm cihazlarda mükemmel deneyim</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🎨</div>
                <h3 className="font-bold text-base sm:text-lg mb-2">Modern Tasarım</h3>
                <p className="text-blue-100 text-xs sm:text-sm">Çağdaş kullanıcı arayüzü</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Platform Özellikleri</h2>
            <p className="text-base sm:text-lg text-gray-600">Modern e-ticaret deneyimi için gerekli tüm özellikler</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">3</div>
              <div className="text-sm sm:text-base text-gray-600">Farklı Platform</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-sm sm:text-base text-gray-600">Özellik</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-sm sm:text-base text-gray-600">Responsive</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-sm sm:text-base text-gray-600">Destek</div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Showcase */}
      <section id="platform-showcase" className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Sektöre Özel Çözümler</h2>
            <p className="text-base sm:text-lg text-gray-600">Her sektör için özel olarak tasarlanmış e-ticaret platformları</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* EV Platform */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl sm:text-3xl">🏠</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">NEOMEDYA EV</h3>
                  <p className="text-sm sm:text-base text-gray-600">Ev & Yaşam Ürünleri</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <span className="text-green-500 mr-2">✓</span>
                    Mobilya & Dekorasyon
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-green-500 mr-2">✓</span>
                    Aydınlatma Sistemleri
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-green-500 mr-2">✓</span>
                    Bahçe & Dış Mekan
                  </div>
                </div>
                
                <Link 
                  href="/ev" 
                  className="block w-full bg-gradient-to-r from-green-600 to-blue-600 text-white text-center py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300"
                >
                  Platformu İncele →
                </Link>
              </div>
            </div>

            {/* TECH Platform */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl sm:text-3xl">💻</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">NEOMEDYA TECH</h3>
                  <p className="text-sm sm:text-base text-gray-600">Teknoloji & Elektronik</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <span className="text-blue-500 mr-2">✓</span>
                    Telefon & Tablet
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-blue-500 mr-2">✓</span>
                    Bilgisayar & Laptop
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-blue-500 mr-2">✓</span>
                    Aksesuar & Gaming
                  </div>
                </div>
                
                <Link 
                  href="/tech" 
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Platformu İncele →
                </Link>
              </div>
            </div>

            {/* GİYİM Platform */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl sm:text-3xl">👕</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">NEOMEDYA GİYİM</h3>
                  <p className="text-sm sm:text-base text-gray-600">Moda & Stil</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <span className="text-purple-500 mr-2">✓</span>
                    Erkek & Kadın Giyim
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-purple-500 mr-2">✓</span>
                    Ayakkabı & Aksesuar
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-purple-500 mr-2">✓</span>
                    Spor & Outdoor
                  </div>
                </div>
                
                <Link 
                  href="/giyim" 
                  className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  Platformu İncele →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">İletişim</h2>
            <p className="text-base sm:text-lg text-gray-600">Bizimle iletişime geçin</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={scrollToPlatforms}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              🚀 Platformları İncele
            </button>
            <button 
              onClick={openWhatsApp}
              className="bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300"
            >
              💬 WhatsApp'tan Yaz
            </button>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-xl p-6 sm:p-8 text-center shadow-lg">
              <div className="text-3xl sm:text-4xl mb-4">📞</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Telefon</h3>
              <p className="text-gray-600">0501 242 97 91</p>
            </div>
            <div className="bg-white rounded-xl p-6 sm:p-8 text-center shadow-lg">
              <div className="text-3xl sm:text-4xl mb-4">💬</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-gray-600">0501 242 97 91</p>
            </div>
            <div className="bg-white rounded-xl p-6 sm:p-8 text-center shadow-lg">
              <div className="text-3xl sm:text-4xl mb-4">📧</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">E-posta</h3>
              <p className="text-gray-600">info@neomedyatr.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">NEOMEDYA</h3>
              <p className="text-gray-400 mb-4">
                Modern e-ticaret çözümleri ile işinizi büyütün. 
                Her sektör için özel olarak tasarlanmış platformlar.
              </p>
              <button 
                onClick={openWhatsApp}
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300"
              >
                💬 WhatsApp
              </button>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Platformlar</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/ev" className="hover:text-white transition-colors">🏠 NEOMEDYA EV</Link></li>
                <li><Link href="/tech" className="hover:text-white transition-colors">💻 NEOMEDYA TECH</Link></li>
                <li><Link href="/giyim" className="hover:text-white transition-colors">👕 NEOMEDYA GİYİM</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">İletişim</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 0501 242 97 91</li>
                <li>💬 0501 242 97 91</li>
                <li>📧 info@neomedyatr.com</li>
              </ul>
            </div>
          </div>
          
          <hr className="border-gray-800 my-8" />
          
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © 2024 NEOMEDYA. Tüm hakları saklıdır. Bu web sitesi ve içeriği telif hakları ile korunmaktadır.
            </p>
            <p className="text-gray-400 text-sm text-center sm:text-right mt-4 sm:mt-0">
              Geliştirici: NEOMEDYA Teknoloji
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default HomePage 