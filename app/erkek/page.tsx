'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Cart from '@/components/Cart'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  rating: number
  reviews: number
  isSale?: boolean
  category: string
  description?: string
  stock?: number
  status?: string
}

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
}

export default function ErkekPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('Beyaz')

  // Ürünleri API'den çek
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/products?category=erkek')
      const data = await response.json()
      
      if (data.success) {
        // Ürünleri erkek sayfası için formatla
        const formattedProducts = data.products.map((product: any) => ({
          ...product,
          rating: Math.floor(Math.random() * 2) + 4, // 4-5 arası rastgele rating
          reviews: Math.floor(Math.random() * 100) + 20, // 20-120 arası rastgele yorum
          isSale: product.originalPrice && product.originalPrice > product.price,
          images: product.images || [product.image]
        }))
        setProducts(formattedProducts)
      } else {
        setError('Ürünler yüklenemedi')
      }
    } catch (err) {
      setError('Ürünler yüklenirken hata oluştu')
      console.error('Ürün yükleme hatası:', err)
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
      console.log('🔄 Ürünler güncellendi, sayfa yenileniyor...')
      fetchProducts()
    }

    window.addEventListener('productsUpdated' as any, handleProductsUpdated)
    
    return () => {
      window.removeEventListener('productsUpdated' as any, handleProductsUpdated)
    }
  }, [])

  // Sepet güncellemelerini dinle
  useEffect(() => {
    const handleCartUpdated = () => {
      updateCartCount()
    }

    window.addEventListener('cartUpdated', handleCartUpdated)
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdated)
    }
  }, [])

  const updateCartCount = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(existingCart)
  }

  useEffect(() => {
    updateCartCount()
  }, [])

  const handleAddToCart = (product: any, size: string = 'M', color: string = 'Beyaz') => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    const existingItemIndex = existingCart.findIndex((item: CartItem) => 
      item.id === product.id && item.size === size && item.color === color
    )

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1
    } else {
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size,
        color,
        quantity: 1
      })
    }

    localStorage.setItem('cart', JSON.stringify(existingCart))
    setCartItems(existingCart)
    
    // Sepet güncelleme eventi gönder
    window.dispatchEvent(new Event('cartUpdated'))
    
    console.log('✅ Ürün sepete eklendi:', product.name)
  }

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setCurrentImageIndex(0)
    setIsProductModalOpen(true)
  }

  const openProductModal = (product: any) => {
    setSelectedProduct(product)
    setCurrentImageIndex(0)
    setIsProductModalOpen(true)
  }

  const closeProductModal = () => {
    setIsProductModalOpen(false)
    setSelectedProduct(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProduct && selectedProduct.images) {
      setCurrentImageIndex((prev) => 
        prev === selectedProduct.images!.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedProduct && selectedProduct.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProduct.images!.length - 1 : prev - 1
      )
    }
  }

  const selectImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Ürünler yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={fetchProducts}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Erkek Kategorisi</h1>
          <p className="text-xl opacity-90">
            Erkekler için modern ve şık ürünler
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Bu kategoride henüz ürün bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  {product.isSale && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                      İndirim
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.category}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-blue-600">
                        ₺{product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through">
                          ₺{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-gray-600">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(product)
                    }}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
                  >
                    Sepete Ekle
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Modal */}
      {isProductModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <button 
                  onClick={closeProductModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Gallery */}
                <div className="relative">
                  <img 
                    src={selectedProduct.images?.[currentImageIndex] || selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  
                  {selectedProduct.images && selectedProduct.images.length > 1 && (
                    <>
                      <button 
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100"
                      >
                        ←
                      </button>
                      <button 
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100"
                      >
                        →
                      </button>
                      
                      <div className="flex space-x-2 mt-4">
                        {selectedProduct.images.map((image: string, index: number) => (
                          <button
                            key={index}
                            onClick={() => selectImage(index)}
                            className={`w-16 h-16 rounded border-2 ${
                              index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'
                            }`}
                          >
                            <img 
                              src={image} 
                              alt={`${selectedProduct.name} ${index + 1}`}
                              className="w-full h-full object-cover rounded"
                            />
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                {/* Product Details */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">{selectedProduct.name}</h3>
                    <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-3xl font-bold text-blue-600">
                        ₺{selectedProduct.price.toFixed(2)}
                      </span>
                      {selectedProduct.originalPrice && (
                        <span className="text-xl text-gray-400 line-through">
                          ₺{selectedProduct.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-yellow-500">★</span>
                      <span className="font-semibold">{selectedProduct.rating}</span>
                      <span className="text-gray-600">({selectedProduct.reviews} değerlendirme)</span>
                    </div>
                  </div>
                  
                  {/* Size Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Beden
                    </label>
                    <div className="flex space-x-2">
                      {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1 rounded border ${
                            selectedSize === size 
                              ? 'border-blue-500 bg-blue-50 text-blue-600' 
                              : 'border-gray-300 text-gray-700'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Color Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Renk
                    </label>
                    <div className="flex space-x-2">
                      {['Beyaz', 'Siyah', 'Mavi', 'Kırmızı', 'Gri'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1 rounded border ${
                            selectedColor === color 
                              ? 'border-blue-500 bg-blue-50 text-blue-600' 
                              : 'border-gray-300 text-gray-700'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      handleAddToCart(selectedProduct, selectedSize, selectedColor)
                      closeProductModal()
                    }}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
                  >
                    Sepete Ekle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  )
} 