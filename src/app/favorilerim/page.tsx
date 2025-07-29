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
    try {
      const savedUser = localStorage.getItem('neomedyauser')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      
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
    } catch (error) {
      console.log('localStorage erişim hatası:', error)
    }
  }, [])

  const removeFromWishlist = (itemId: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId))
  }

  const addToCart = (item: WishlistItem) => {
    try {
      const savedCart = localStorage.getItem('neomedyacart')
      const cart = savedCart ? JSON.parse(savedCart) : []
      
      const existingItem = cart.find((cartItem: any) => cartItem.id === item.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        cart.push({ ...item, quantity: 1 })
      }
      
      localStorage.setItem('neomedyacart', JSON.stringify(cart))
      alert('Ürün sepete eklendi!')
    } catch (error) {
      console.log('Sepete ekleme hatası:', error)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <Heart className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-4 text-lg font-medium text-gray-900">Giriş Yapın</h2>
            <p className="mt-2 text-gray-600">Favorilerinizi görüntülemek için giriş yapın.</p>
            <Link 
              href="/profil"
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Favorilerim</h1>
              <p className="text-gray-600">{wishlistItems.length} ürün</p>
            </div>
          </div>
        </div>

        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Favori ürününüz yok</h3>
            <p className="mt-2 text-gray-600">Beğendiğiniz ürünleri favorilere ekleyin.</p>
            <Link 
              href="/giyim"
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                {/* Product Image */}
                <div className="aspect-square bg-gray-100 flex items-center justify-center text-4xl">
                  {item.image}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">{item.brand}</p>
                    </div>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">₺{item.price}</span>
                    {item.originalPrice > item.price && (
                      <span className="text-sm text-gray-500 line-through">₺{item.originalPrice}</span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(item.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">({item.reviewCount})</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => addToCart(item)}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Sepete Ekle
                    </button>
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <Eye className="h-4 w-4" />
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