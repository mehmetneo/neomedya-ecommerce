'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Cart from '@/components/Cart'

const aksesuarUrunleri = [
  {
    id: '1',
    name: 'Deri Cüzdan',
    price: 199.99,
    originalPrice: 299.99,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=600&fit=crop',
    rating: 4.8,
    reviews: 156,
    isSale: true
  },
  {
    id: '2',
    name: 'Saat - Klasik Model',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=600&fit=crop',
    rating: 4.9,
    reviews: 234
  },
  {
    id: '3',
    name: 'Güneş Gözlüğü',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=600&fit=crop',
    rating: 4.7,
    reviews: 189,
    isSale: true
  },
  {
    id: '4',
    name: 'Çanta - Günlük Kullanım',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=600&fit=crop',
    rating: 4.6,
    reviews: 98
  }
]

export default function AksesuarPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItemCount] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const handleAddToCart = (product: any) => {
    alert(`${product.name} sepete eklendi!`)
  }

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
  }

  return (
    <main className="min-h-screen">
      <Header onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItemCount} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Aksesuar Koleksiyonu
          </h1>
          <p className="text-xl mb-8">
            Şık ve kaliteli aksesuar ürünleri
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Tüm Ürünler
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Yeni Gelenler
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aksesuarUrunleri.map((product) => (
              <div key={product.id} className="card overflow-hidden cursor-pointer" onClick={() => handleProductClick(product)}>
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  
                  {product.isSale && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                      İndirim
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 hover:opacity-100 transition-opacity">
                    <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-purple-500 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-secondary-900 mb-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4" fill={i < Math.floor(product.rating) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-secondary-600 ml-2">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {product.originalPrice && (
                        <span className="text-sm text-secondary-400 line-through">
                          ₺{product.originalPrice}
                        </span>
                      )}
                      <span className="text-lg font-bold text-primary-600">
                        ₺{product.price}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(product)
                    }}
                    className="w-full bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
                  >
                    Sepete Ekle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-secondary-900">
                  {selectedProduct.name}
                </h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-secondary-400 hover:text-secondary-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                
                <div>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5" fill={i < Math.floor(selectedProduct.rating) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-secondary-600 ml-2">({selectedProduct.reviews} değerlendirme)</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    {selectedProduct.originalPrice && (
                      <span className="text-lg text-secondary-400 line-through">
                        ₺{selectedProduct.originalPrice}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-primary-600">
                      ₺{selectedProduct.price}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Renk</h4>
                      <div className="flex gap-2">
                        {['Siyah', 'Kahverengi', 'Beyaz', 'Mavi'].map((color) => (
                          <button key={color} className="px-4 py-2 border border-secondary-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Materyal</h4>
                      <div className="flex gap-2">
                        {['Deri', 'Suni Deri', 'Kumaş', 'Metal'].map((material) => (
                          <button key={material} className="px-4 py-2 border border-secondary-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
                            {material}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <button className="flex-1 bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors">
                        Sepete Ekle
                      </button>
                      <button className="flex-1 border border-primary-500 text-primary-500 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors">
                        Favorilere Ekle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </main>
  )
} 