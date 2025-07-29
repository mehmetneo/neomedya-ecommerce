'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  stock: number
  status: 'active' | 'inactive'
  image: string
  description: string
  createdAt: string
  salesCount: number
  images?: string[]
  sizes?: string[]
  colors?: string[]
  tags?: string[]
}

// Static ürün verileri
const staticFeaturedProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Pamuklu T-Shirt',
    category: 'Erkek',
    price: 89.99,
    stock: 50,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    description: 'Rahat ve dayanıklı pamuklu t-shirt',
    createdAt: new Date().toISOString(),
    salesCount: 150
  },
  {
    id: '11',
    name: 'Kadın Elbise',
    category: 'Kadın',
    price: 299.99,
    stock: 20,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
    description: 'Şık kadın elbisesi',
    createdAt: new Date().toISOString(),
    salesCount: 120
  },
  {
    id: '21',
    name: 'Çocuk T-Shirt',
    category: 'Çocuk',
    price: 49.99,
    stock: 60,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop',
    description: 'Çocuklar için rahat t-shirt',
    createdAt: new Date().toISOString(),
    salesCount: 200
  },
  {
    id: '31',
    name: 'Spor Ayakkabı',
    category: 'Ayakkabı',
    price: 299.99,
    stock: 50,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    description: 'Rahat spor ayakkabı',
    createdAt: new Date().toISOString(),
    salesCount: 180
  },
  {
    id: '41',
    name: 'Saat',
    category: 'Aksesuar',
    price: 599.99,
    stock: 15,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',
    description: 'Şık kol saati',
    createdAt: new Date().toISOString(),
    salesCount: 80
  },
  {
    id: '2',
    name: 'Slim Fit Kot Pantolon',
    category: 'Erkek',
    price: 199.99,
    stock: 30,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    description: 'Modern kesim kot pantolon',
    createdAt: new Date().toISOString(),
    salesCount: 95
  },
  {
    id: '12',
    name: 'Kadın Bluz',
    category: 'Kadın',
    price: 129.99,
    stock: 35,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4c3d5d8b?w=400&h=400&fit=crop',
    description: 'Zarif kadın bluzu',
    createdAt: new Date().toISOString(),
    salesCount: 110
  },
  {
    id: '32',
    name: 'Günlük Ayakkabı',
    category: 'Ayakkabı',
    price: 199.99,
    stock: 40,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    description: 'Günlük kullanım ayakkabısı',
    createdAt: new Date().toISOString(),
    salesCount: 160
  }
]

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Static ürünleri kullan
    setProducts(staticFeaturedProducts)
    setLoading(false)
  }, [])

  const addToCart = (product: Product) => {
    const savedCart = localStorage.getItem('cart')
    let cart = savedCart ? JSON.parse(savedCart) : []

    const existingItem = cart.find((item: any) => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: 'M',
        color: 'Standart',
        quantity: 1
      })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cartUpdated'))
    
    console.log('✅ Ürün sepete eklendi:', product.name)
  }

  const getProductEmoji = (category: string) => {
    switch (category.toLowerCase()) {
      case 'erkek':
        return '👔'
      case 'kadin':
        return '👗'
      case 'çocuk':
        return '👶'
      case 'ayakkabı':
      case 'ayakkabi':
        return '👟'
      case 'aksesuar':
        return '💍'
      default:
        return '🛍️'
    }
  }

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-lg text-gray-600">En popüler ürünlerimizi keşfedin</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
          <p className="text-lg text-gray-600">En popüler ürünlerimizi keşfedin</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <span className="text-4xl bg-white bg-opacity-90 rounded-full p-3 shadow-lg">
                      {getProductEmoji(product.category)}
                    </span>
                  </div>
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {product.category}
                  </div>
                </div>
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                    %{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)} İndirim
                  </div>
                )}
                {product.stock === 0 && (
                  <div className="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 rounded text-sm font-medium">
                    Tükendi
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      ₺{product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ₺{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {product.salesCount} satış
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    {product.stock === 0 ? 'Tükendi' : 'Sepete Ekle'}
                  </button>
                  <Link
                    href={`/${product.category.toLowerCase()}`}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium text-center"
                  >
                    Detay
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link
            href="/erkek"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Kategorileri Keşfet
          </Link>
        </div>
      </div>
    </section>
  )
} 