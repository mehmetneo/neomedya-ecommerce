'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Users, Target, Award, Globe, Heart, Shield, Zap } from 'lucide-react'

const Hakkimizda = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                Ana Sayfa
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Hakkımızda</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/arama" className="p-2 text-gray-700 hover:text-orange-600 transition-colors">
                🔍
              </Link>
              <Link href="/sepet" className="p-2 text-gray-700 hover:text-orange-600 transition-colors">
                🛒
              </Link>
              <Link href="/profil" className="p-2 text-gray-700 hover:text-orange-600 transition-colors">👤</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">NEOMEDYA E TİCARET PLATFORMLARI</h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              Modern e-ticaret çözümleri ile Türkiye'nin önde gelen dijital platformlarından biri olarak, 
              müşterilerimize en kaliteli ürünleri en uygun fiyatlarla sunuyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Hikayemiz</h2>
              <p className="text-lg text-gray-600 mb-6">
                2020 yılında kurulan NEOMEDYA, dijital dönüşümün öncüsü olarak e-ticaret dünyasında 
                fark yaratmaya odaklandı. Müşteri memnuniyetini her zaman ön planda tutarak, 
                güvenilir ve kaliteli hizmet sunmaya devam ediyoruz.
              </p>
              <p className="text-lg text-gray-600">
                Bugün Türkiye'nin dört bir yanından binlerce müşteriye hizmet veriyor, 
                teknolojinin gücüyle alışveriş deneyimini yeniden tanımlıyoruz.
              </p>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-4">🏢</div>
              <div className="text-2xl font-bold text-gray-900">NEOMEDYA</div>
              <div className="text-sm text-gray-600">E-Ticaret Platformları</div>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Misyonumuz</h3>
              <p className="text-gray-600">
                Müşterilerimize en kaliteli ürünleri en uygun fiyatlarla sunarak, 
                alışveriş deneyimini keyifli hale getirmek.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Vizyonumuz</h3>
              <p className="text-gray-600">
                Türkiye'nin en güvenilir ve tercih edilen e-ticaret platformu olmak, 
                teknolojik yeniliklerle sektöre öncülük etmek.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Değerlerimiz</h3>
              <p className="text-gray-600">
                Müşteri odaklılık, güvenilirlik, şeffaflık ve sürekli yenilik. 
                Her kararımızda bu değerleri gözetiyoruz.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Yenilikçilik</h3>
              <p className="text-gray-600">
                Teknolojik gelişmeleri takip ederek, müşterilerimize en iyi 
                dijital deneyimi sunmaya odaklanıyoruz.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Rakamlarla NEOMEDYA</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">50K+</div>
                <div className="text-gray-600">Mutlu Müşteri</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">1000+</div>
                <div className="text-gray-600">Ürün Çeşidi</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600">Müşteri Desteği</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">4.9</div>
                <div className="text-gray-600">Müşteri Puanı</div>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Ekibimiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-12 w-12 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Deneyimli Ekip</h3>
                <p className="text-gray-600">
                  E-ticaret ve teknoloji alanında uzman ekibimizle, 
                  müşterilerimize en iyi hizmeti sunuyoruz.
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Güvenli Altyapı</h3>
                <p className="text-gray-600">
                  En son güvenlik teknolojileri ile korunan platformumuzda, 
                  verileriniz güvende.
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Kalite Odaklı</h3>
                <p className="text-gray-600">
                  Her ürünümüzü özenle seçiyor, kalite standartlarımızdan 
                  ödün vermiyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">NEOMEDYA E TİCARET PLATFORMLARI</h3>
            <p className="text-gray-400 mb-6">Modern e-ticaret platformları ve ev dekorasyon ürünleri</p>
            <div className="flex justify-center space-x-4">
              <Link href="/hakkimizda" className="text-gray-400 hover:text-white transition-colors">Hakkımızda</Link>
              <Link href="/iletisim" className="text-gray-400 hover:text-white transition-colors">İletişim</Link>
              <Link href="/yardim" className="text-gray-400 hover:text-white transition-colors">Yardım</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Hakkimizda 