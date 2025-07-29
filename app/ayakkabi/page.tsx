'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Cart from '@/components/Cart'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
}

const ayakkabiUrunleri = [
  {
    id: '1',
    name: 'Spor Ayakkabı',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop'
    ],
    rating: 4.8,
    reviews: 234,
    isSale: true,
    category: 'Spor'
  },
  {
    id: '2',
    name: 'Deri Ayakkabı',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop'
    ],
    rating: 4.9,
    reviews: 189,
    category: 'Deri'
  },
  {
    id: '3',
    name: 'Sandalet',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=600&fit=crop'
    ],
    rating: 4.6,
    reviews: 145,
    isSale: true,
    category: 'Sandalet'
  },
  {
    id: '4',
    name: 'Bot',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop'
    ],
    rating: 4.7,
    reviews: 92,
    category: 'Bot'
  },
  {
    id: '5',
    name: 'Loafer',
    price: 349.99,
    originalPrice: 449.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop'
    ],
    rating: 4.8,
    reviews: 167,
    isSale: true,
    category: 'Loafer'
  },
  {
    id: '6',
    name: 'Sneaker',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop'
    ],
    rating: 4.5,
    reviews: 123,
    category: 'Sneaker'
  }
]

export default function AyakkabiPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [selectedSize, setSelectedSize] = useState('42')
  const [selectedColor, setSelectedColor] = useState('Siyah')
  const [products, setProducts] = useState(ayakkabiUrunleri)
  const [showProductModal, setShowProductModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // Sepet sayısını localStorage'dan al
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      const cartItems = JSON.parse(savedCart)
      const totalItems = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
      setCartItemCount(totalItems)
    }

    // Admin panelinden gelen ürün güncellemelerini dinle
    const handleProductsUpdated = (event: CustomEvent) => {
      const updatedProducts = event.detail
      // Sadece ayakkabı kategorisindeki ürünleri filtrele
      const ayakkabiProducts = updatedProducts.filter((product: any) => product.category === 'Ayakkabı')
      setProducts(ayakkabiProducts.length > 0 ? ayakkabiProducts : ayakkabiUrunleri)
    }

    // localStorage'dan ürünleri yükle
    const savedProducts = localStorage.getItem('products')
    if (savedProducts) {
      const allProducts = JSON.parse(savedProducts)
      const ayakkabiProducts = allProducts.filter((product: any) => product.category === 'Ayakkabı')
      if (ayakkabiProducts.length > 0) {
        setProducts(ayakkabiProducts)
      }
    }

    window.addEventListener('productsUpdated', handleProductsUpdated as EventListener)

    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdated as EventListener)
    }
  }, [])

  const updateCartCount = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      const cartItems = JSON.parse(savedCart)
      const totalItems = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
      setCartItemCount(totalItems)
    }
  }

  const handleAddToCart = (product: any, size: string = '42', color: string = 'Siyah') => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      color,
      quantity: 1
    }

    // Mevcut sepeti al
    const savedCart = localStorage.getItem('cart')
    let cartItems: CartItem[] = savedCart ? JSON.parse(savedCart) : []

    // Aynı ürün var mı kontrol et
    const existingItemIndex = cartItems.findIndex(
      item => item.id === cartItem.id && item.size === cartItem.size && item.color === cartItem.color
    )

    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity += 1
    } else {
      cartItems.push(cartItem)
    }

    // Sepeti localStorage'a kaydet
    localStorage.setItem('cart', JSON.stringify(cartItems))
    updateCartCount()
    setSelectedProduct(null)
  }

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
  }

  // Ürün detay modalı fonksiyonları
  const openProductModal = (product: any) => {
    setSelectedProduct(product)
    setShowProductModal(true)
    setCurrentImageIndex(0)
  }

  const closeProductModal = () => {
    setShowProductModal(false)
    setSelectedProduct(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProduct && selectedProduct.images) {
      setCurrentImageIndex((prev) => 
        prev === selectedProduct.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedProduct && selectedProduct.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      )
    }
  }

  const selectImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItemCount} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Başlık */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ayakkabı Koleksiyonu</h1>
            <p className="text-gray-600">En şık ve rahat ayakkabı modelleri</p>
          </div>

          {/* Ürün Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => openProductModal(product)}
                  />
                  {product.isSale && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                      İndirim
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                      <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      {product.isSale ? (
                        <div>
                          <span className="text-lg font-bold text-gray-900">
                            {product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                          </span>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {product.originalPrice?.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          {product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Sepete Ekle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ürün Detay Modal */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                <button
                  onClick={closeProductModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Fotoğraf Bölümü */}
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={selectedProduct.images ? selectedProduct.images[currentImageIndex] : selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                    {selectedProduct.images && selectedProduct.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg"
                        >
                          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg"
                        >
                          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Küçük Fotoğraflar */}
                  {selectedProduct.images && selectedProduct.images.length > 1 && (
                    <div className="flex space-x-2">
                      {selectedProduct.images.map((image: string, index: number) => (
                        <div
                          key={index}
                          className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${
                            currentImageIndex === index ? 'border-blue-500' : 'border-gray-200 hover:border-blue-300'
                          }`}
                          onClick={() => selectImage(index)}
                        >
                          <img
                            src={image}
                            alt={`${selectedProduct.name} - Fotoğraf ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Ürün Detayları */}
                <div className="space-y-6">
                  {/* Fiyat */}
                  <div>
                    {selectedProduct.isSale ? (
                      <div className="space-y-2">
                        <span className="text-3xl font-bold text-gray-900">
                          {selectedProduct.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                          {selectedProduct.originalPrice?.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                        </span>
                        <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                          İndirimli
                        </div>
                      </div>
                    ) : (
                      <span className="text-3xl font-bold text-gray-900">
                        {selectedProduct.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                      </span>
                    )}
                  </div>

                  {/* Değerlendirme */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <span className="text-yellow-400 text-lg">★</span>
                      <span className="text-lg text-gray-600 ml-1">{selectedProduct.rating}</span>
                      <span className="text-gray-400 ml-1">({selectedProduct.reviews} değerlendirme)</span>
                    </div>
                  </div>

                  {/* Ürün Özellikleri */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Ürün Özellikleri</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kategori:</span>
                        <span className="text-gray-900">{selectedProduct.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Materyal:</span>
                        <span className="text-gray-900">Deri / Sentetik</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bakım:</span>
                        <span className="text-gray-900">Nemli bezle silme</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Renk:</span>
                        <span className="text-gray-900">Çoklu renk seçeneği</span>
                      </div>
                    </div>
                  </div>

                  {/* Beden ve Renk Seçimi */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Beden</label>
                      <div className="flex space-x-2">
                        {['39', '40', '41', '42', '43', '44', '45'].map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-3 py-2 border rounded-lg text-sm font-medium ${
                              selectedSize === size
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-300 text-gray-700 hover:border-gray-400'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Renk</label>
                      <div className="flex space-x-2">
                        {['Siyah', 'Beyaz', 'Kahverengi', 'Gri'].map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-3 py-2 border rounded-lg text-sm font-medium ${
                              selectedColor === color
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-300 text-gray-700 hover:border-gray-400'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sepete Ekle Butonu */}
                  <button
                    onClick={() => handleAddToCart(selectedProduct, selectedSize, selectedColor)}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg font-medium"
                  >
                    Sepete Ekle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sepet */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
} 