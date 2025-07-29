'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'

interface Product {
  id: string
  name: string
  price: number
  image: string
  images?: string[]
  rating: number
  reviews: number
  isSale?: boolean
  salePrice?: number
}

const aksesuarUrunleri: Product[] = [
  {
    id: '1',
    name: 'Lüks Saat',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&h=600&fit=crop',
    rating: 4.8,
    reviews: 124,
    isSale: true,
    salePrice: 499.99
  },
  {
    id: '2',
    name: 'Deri Çanta',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop',
    rating: 4.6,
    reviews: 89
  },
  {
    id: '3',
    name: 'Altın Kolye',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop',
    rating: 4.9,
    reviews: 56
  },
  {
    id: '4',
    name: 'Güneş Gözlüğü',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=600&fit=crop',
    rating: 4.7,
    reviews: 203
  },
  {
    id: '5',
    name: 'Deri Kemer',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop',
    rating: 4.5,
    reviews: 167
  },
  {
    id: '6',
    name: 'İpek Şal',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop',
    rating: 4.4,
    reviews: 98
  },
  {
    id: '7',
    name: 'Cüzdan',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop',
    rating: 4.6,
    reviews: 145
  },
  {
    id: '8',
    name: 'Gümüş Bilezik',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop',
    rating: 4.3,
    reviews: 76
  }
]

export default function AksesuarPage() {
  const [products, setProducts] = useState(aksesuarUrunleri)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // Admin panelinden gelen ürün güncellemelerini dinle
    const handleProductsUpdated = (event: CustomEvent) => {
      const updatedProducts = event.detail
      // Sadece aksesuar kategorisindeki ürünleri filtrele
      const aksesuarProducts = updatedProducts.filter((product: any) => 
        product.category === 'Aksesuar'
      )
      if (aksesuarProducts.length > 0) {
        setProducts(aksesuarProducts)
      }
    }

    window.addEventListener('productsUpdated', handleProductsUpdated as EventListener)
    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdated as EventListener)
    }
  }, [])

  const addToCart = (product: Product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image,
      size: 'Tek Boyut',
      color: 'Standart',
      quantity: 1
    }

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItemIndex = existingCart.findIndex((item: any) => 
      item.id === cartItem.id && item.size === cartItem.size && item.color === cartItem.color
    )

    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1
    } else {
      existingCart.push(cartItem)
    }

    localStorage.setItem('cart', JSON.stringify(existingCart))
    
    // Cart updated event'ini tetikle
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }

  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
    setCurrentImageIndex(0)
    setShowModal(true)
  }

  const closeProductModal = () => {
    setShowModal(false)
    setSelectedProduct(null)
  }

  const nextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => (prev + 1) % (selectedProduct.images?.length || 1))
    }
  }

  const prevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? (selectedProduct.images?.length || 1) - 1 : prev - 1
      )
    }
  }

  const selectImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header onCartClick={() => {}} cartItemCount={0} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Aksesuar Koleksiyonu
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tarzınızı tamamlayan şık aksesuarlar. Saat, çanta, takı ve daha fazlası.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => openProductModal(product)}
                />
                {product.isSale && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    İNDİRİM
                  </span>
                )}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => openProductModal(product)}
                    className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {product.isSale ? (
                      <>
                        <span className="text-lg font-bold text-red-600">
                          ₺{product.salePrice}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          ₺{product.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-blue-600">
                        ₺{product.price}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Sepete Ekle
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Henüz ürün bulunmuyor
            </h3>
            <p className="text-gray-600">
              Yakında yeni aksesuarlar eklenecek
            </p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedProduct.name}
                </h2>
                <button
                  onClick={closeProductModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Product Images */}
              <div className="relative mb-6">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={selectedProduct.images?.[currentImageIndex] || selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-96 object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  {selectedProduct.images && selectedProduct.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Image Thumbnails */}
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <div className="flex space-x-2 mt-4">
                    {selectedProduct.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => selectImage(index)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          index === currentImageIndex
                            ? 'border-blue-500'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${selectedProduct.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                {/* Rating */}
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(selectedProduct.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {selectedProduct.rating} ({selectedProduct.reviews} değerlendirme)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-3">
                  {selectedProduct.isSale ? (
                    <>
                      <span className="text-3xl font-bold text-red-600">
                        ₺{selectedProduct.salePrice}
                      </span>
                      <span className="text-xl text-gray-400 line-through">
                        ₺{selectedProduct.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-blue-600">
                      ₺{selectedProduct.price}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Ürün Açıklaması</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Yüksek kaliteli malzemelerden üretilen bu aksesuar, tarzınızı tamamlayan şık bir seçim. 
                    Günlük kullanım için ideal olan bu ürün, her ortamda kullanabilirsiniz.
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Özellikler</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Yüksek kaliteli malzeme</li>
                    <li>• Şık tasarım</li>
                    <li>• Uzun ömürlü kullanım</li>
                    <li>• Kolay bakım</li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct)
                      closeProductModal()
                    }}
                    className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  >
                    Sepete Ekle
                  </button>
                  <button
                    onClick={closeProductModal}
                    className="flex-1 border border-blue-500 text-blue-500 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  >
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
} 