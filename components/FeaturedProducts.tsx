'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
  description: string
}

// Static ürün verileri
const staticFeaturedProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Pamuklu T-Shirt',
    category: 'Erkek',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    description: 'Rahat ve dayanıklı pamuklu t-shirt'
  },
  {
    id: '11',
    name: 'Kadın Elbise',
    category: 'Kadın',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
    description: 'Şık kadın elbisesi'
  },
  {
    id: '21',
    name: 'Çocuk T-Shirt',
    category: 'Çocuk',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop',
    description: 'Çocuklar için rahat t-shirt'
  },
  {
    id: '31',
    name: 'Spor Ayakkabı',
    category: 'Ayakkabı',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    description: 'Rahat spor ayakkabı'
  },
  {
    id: '41',
    name: 'Saat',
    category: 'Aksesuar',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',
    description: 'Şık kol saati'
  },
  {
    id: '2',
    name: 'Slim Fit Kot Pantolon',
    category: 'Erkek',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    description: 'Modern kesim kot pantolon'
  },
  {
    id: '12',
    name: 'Kadın Bluz',
    category: 'Kadın',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4c3d5d8b?w=400&h=400&fit=crop',
    description: 'Zarif kadın bluzu'
  },
  {
    id: '32',
    name: 'Günlük Ayakkabı',
    category: 'Ayakkabı',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    description: 'Günlük kullanım ayakkabısı'
  }
]

export default function FeaturedProducts() {
  const [products] = useState<Product[]>(staticFeaturedProducts)

  const getProductEmoji = (category: string) => {
    switch (category) {
      case 'Erkek': return '👔'
      case 'Kadın': return '👗'
      case 'Çocuk': return '👶'
      case 'Ayakkabı': return '👟'
      case 'Aksesuar': return '💍'
      default: return '🛍️'
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
          <p className="text-lg text-gray-600">En popüler ve trend ürünlerimizi keşfedin</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <span className="text-2xl">{getProductEmoji(product.category)}</span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">{product.category}</span>
                  <span className="text-lg font-bold text-blue-600">
                    {product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                  </span>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                  Sepete Ekle
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/erkek"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            Tüm Ürünleri Gör
            <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
} 