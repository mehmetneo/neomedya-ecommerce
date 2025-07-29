'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      // Burada gerçek newsletter aboneliği yapılabilir
    }
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Yeni Koleksiyonlardan Haberdar Olun
        </h2>
        <p className="text-lg text-blue-100 mb-8">
          En yeni ürünler ve özel indirimler için e-posta listemize katılın
        </p>
        
        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Abone Ol
            </button>
          </form>
        ) : (
          <div className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold max-w-md mx-auto">
            ✅ Başarıyla abone oldunuz!
          </div>
        )}
        
        <p className="text-sm text-blue-200 mt-4">
          Spam göndermiyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
        </p>
      </div>
    </section>
  )
} 