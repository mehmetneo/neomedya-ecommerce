'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Heart, 
  Trash2, 
  ShoppingCart, 
  Eye,
  Star
} from 'lucide-react'

interface WishlistItem {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  brand: string
  category: string
  rating: number
  reviewCount: number
}

const Favorilerim = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkUserStatus = () => {
      try {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.log('localStorage erişim hatası:', error)
      }
    }

    checkUserStatus()
    
    // localStorage değişikliklerini dinle
    const handleStorageChange = () => {
      checkUserStatus()
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Demo favori ürünler
    const demoWishlist: WishlistItem[] = [
      {
        id: 1,
        name: 'Nike Air Max 270',
        price: 1299,
        originalPrice: 1599,
        image: '👟',
        brand: 'Nike',
        category: 'Spor Ayakkabı',
        rating: 4.5,
        reviewCount: 128
      },
      {
        id: 2,
        name: 'Adidas T-Shirt',
        price: 299,
        originalPrice: 399,
        image: '👕',
        brand: 'Adidas',
        category: 'T-Shirt',
        rating: 4.2,
        reviewCount: 89
      },
      {
        id: 3,
        name: 'Levi\'s Jeans',
        price: 600,
        originalPrice: 800,
        image: '👖',
        brand: 'Levi\'s',
        category: 'Kot Pantolon',
        rating: 4.7,
        reviewCount: 156
      },
      {
        id: 4,
        name: 'Zara Dress',
        price: 1599,
        originalPrice: 1999,
        image: '👗',
        brand: 'Zara',
        category: 'Elbise',
        rating: 4.3,
        reviewCount: 67
      }
    ]
    setWishlistItems(demoWishlist)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const removeFromWishlist = (itemId: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId))
  }

  const addToCart = (item: WishlistItem) => {
    try {
      const savedCart = localStorage.getItem('cart')
      const cart = savedCart ? JSON.parse(savedCart) : []
      
      const existingItem = cart.find((cartItem: any) => cartItem.id === item.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        cart.push({
          ...item,
          quantity: 1
        })
      }
      
      localStorage.setItem('cart', JSON.stringify(cart))
      alert(`${item.name} sepete eklendi!`)
    } catch (error) {
      console.log('Sepete ekleme hatası:', error)
      alert('Sepete eklenirken bir hata oluştu!')
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Giriş Yapmanız Gerekiyor</h2>
          <p className="text-gray-600 mb-6">Favorilerinizi görüntülemek için giriş yapın.</p>
          <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Favorilerim</h1>
              <span className="bg-pink-100 text-pink-800 text-sm px-2 py-1 rounded-full">
                {wishlistItems.length} ürün
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Favori Ürününüz Yok</h2>
            <p className="text-gray-600 mb-8">Beğendiğiniz ürünleri favorilere ekleyerek buradan takip edebilirsiniz.</p>
            <Link 
              href="/giyim" 
              className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  {/* Ürün Resmi */}
                  <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-4xl">{item.image}</span>
                  </div>
                  
                  {/* Ürün Bilgileri */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.brand} • {item.category}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({item.reviewCount})</span>
                    </div>
                    
                    {/* Fiyat */}
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">
                        ₺{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-sm text-gray-500 line-through">
                          ₺{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    {/* İndirim */}
                    {item.originalPrice > item.price && (
                      <span className="inline-block bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-semibold">
                        %{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)} İndirim
                      </span>
                    )}
                  </div>
                  
                  {/* Aksiyon Butonları */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => addToCart(item)}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Sepete Ekle
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Favorilerden Kaldır"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorilerim 