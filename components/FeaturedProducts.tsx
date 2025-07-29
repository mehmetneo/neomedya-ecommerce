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

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Ürünleri API'den çek
  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Tüm kategorilerden ürünleri topla
      const allProducts: Product[] = []
      
      // Her kategoriden ürünleri çek
      const categories = ['erkek', 'kadin', 'cocuk', 'ayakkabı', 'aksesuar']
      
      for (const category of categories) {
        try {
          const response = await fetch(`/api/products?category=${category}`)
          const data = await response.json()
          
          if (data.success && data.products.length > 0) {
            // Ürünleri formatla
            const formattedProducts = data.products.map((product: any) => ({
              ...product,
              salesCount: Math.floor(Math.random() * 200) + 50, // 50-250 arası rastgele satış sayısı
              images: product.images || [product.image]
            }))
            allProducts.push(...formattedProducts)
          }
        } catch (err) {
          console.error(`${category} kategorisi için ürün yükleme hatası:`, err)
        }
      }
      
      // Ürünleri karıştır ve rastgele 8 tanesini seç
      const shuffled = allProducts.sort(() => 0.5 - Math.random())
      const selectedProducts = shuffled.slice(0, 8)
      
      setProducts(selectedProducts)
    } catch (err) {
      setError('Ürünler yüklenirken hata oluştu')
      console.error('❌ Ürün yükleme hatası:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Admin panelinde ürün güncellendiğinde sayfayı yenile
  useEffect(() => {
    const handleProductsUpdated = (event: CustomEvent) => {
      console.log('🔄 Öne çıkan ürünler güncellendi, sayfa yenileniyor...')
      fetchProducts()
    }

    window.addEventListener('productsUpdated' as any, handleProductsUpdated)
    
    return () => {
      window.removeEventListener('productsUpdated' as any, handleProductsUpdated)
    }
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
      case 'cocuk':
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

  if (error) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-lg text-gray-600 mb-8">En popüler ürünlerimizi keşfedin</p>
          </div>
          
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={fetchProducts}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-lg text-gray-600 mb-8">Henüz ürün bulunmuyor</p>
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