'use client'

import Link from 'next/link'

const categories = [
  {
    name: 'Erkek',
    href: '/erkek',
    description: 'Erkek kıyafetleri',
    color: 'from-blue-500 to-blue-600',
    emoji: '👔'
  },
  {
    name: 'Kadın',
    href: '/kadin',
    description: 'Kadın kıyafetleri',
    color: 'from-pink-500 to-pink-600',
    emoji: '👗'
  },
  {
    name: 'Çocuk',
    href: '/cocuk',
    description: 'Çocuk kıyafetleri',
    color: 'from-green-500 to-green-600',
    emoji: '👶'
  },
  {
    name: 'Ayakkabı',
    href: '/ayakkabi',
    description: 'Ayakkabı koleksiyonu',
    color: 'from-purple-500 to-purple-600',
    emoji: '👟'
  },
  {
    name: 'Aksesuar',
    href: '/aksesuar',
    description: 'Aksesuar ürünleri',
    color: 'from-orange-500 to-orange-600',
    emoji: '💍'
  }
]

export default function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Kategoriler</h2>
          <p className="text-lg text-gray-600">İhtiyacınız olan her şey burada</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.name}
              href={category.href}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative h-64">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">
                      {category.emoji}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 