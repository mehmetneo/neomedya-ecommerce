'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react'
import { getFeaturedProducts } from '@/data/products'
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'

export default function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const { addItem } = useCartStore()
  const products = getFeaturedProducts()

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[0],
      color: product.colors[0],
    })
    toast.success(`${product.name} sepete eklendi!`)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-secondary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
            Öne Çıkan Ürünler
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            En popüler ve trend ürünlerimizi keşfedin. Kalite ve stil bir arada.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="card overflow-hidden">
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Yeni
                      </span>
                    )}
                    {product.isSale && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        İndirim
                      </span>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${
                    hoveredProduct === product.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}>
                    <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors">
                      <Heart size={16} />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors">
                      <Eye size={16} />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
                    hoveredProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Sepete Ekle
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-secondary-600">{product.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-secondary-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {product.originalPrice && (
                        <span className="text-sm text-secondary-400 line-through">
                          ₺{product.originalPrice}
                        </span>
                      )}
                      <span className="text-lg font-bold text-primary-600">
                        ₺{product.price}
                      </span>
                    </div>
                    
                    <div className="text-xs text-secondary-500">
                      {product.reviews} değerlendirme
                    </div>
                  </div>

                  {/* Color Options */}
                  <div className="mt-4">
                    <div className="flex gap-2">
                      {product.colors.slice(0, 4).map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm cursor-pointer hover:scale-110 transition-transform"
                          style={{
                            backgroundColor: color === 'Beyaz' ? '#ffffff' :
                                           color === 'Siyah' ? '#000000' :
                                           color === 'Gri' ? '#6b7280' :
                                           color === 'Mavi' ? '#3b82f6' :
                                           color === 'Pembe' ? '#ec4899' :
                                           color === 'Kahverengi' ? '#8b4513' :
                                           color === 'Çiçekli' ? '#fbbf24' :
                                           color === 'Çok Renkli' ? '#8b5cf6' : '#e5e7eb'
                          }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="btn-primary">
            Tüm Ürünleri Gör
          </button>
        </motion.div>
      </div>
    </section>
  )
} 