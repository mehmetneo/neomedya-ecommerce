'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle } from 'lucide-react'

const Iletisim = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated form submission
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

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
              <h1 className="text-2xl font-bold text-gray-900">İletişim</h1>
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">İletişim</h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Sorularınız mı var? Size yardımcı olmaktan mutluluk duyarız. 
              Bizimle iletişime geçin!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Bizimle İletişime Geçin</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Herhangi bir sorunuz, öneriniz veya geri bildiriminiz varsa, 
                  aşağıdaki kanallardan bizimle iletişime geçebilirsiniz.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">E-posta</h3>
                    <p className="text-gray-600">info@neomedya.com</p>
                    <p className="text-gray-600">destek@neomedya.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                    <p className="text-gray-600">+90 212 555 0123</p>
                    <p className="text-gray-600">+90 212 555 0124</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Adres</h3>
                    <p className="text-gray-600">
                      NEOMEDYA Plaza<br />
                      Levent Mahallesi, Büyükdere Caddesi<br />
                      No: 123, Beşiktaş/İstanbul
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Çalışma Saatleri</h3>
                    <p className="text-gray-600">Pazartesi - Cuma: 09:00 - 18:00</p>
                    <p className="text-gray-600">Cumartesi: 09:00 - 14:00</p>
                    <p className="text-gray-600">Pazar: Kapalı</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Sosyal Medya</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                    📘
                  </a>
                  <a href="#" className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
                    📷
                  </a>
                  <a href="#" className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                    🐦
                  </a>
                  <a href="#" className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                    📺
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Mesaj Gönderin</h2>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Mesajınız Gönderildi!</h3>
                  <p className="text-gray-600">En kısa sürede size geri dönüş yapacağız.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ad Soyad *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-posta *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Konu *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mesajınız *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="h-5 w-5" />
                    Mesaj Gönder
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Sık Sorulan Sorular</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Siparişimi nasıl takip edebilirim?</h3>
                <p className="text-gray-600">
                  Siparişinizi takip etmek için hesabınıza giriş yapın ve "Siparişlerim" 
                  bölümünden sipariş durumunu kontrol edin.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-2">İade koşulları nelerdir?</h3>
                <p className="text-gray-600">
                  Ürünlerinizi 14 gün içinde, kullanılmamış ve orijinal ambalajında 
                  iade edebilirsiniz.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Kargo ücreti ne kadar?</h3>
                <p className="text-gray-600">
                  150 TL üzeri alışverişlerde kargo ücretsizdir. 
                  Daha düşük tutarlı siparişlerde 19.90 TL kargo ücreti alınır.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Hangi ödeme yöntemlerini kabul ediyorsunuz?</h3>
                <p className="text-gray-600">
                  Kredi kartı, banka kartı, havale/EFT ve kapıda ödeme 
                  seçeneklerini sunuyoruz.
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

export default Iletisim 