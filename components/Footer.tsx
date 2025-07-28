'use client'

import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-secondary-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="text-2xl font-bold text-gradient">
              Elegance
            </div>
            <p className="text-secondary-300 leading-relaxed">
              En trend ve kaliteli giyim ürünleri ile tarzınızı yansıtın. 
              Erkek, kadın ve çocuk kıyafetleri için en iyi seçenekler.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-secondary-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold">Hızlı Linkler</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Ana Sayfa</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Hakkımızda</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Ürünler</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Kampanyalar</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">İletişim</a></li>
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold">Kategoriler</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Erkek Giyim</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Kadın Giyim</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Çocuk Giyim</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Ayakkabı</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Aksesuar</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Spor Giyim</a></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold">İletişim</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span className="text-secondary-300">
                  İstanbul, Türkiye
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <span className="text-secondary-300">
                  +90 (212) 555 0123
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <span className="text-secondary-300">
                  info@elegance.com
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-secondary-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-secondary-400 text-sm">
              © 2024 Elegance. Tüm hakları saklıdır.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-secondary-400 hover:text-white transition-colors">
                Gizlilik Politikası
              </a>
              <a href="#" className="text-secondary-400 hover:text-white transition-colors">
                Kullanım Şartları
              </a>
              <a href="#" className="text-secondary-400 hover:text-white transition-colors">
                KVKK
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors flex items-center justify-center z-50"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  )
} 