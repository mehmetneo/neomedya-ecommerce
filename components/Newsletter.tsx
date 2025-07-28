'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, Gift, Tag, Truck } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast.success('Bültenimize başarıyla abone oldunuz!')
      setEmail('')
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium"
              >
                <Gift className="w-4 h-4 mr-2" />
                Özel İndirimler
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-3xl lg:text-4xl font-bold text-white leading-tight"
              >
                Özel Fırsatları Kaçırma!
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-lg text-white/90 max-w-lg"
              >
                Bültenimize abone ol ve en yeni ürünler, özel indirimler ve 
                kampanyalardan ilk sen haberdar ol!
              </motion.p>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  className="w-full pl-12 pr-4 py-4 border-0 rounded-lg focus:ring-2 focus:ring-white focus:ring-opacity-50 bg-white/90 backdrop-blur-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-white text-primary-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Abone Ol
              </button>
            </motion.form>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white"
              >
                <Tag className="w-8 h-8 mb-4 text-primary-200" />
                <h3 className="font-semibold mb-2">Özel İndirimler</h3>
                <p className="text-white/80 text-sm">
                  Abonelerimize özel %20'ye varan indirimler
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white"
              >
                <Truck className="w-8 h-8 mb-4 text-primary-200" />
                <h3 className="font-semibold mb-2">Ücretsiz Kargo</h3>
                <p className="text-white/80 text-sm">
                  150₺ üzeri alışverişlerde ücretsiz kargo
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white"
              >
                <Gift className="w-8 h-8 mb-4 text-primary-200" />
                <h3 className="font-semibold mb-2">Hediye Kartı</h3>
                <p className="text-white/80 text-sm">
                  İlk aboneliğinizde 50₺ hediye kartı
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white"
              >
                <Mail className="w-8 h-8 mb-4 text-primary-200" />
                <h3 className="font-semibold mb-2">Erken Erişim</h3>
                <p className="text-white/80 text-sm">
                  Yeni koleksiyonlardan ilk sen haberdar ol
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 