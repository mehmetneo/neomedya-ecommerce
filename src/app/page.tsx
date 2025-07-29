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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-16">
      {/* Hero Section - Showcase Focus */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <span className="text-yellow-400">⭐</span>
              <span className="text-sm font-medium">Modern E-Ticaret Platformları</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                NEOMEDYA
              </span>
              <br />
              E-Ticaret Çözümleri
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Modern, hızlı ve kullanıcı dostu e-ticaret platformları. 
              Her sektör için özel olarak tasarlanmış çözümler.
            </p>
            
            <div className="flex justify-center mb-12">
              <button 
                onClick={scrollToPlatforms}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                🚀 Platformları İncele
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-bold text-lg mb-2">Hızlı Performans</h3>
                <p className="text-blue-100 text-sm">Optimize edilmiş altyapı</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="font-bold text-lg mb-2">Mobil Uyumlu</h3>
                <p className="text-blue-100 text-sm">Tüm cihazlarda mükemmel deneyim</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="font-bold text-lg mb-2">Modern Tasarım</h3>
                <p className="text-blue-100 text-sm">Çağdaş kullanıcı arayüzü</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Özellikleri</h2>
            <p className="text-lg text-gray-600">Modern e-ticaret deneyimi için gerekli tüm özellikler</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">3</div>
              <div className="text-gray-600">Farklı Platform</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Özellik</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Responsive</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Erişilebilir</div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Showcase Section */}
      <section id="platform-showcase" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-6 py-2 mb-6">
              <span className="text-lg">🏆</span>
              <span className="font-semibold">Platform Showcase</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sektöre Özel Çözümler
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Her sektör için özel olarak tasarlanmış, modern ve kullanıcı dostu e-ticaret platformları
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* NEOMEDYA EV */}
            <div className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                <div className="relative">
                  <div className="text-6xl mb-4">🏠</div>
                  <h3 className="text-3xl font-bold mb-3">NEOMEDYA EV</h3>
                  <p className="text-orange-100 text-lg">
                    Ev dekorasyonu ve mobilya platformu
                  </p>
                </div>
              </div>
              
              <div className="p-8">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Oturma Odası Mobilyaları</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Aydınlatma Ürünleri</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Mutfak ve Banyo Mobilyaları</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Bahçe ve Yatak Odası Takımları</span>
                  </div>
                </div>
                
                <Link
                  href="/ev"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 px-6 rounded-xl font-bold hover:from-orange-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center group-hover:shadow-lg"
                >
                  Platformu İncele →
                </Link>
              </div>
            </div>

            {/* NEOMEDYA TECH */}
            <div className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                <div className="relative">
                  <div className="text-6xl mb-4">💻</div>
                  <h3 className="text-3xl font-bold mb-3">NEOMEDYA TECH</h3>
                  <p className="text-blue-100 text-lg">
                    Teknoloji ve elektronik platformu
                  </p>
                </div>
              </div>
              
              <div className="p-8">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Telefon ve Tablet</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Bilgisayar ve Laptop</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Aksesuar ve Yedek Parça</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Gaming ve E-Spor</span>
                  </div>
                </div>
                
                <Link
                  href="/tech"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center group-hover:shadow-lg"
                >
                  Platformu İncele →
                </Link>
              </div>
            </div>

            {/* NEOMEDYA GİYİM */}
            <div className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                <div className="relative">
                  <div className="text-6xl mb-4">👕</div>
                  <h3 className="text-3xl font-bold mb-3">NEOMEDYA GİYİM</h3>
                  <p className="text-pink-100 text-lg">
                    Moda ve giyim platformu
                  </p>
                </div>
              </div>
              
              <div className="p-8">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Erkek Giyim</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Kadın Giyim</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Çocuk Giyim</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Ayakkabı ve Aksesuar</span>
                  </div>
                </div>
                
                <Link
                  href="/giyim"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-6 rounded-xl font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center group-hover:shadow-lg"
                >
                  Platformu İncele →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Platform Özellikleri</h2>
            <p className="text-xl text-gray-600">Modern e-ticaret için gerekli tüm özellikler</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hızlı Performans</h3>
              <p className="text-gray-600">Optimize edilmiş altyapı ile hızlı yükleme süreleri</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mobil Uyumlu</h3>
              <p className="text-gray-600">Tüm cihazlarda mükemmel görünüm ve deneyim</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Güvenli Altyapı</h3>
              <p className="text-gray-600">SSL sertifikalı güvenli sistem ve veri koruması</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">SEO Optimizasyonu</h3>
              <p className="text-gray-600">Arama motorlarında üst sıralarda yer alma</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Platformları Keşfedin
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Modern e-ticaret platformlarımızı inceleyin ve deneyimleyin. 
            Her sektör için özel olarak tasarlanmış çözümler.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button 
              onClick={scrollToPlatforms}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
            >
              🚀 Platformları İncele
            </button>
            <button 
              onClick={openWhatsApp}
              className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
            >
              💬 WhatsApp'tan Yaz
            </button>
          </div>
          
          <div className="mt-8 text-blue-100">
            <p className="text-sm">✅ Modern ve kullanıcı dostu arayüz</p>
            <p className="text-sm">✅ Responsive tasarım</p>
            <p className="text-sm">✅ Hızlı ve güvenli altyapı</p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">İletişim Bilgileri</h2>
            <p className="text-lg text-gray-600">Bizimle iletişime geçin</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Telefon</h3>
              <p className="text-gray-600">0501 242 97 91</p>
              <p className="text-sm text-gray-500 mt-1">7/24 Hizmet</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-gray-600">0501 242 97 91</p>
              <p className="text-sm text-gray-500 mt-1">Anında Yanıt</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">E-posta</h3>
              <p className="text-gray-600">info@neomedyatr.com</p>
              <p className="text-sm text-gray-500 mt-1">24 Saat İçinde Yanıt</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">NEOMEDYA</h3>
              <p className="text-gray-300 mb-4">
                Modern e-ticaret platformları ile işinizi dijital dünyada büyütün. 
                Her sektör için özel çözümler sunuyoruz.
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={openWhatsApp}
                  className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors"
                >
                  💬
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Platformlar</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/ev" className="hover:text-white transition-colors">NEOMEDYA EV</Link></li>
                <li><Link href="/tech" className="hover:text-white transition-colors">NEOMEDYA TECH</Link></li>
                <li><Link href="/giyim" className="hover:text-white transition-colors">NEOMEDYA GİYİM</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">İletişim</h4>
              <ul className="space-y-2 text-gray-300">
                <li>📞 0501 242 97 91</li>
                <li>💬 WhatsApp</li>
                <li>📧 info@neomedyatr.com</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm">
                © 2024 NEOMEDYA. Tüm hakları saklıdır. Bu web sitesi ve içeriği telif hakları ile korunmaktadır.
              </div>
              <div className="text-gray-400 text-sm mt-4 md:mt-0">
                <span>Geliştirici: NEOMEDYA Teknoloji</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default HomePage 