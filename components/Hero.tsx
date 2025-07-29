'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Yeni Koleksiyon
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Stil Sahibi Ol
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Neomedya</span>
                ile
              </h1>
              
              <p className="text-lg text-gray-600 max-w-lg">
                En trend ve kaliteli giyim ürünleri ile tarzınızı yansıtın. 
                Erkek, kadın ve çocuk kıyafetleri için en iyi seçenekler.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group">
                Alışverişe Başla
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/kadin" className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-all duration-200 border border-gray-200 flex items-center justify-center">
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Koleksiyonları Keşfet
              </Link>
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-200 border-2 border-white"></div>
                </div>
                <span className="ml-3">10,000+ mutlu müşteri</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>4.9/5 puan</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=700&fit=crop"
                alt="Fashion Collection"
                className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
              />
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">%50</div>
                  <div className="text-xs text-gray-600">İndirim</div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">Ücretsiz</div>
                  <div className="text-xs text-gray-600">Kargo</div>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-2xl -z-10 transform rotate-3 scale-105"></div>
          </div>
        </div>
      </div>
    </section>
  )
} 