'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
}

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Sepet açıldığında localStorage'dan veri oku
  useEffect(() => {
    if (isOpen) {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        try {
          const cartItems = JSON.parse(savedCart)
          setItems(cartItems)
        } catch (error) {
          console.error('Sepet verisi okunamadı:', error)
          setItems([])
        }
      } else {
        setItems([])
      }
    }
  }, [isOpen])

  const updateCart = (newItems: CartItem[]) => {
    setItems(newItems)
    localStorage.setItem('cart', JSON.stringify(newItems))
    // Sepet güncelleme event'ini tetikle
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    const updatedItems = items.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    )
    updateCart(updatedItems)
  }

  const removeItem = (itemId: string) => {
    const updatedItems = items.filter(item => item.id !== itemId)
    updateCart(updatedItems)
  }

  const clearCart = () => {
    updateCart([])
  }

  const handleCheckout = () => {
    setIsLoading(true)
    
    // Sepet verilerini localStorage'a kaydet
    localStorage.setItem('checkoutItems', JSON.stringify(items))
    
    setTimeout(() => {
      setIsLoading(false)
      onClose()
      router.push('/odeme')
    }, 1000)
  }

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shippingThreshold = 150
  const shippingCost = total >= shippingThreshold ? 0 : 29.99
  const finalTotal = total + shippingCost

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40"
      />

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900">
              Sepetim ({items.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Sepetiniz Boş
              </h3>
              <p className="text-gray-600 mb-6">
                Alışverişe başlamak için ürünlerimizi keşfedin
              </p>
              <button
                onClick={onClose}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Alışverişe Başla
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.color} • {item.size}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold text-blue-600">
                        ₺{item.price}
                      </span>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Ara Toplam</span>
              <span className="font-medium">₺{total.toFixed(2)}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Kargo</span>
              <span className="font-medium">
                {shippingCost === 0 ? 'Ücretsiz' : `₺${shippingCost.toFixed(2)}`}
              </span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="text-lg font-semibold text-gray-900">
                Toplam
              </span>
              <span className="text-2xl font-bold text-blue-600">
                ₺{finalTotal.toFixed(2)}
              </span>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button 
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Yönlendiriliyor...
                  </>
                ) : (
                  'Sepeti Onayla'
                )}
              </button>
              <button 
                onClick={clearCart}
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Sepeti Temizle
              </button>
            </div>

            {/* Shipping Info */}
            <div className="text-center text-sm text-gray-600">
              {total < shippingThreshold ? (
                <p>₺{shippingThreshold} üzeri alışverişlerde ücretsiz kargo</p>
              ) : (
                <p className="text-green-600">✓ Ücretsiz kargo kazandınız!</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
} 