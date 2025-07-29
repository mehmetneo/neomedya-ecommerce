'use client'

import { useState, useEffect } from 'react'
import { X, Trash2, Plus, Minus } from 'lucide-react'

interface CartProps {
  isOpen: boolean
  onClose: () => void
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

export default function Cart({ isOpen, onClose }: CartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart))
        } catch (error) {
          setCartItems([])
        }
      }
    }
  }, [isOpen])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setIsUpdating(true)
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    setCartItems(updatedItems)
    localStorage.setItem('cart', JSON.stringify(updatedItems))
    window.dispatchEvent(new CustomEvent('cartUpdated'))
    setIsUpdating(false)
  }

  const removeItem = (id: string) => {
    setIsUpdating(true)
    const updatedItems = cartItems.filter(item => item.id !== id)
    setCartItems(updatedItems)
    localStorage.setItem('cart', JSON.stringify(updatedItems))
    window.dispatchEvent(new CustomEvent('cartUpdated'))
    setIsUpdating(false)
  }

  const clearCart = () => {
    setIsUpdating(true)
    setCartItems([])
    localStorage.removeItem('cart')
    window.dispatchEvent(new CustomEvent('cartUpdated'))
    setIsUpdating(false)
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Sepetim</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sepetiniz Boş</h3>
              <p className="text-gray-500">Alışverişe başlamak için ürünlerimizi keşfedin</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {item.color} • {item.size}
                    </p>
                    <p className="text-sm font-medium text-blue-600">
                      {item.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={isUpdating}
                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={isUpdating}
                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={isUpdating}
                      className="p-1 text-red-400 hover:text-red-600 disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">
                Toplam ({totalItems} ürün)
              </span>
              <span className="text-lg font-bold text-gray-900">
                {totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
              </span>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={clearCart}
                disabled={isUpdating}
                className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Sepeti Temizle
              </button>
              <button
                onClick={() => {
                  // Burada ödeme sayfasına yönlendirme yapılabilir
                  alert('Ödeme sayfasına yönlendiriliyorsunuz...')
                }}
                disabled={isUpdating}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
              >
                Siparişi Tamamla
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
} 