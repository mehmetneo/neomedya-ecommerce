'use client'

import { useState } from 'react'

const products = [
  {
    id: '1',
    name: 'Premium T-Shirt',
    category: 'Erkek',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'
  },
  {
    id: '2',
    name: 'Kadın Elbise',
    category: 'Kadın',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop'
  },
  {
    id: '3',
    name: 'Çocuk T-Shirt',
    category: 'Çocuk',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop'
  },
  {
    id: '4',
    name: 'Spor Ayakkabı',
    category: 'Ayakkabı',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'
  },
  {
    id: '5',
    name: 'Saat',
    category: 'Aksesuar',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop'
  },
  {
    id: '6',
    name: 'Kot Pantolon',
    category: 'Erkek',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop'
  },
  {
    id: '7',
    name: 'Kadın Bluz',
    category: 'Kadın',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4c3d5d8b?w=400&h=400&fit=crop'
  },
  {
    id: '8',
    name: 'Günlük Ayakkabı',
    category: 'Ayakkabı',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop'
  }
]

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü')

  const categories = ['Tümü', 'Erkek', 'Kadın', 'Çocuk', 'Ayakkabı', 'Aksesuar']
  
  const filteredProducts = selectedCategory === 'Tümü' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
          <p className="text-lg text-gray-600">En popüler ve trend ürünlerimizi keşfedin</p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">
                    {product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                  </span>
                  
                  <button className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Sepete Ekle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 