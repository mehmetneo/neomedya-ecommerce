'use client'

import { motion } from 'framer-motion'
import { categories } from '@/data/products'
import { ArrowRight } from 'lucide-react'

export default function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
            Kategorileri Keşfet
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Her tarz ve yaş grubu için özel olarak tasarlanmış koleksiyonlarımızı keşfedin
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary-50 to-secondary-100 p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="relative mb-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                </div>
                
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {category.name}
                </h3>
                
                <div className="flex items-center justify-center text-primary-600 group-hover:text-primary-700 transition-colors">
                  <span className="text-sm font-medium">Keşfet</span>
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">1000+</div>
            <div className="text-secondary-600">Ürün Çeşidi</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">50+</div>
            <div className="text-secondary-600">Marka</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">24/7</div>
            <div className="text-secondary-600">Müşteri Desteği</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">%100</div>
            <div className="text-secondary-600">Güvenli Alışveriş</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 