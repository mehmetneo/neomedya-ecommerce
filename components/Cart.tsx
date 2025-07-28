'use client'

import { useState } from 'react'

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const [items] = useState([
    {
      id: '1',
      name: 'Premium Pamuklu T-Shirt',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop',
      size: 'M',
      color: 'Beyaz',
      quantity: 1
    }
  ])

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

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
        <div className="flex items-center justify-between p-6 border-b border-secondary-200">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-xl font-semibold text-secondary-900">
              Sepetim ({items.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary-100 rounded-full transition-colors"
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
              <svg className="w-16 h-16 text-secondary-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h3 className="text-lg font-medium text-secondary-900 mb-2">
                Sepetiniz Boş
              </h3>
              <p className="text-secondary-600 mb-6">
                Alışverişe başlamak için ürünlerimizi keşfedin
              </p>
              <button
                onClick={onClose}
                className="btn-primary"
              >
                Alışverişe Başla
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex space-x-4 p-4 bg-secondary-50 rounded-lg">
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
                    <h3 className="font-medium text-secondary-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-secondary-600">
                      {item.color} • {item.size}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold text-primary-600">
                        ₺{item.price}
                      </span>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button className="w-8 h-8 rounded-full bg-white border border-secondary-200 flex items-center justify-center hover:bg-secondary-100 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button className="w-8 h-8 rounded-full bg-white border border-secondary-200 flex items-center justify-center hover:bg-secondary-100 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button className="flex-shrink-0 p-2 text-secondary-400 hover:text-red-500 transition-colors">
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
          <div className="border-t border-secondary-200 p-6 space-y-4">
            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-secondary-900">
                Toplam
              </span>
              <span className="text-2xl font-bold text-primary-600">
                ₺{total.toFixed(2)}
              </span>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button className="w-full btn-primary">
                Siparişi Tamamla
              </button>
              <button className="w-full btn-secondary">
                Sepeti Temizle
              </button>
            </div>

            {/* Shipping Info */}
            <div className="text-center text-sm text-secondary-600">
              <p>150₺ üzeri alışverişlerde ücretsiz kargo</p>
              <p className="mt-1">Kalan: ₺{(150 - total).toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
} 