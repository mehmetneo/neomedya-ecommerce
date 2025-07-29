'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, HelpCircle, ShoppingCart, CreditCard, Truck, RefreshCw, Shield, User, Package, MessageSquare } from 'lucide-react'

const Yardim = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const helpCategories = [
    { id: 'all', name: 'Tümü', icon: HelpCircle },
    { id: 'shopping', name: 'Alışveriş', icon: ShoppingCart },
    { id: 'payment', name: 'Ödeme', icon: CreditCard },
    { id: 'shipping', name: 'Kargo', icon: Truck },
    { id: 'returns', name: 'İade', icon: RefreshCw },
    { id: 'account', name: 'Hesap', icon: User },
    { id: 'security', name: 'Güvenlik', icon: Shield },
    { id: 'orders', name: 'Siparişler', icon: Package }
  ]

  const helpArticles = [
    {
      id: 1,
      title: 'İlk siparişimi nasıl verebilirim?',
      content: 'İlk siparişinizi vermek için önce hesap oluşturmanız gerekiyor. Ardından istediğiniz ürünleri sepetinize ekleyip ödeme adımlarını takip edebilirsiniz.',
      category: 'shopping',
      tags: ['sipariş', 'ilk alışveriş', 'hesap']
    },
    {
      id: 2,
      title: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
      content: 'Kredi kartı, banka kartı, havale/EFT ve kapıda ödeme seçeneklerini sunuyoruz. Tüm ödeme işlemleriniz güvenli altyapımız ile korunmaktadır.',
      category: 'payment',
      tags: ['ödeme', 'kredi kartı', 'havale']
    },
    {
      id: 3,
      title: 'Kargo süresi ne kadar?',
      content: 'Siparişiniz onaylandıktan sonra 1-3 iş günü içinde kargoya verilir. Teslimat süresi bulunduğunuz bölgeye göre 1-3 iş günü arasında değişir.',
      category: 'shipping',
      tags: ['kargo', 'teslimat', 'süre']
    },
    {
      id: 4,
      title: 'İade koşulları nelerdir?',
      content: 'Ürünlerinizi 14 gün içinde, kullanılmamış ve orijinal ambalajında iade edebilirsiniz. İade kargo ücreti müşteri tarafından karşılanır.',
      category: 'returns',
      tags: ['iade', 'koşullar', '14 gün']
    },
    {
      id: 5,
      title: 'Hesabımı nasıl güvenli tutabilirim?',
      content: 'Güçlü bir şifre kullanın, iki faktörlü doğrulamayı aktif edin ve hesap bilgilerinizi kimseyle paylaşmayın. Düzenli olarak şifrenizi değiştirin.',
      category: 'security',
      tags: ['güvenlik', 'şifre', 'hesap']
    },
    {
      id: 6,
      title: 'Siparişimi nasıl takip edebilirim?',
      content: 'Hesabınıza giriş yaparak "Siparişlerim" bölümünden sipariş durumunu kontrol edebilirsiniz. Kargo takip numarası ile de takip yapabilirsiniz.',
      category: 'orders',
      tags: ['sipariş takibi', 'kargo', 'durum']
    },
    {
      id: 7,
      title: 'Kargo ücreti ne kadar?',
      content: '150 TL üzeri alışverişlerde kargo ücretsizdir. Daha düşük tutarlı siparişlerde 19.90 TL kargo ücreti alınır.',
      category: 'shipping',
      tags: ['kargo ücreti', 'ücretsiz kargo', '150 TL']
    },
    {
      id: 8,
      title: 'Hesap bilgilerimi nasıl güncelleyebilirim?',
      content: 'Profil sayfanızdan kişisel bilgilerinizi, adres bilgilerinizi ve iletişim bilgilerinizi güncelleyebilirsiniz.',
      category: 'account',
      tags: ['profil', 'bilgi güncelleme', 'hesap']
    }
  ]

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory
    
    return matchesSearch && matchesCategory
  })

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
              <h1 className="text-2xl font-bold text-gray-900">Yardım Merkezi</h1>
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Yardım Merkezi</h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Sorularınızın cevaplarını burada bulabilirsiniz. 
              Aradığınızı bulamazsanız bizimle iletişime geçin!
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Yardım konusu ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Help Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Kategoriler</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {helpCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    activeCategory === category.id
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300'
                  }`}
                >
                  <category.icon className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-sm font-medium">{category.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Articles */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {searchTerm ? `"${searchTerm}" için sonuçlar` : 'Sık Sorulan Sorular'}
            </h2>
            
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sonuç bulunamadı</h3>
                <p className="text-gray-600 mb-6">
                  Aradığınız konuyla ilgili yardım makalesi bulunamadı.
                </p>
                <Link
                  href="/iletisim"
                  className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors inline-flex items-center gap-2"
                >
                  <MessageSquare className="h-5 w-5" />
                  İletişime Geçin
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{article.title}</h3>
                    <p className="text-gray-600 mb-4">{article.content}</p>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Hızlı Bağlantılar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/iletisim"
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <MessageSquare className="h-8 w-8 text-orange-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">İletişime Geçin</h3>
                <p className="text-gray-600 text-sm">
                  Sorularınız için müşteri hizmetlerimizle iletişime geçin.
                </p>
              </Link>
              
              <Link
                href="/profil"
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <User className="h-8 w-8 text-orange-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Hesabım</h3>
                <p className="text-gray-600 text-sm">
                  Siparişlerinizi takip edin ve hesap ayarlarınızı yönetin.
                </p>
              </Link>
              
              <Link
                href="/sepet"
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <ShoppingCart className="h-8 w-8 text-orange-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Sepetim</h3>
                <p className="text-gray-600 text-sm">
                  Sepetinizdeki ürünleri görüntüleyin ve siparişinizi tamamlayın.
                </p>
              </Link>
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

export default Yardim 