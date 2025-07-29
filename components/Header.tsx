'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  onCartClick: () => void
  cartItemCount: number
}

interface User {
  email: string
  name: string
  isLoggedIn: boolean
}

// Tüm ürünler
const allProducts = [
  // Erkek ürünleri
  { id: '1', name: 'Premium Pamuklu T-Shirt', category: 'Erkek', price: 89.99, image: '/images/placeholder.svg' },
  { id: '2', name: 'Slim Fit Kot Pantolon', category: 'Erkek', price: 199.99, image: '/images/placeholder.svg' },
  { id: '3', name: 'Deri Ceket', category: 'Erkek', price: 899.99, image: '/images/placeholder.svg' },
  { id: '4', name: 'Spor Ayakkabı', category: 'Erkek', price: 299.99, image: '/images/placeholder.svg' },
  { id: '5', name: 'Gömlek', category: 'Erkek', price: 149.99, image: '/images/placeholder.svg' },
  { id: '6', name: 'Spor Şort', category: 'Erkek', price: 79.99, image: '/images/placeholder.svg' },
  { id: '7', name: 'Kot Ceket', category: 'Erkek', price: 399.99, image: '/images/placeholder.svg' },
  { id: '8', name: 'Formal Pantolon', category: 'Erkek', price: 249.99, image: '/images/placeholder.svg' },
  { id: '9', name: 'Polo T-Shirt', category: 'Erkek', price: 119.99, image: '/images/placeholder.svg' },
  { id: '10', name: 'Spor Mont', category: 'Erkek', price: 599.99, image: '/images/placeholder.svg' },
  
  // Kadın ürünleri
  { id: '11', name: 'Kadın Elbise', category: 'Kadın', price: 299.99, image: '/images/placeholder.svg' },
  { id: '12', name: 'Kadın Bluz', category: 'Kadın', price: 129.99, image: '/images/placeholder.svg' },
  { id: '13', name: 'Kadın Pantolon', category: 'Kadın', price: 179.99, image: '/images/placeholder.svg' },
  { id: '14', name: 'Kadın Ceket', category: 'Kadın', price: 399.99, image: '/images/placeholder.svg' },
  { id: '15', name: 'Kadın T-Shirt', category: 'Kadın', price: 89.99, image: '/images/placeholder.svg' },
  { id: '16', name: 'Kadın Etek', category: 'Kadın', price: 159.99, image: '/images/placeholder.svg' },
  { id: '17', name: 'Kadın Mont', category: 'Kadın', price: 499.99, image: '/images/placeholder.svg' },
  { id: '18', name: 'Kadın Tunik', category: 'Kadın', price: 199.99, image: '/images/placeholder.svg' },
  { id: '19', name: 'Kadın Şort', category: 'Kadın', price: 99.99, image: '/images/placeholder.svg' },
  { id: '20', name: 'Kadın Gömlek', category: 'Kadın', price: 169.99, image: '/images/placeholder.svg' },
  
  // Çocuk ürünleri
  { id: '21', name: 'Çocuk T-Shirt', category: 'Çocuk', price: 49.99, image: '/images/placeholder.svg' },
  { id: '22', name: 'Çocuk Pantolon', category: 'Çocuk', price: 89.99, image: '/images/placeholder.svg' },
  { id: '23', name: 'Çocuk Elbise', category: 'Çocuk', price: 119.99, image: '/images/placeholder.svg' },
  { id: '24', name: 'Çocuk Mont', category: 'Çocuk', price: 199.99, image: '/images/placeholder.svg' },
  { id: '25', name: 'Çocuk Şort', category: 'Çocuk', price: 59.99, image: '/images/placeholder.svg' },
  { id: '26', name: 'Çocuk Ceket', category: 'Çocuk', price: 149.99, image: '/images/placeholder.svg' },
  { id: '27', name: 'Çocuk Bluz', category: 'Çocuk', price: 79.99, image: '/images/placeholder.svg' },
  { id: '28', name: 'Çocuk Etek', category: 'Çocuk', price: 99.99, image: '/images/placeholder.svg' },
  { id: '29', name: 'Çocuk Gömlek', category: 'Çocuk', price: 89.99, image: '/images/placeholder.svg' },
  { id: '30', name: 'Çocuk Tunik', category: 'Çocuk', price: 109.99, image: '/images/placeholder.svg' },
  
  // Ayakkabı ürünleri
  { id: '31', name: 'Spor Ayakkabı', category: 'Ayakkabı', price: 299.99, image: '/images/placeholder.svg' },
  { id: '32', name: 'Günlük Ayakkabı', category: 'Ayakkabı', price: 199.99, image: '/images/placeholder.svg' },
  { id: '33', name: 'Resmi Ayakkabı', category: 'Ayakkabı', price: 399.99, image: '/images/placeholder.svg' },
  { id: '34', name: 'Bot', category: 'Ayakkabı', price: 499.99, image: '/images/placeholder.svg' },
  { id: '35', name: 'Sandalet', category: 'Ayakkabı', price: 149.99, image: '/images/placeholder.svg' },
  { id: '36', name: 'Loafer', category: 'Ayakkabı', price: 349.99, image: '/images/placeholder.svg' },
  { id: '37', name: 'Sneaker', category: 'Ayakkabı', price: 249.99, image: '/images/placeholder.svg' },
  { id: '38', name: 'Oxford', category: 'Ayakkabı', price: 449.99, image: '/images/placeholder.svg' },
  { id: '39', name: 'Mokasen', category: 'Ayakkabı', price: 379.99, image: '/images/placeholder.svg' },
  { id: '40', name: 'Deri Ayakkabı', category: 'Ayakkabı', price: 599.99, image: '/images/placeholder.svg' },
  
  // Aksesuar ürünleri
  { id: '41', name: 'Saat', category: 'Aksesuar', price: 599.99, image: '/images/placeholder.svg' },
  { id: '42', name: 'Çanta', category: 'Aksesuar', price: 199.99, image: '/images/placeholder.svg' },
  { id: '43', name: 'Kolye', category: 'Aksesuar', price: 99.99, image: '/images/placeholder.svg' },
  { id: '44', name: 'Güneş Gözlüğü', category: 'Aksesuar', price: 149.99, image: '/images/placeholder.svg' },
  { id: '45', name: 'Kemer', category: 'Aksesuar', price: 79.99, image: '/images/placeholder.svg' },
  { id: '46', name: 'Şal', category: 'Aksesuar', price: 89.99, image: '/images/placeholder.svg' },
  { id: '47', name: 'Cüzdan', category: 'Aksesuar', price: 129.99, image: '/images/placeholder.svg' },
  { id: '48', name: 'Bilezik', category: 'Aksesuar', price: 69.99, image: '/images/placeholder.svg' },
  { id: '49', name: 'Şapka', category: 'Aksesuar', price: 119.99, image: '/images/placeholder.svg' },
  { id: '50', name: 'Eldiven', category: 'Aksesuar', price: 59.99, image: '/images/placeholder.svg' }
]

export default function Header({ onCartClick, cartItemCount }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [currentCartCount, setCurrentCartCount] = useState(cartItemCount)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [products, setProducts] = useState(allProducts)
  const [currentPath, setCurrentPath] = useState('')
  const router = useRouter()

  // Aktif sayfa yolunu takip et
  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  useEffect(() => {
    // Kullanıcı bilgilerini localStorage'dan al
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Admin panelinden gelen ürün güncellemelerini dinle
    const handleProductsUpdated = (event: CustomEvent) => {
      const updatedProducts = event.detail
      setProducts(updatedProducts)
    }

    // localStorage'dan ürünleri yükle
    const savedProducts = localStorage.getItem('products')
    if (savedProducts) {
      const adminProducts = JSON.parse(savedProducts)
      if (adminProducts.length > 0) {
        setProducts(adminProducts)
      }
    }

    window.addEventListener('productsUpdated', handleProductsUpdated as EventListener)

    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdated as EventListener)
    }
  }, [])

  // Sepet sayısını gerçek zamanlı güncelle
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        try {
          const cartItems = JSON.parse(savedCart)
          const totalItems = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0)
          setCurrentCartCount(totalItems)
        } catch (error) {
          setCurrentCartCount(0)
        }
      } else {
        setCurrentCartCount(0)
      }
    }

    // İlk yükleme
    updateCartCount()

    // Storage değişikliklerini dinle
    const handleStorageChange = () => {
      updateCartCount()
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Custom event dinle (sayfa içi güncellemeler için)
    window.addEventListener('cartUpdated', updateCartCount)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cartUpdated', updateCartCount)
    }
  }, [])

  // Arama fonksiyonu
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    const searchTermLower = searchTerm.toLowerCase().trim()
    
    const filtered = products.filter(product => {
      const nameLower = product.name.toLowerCase()
      const categoryLower = product.category.toLowerCase()
      
      // Ürün adında arama
      if (nameLower.includes(searchTermLower)) {
        return true
      }
      
      // Kategoride arama
      if (categoryLower.includes(searchTermLower)) {
        return true
      }
      
      // Kısmi kelime araması - ürün adındaki her kelimeyi kontrol et
      const nameWords = nameLower.split(' ')
      if (nameWords.some(word => word.includes(searchTermLower))) {
        return true
      }
      
      // Kısmi kelime araması - kategorideki her kelimeyi kontrol et
      const categoryWords = categoryLower.split(' ')
      if (categoryWords.some(word => word.includes(searchTermLower))) {
        return true
      }
      
      return false
    })

    setSearchResults(filtered)
    setShowSearchResults(true)
  }, [searchTerm, products])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setIsProfileOpen(false)
    router.push('/')
  }

  const handleSearchClick = (product: any) => {
    setSearchTerm('')
    setShowSearchResults(false)
    setIsSearchOpen(false)
    
    // Ürünün kategorisine göre yönlendir
    const categoryMap: { [key: string]: string } = {
      'Erkek': '/erkek',
      'Kadın': '/kadin',
      'Çocuk': '/cocuk',
      'Ayakkabı': '/ayakkabi',
      'Aksesuar': '/aksesuar'
    }
    
    const targetPage = categoryMap[product.category]
    if (targetPage) {
      router.push(targetPage)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Neomedya
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`transition-colors font-medium ${
                currentPath === '/' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Ana Sayfa
            </Link>
            <Link 
              href="/erkek" 
              className={`transition-colors font-medium ${
                currentPath === '/erkek' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Erkek
            </Link>
            <Link 
              href="/kadin" 
              className={`transition-colors font-medium ${
                currentPath === '/kadin' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Kadın
            </Link>
            <Link 
              href="/cocuk" 
              className={`transition-colors font-medium ${
                currentPath === '/cocuk' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Çocuk
            </Link>
            <Link 
              href="/ayakkabi" 
              className={`transition-colors font-medium ${
                currentPath === '/ayakkabi' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Ayakkabı
            </Link>
            <Link 
              href="/aksesuar" 
              className={`transition-colors font-medium ${
                currentPath === '/aksesuar' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Aksesuar
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen)
              }}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {currentCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {currentCartCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100"
              >
                {user ? (
                  <>
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden md:block text-sm font-medium">{user.name}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="hidden md:block text-sm font-medium">Giriş Yap</span>
                  </>
                )}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        href="/profilim"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profilim
                      </Link>
                      <Link
                        href="/siparislerim"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Siparişlerim
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Çıkış Yap
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/giris"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Giriş Yap
                      </Link>
                      <Link
                        href="/kayit"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Kayıt Ol
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="space-y-2">
              <Link 
                href="/" 
                className={`block px-4 py-2 rounded-lg ${
                  currentPath === '/' 
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Ana Sayfa
              </Link>
              <Link 
                href="/erkek" 
                className={`block px-4 py-2 rounded-lg ${
                  currentPath === '/erkek' 
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Erkek
              </Link>
              <Link 
                href="/kadin" 
                className={`block px-4 py-2 rounded-lg ${
                  currentPath === '/kadin' 
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Kadın
              </Link>
              <Link 
                href="/cocuk" 
                className={`block px-4 py-2 rounded-lg ${
                  currentPath === '/cocuk' 
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Çocuk
              </Link>
              <Link 
                href="/ayakkabi" 
                className={`block px-4 py-2 rounded-lg ${
                  currentPath === '/ayakkabi' 
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Ayakkabı
              </Link>
              <Link 
                href="/aksesuar" 
                className={`block px-4 py-2 rounded-lg ${
                  currentPath === '/aksesuar' 
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Aksesuar
              </Link>
            </nav>
          </div>
        )}

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-gray-200 py-4 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Ürün ara... (örn: t-shirt, elbise, ayakkabı, erkek, kadın, çocuk, ceket, pantolon)"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                }}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onFocus={() => {
                  setShowSearchResults(true)
                }}
              />
              <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Search Results Count */}
            {searchTerm && (
              <div className="mt-2 text-sm text-gray-600">
                <p>"{searchTerm}" için {searchResults.length} sonuç bulundu</p>
                <p className="text-xs text-gray-500 mt-1">Toplam {products.length} ürün arasından arama yapılıyor</p>
              </div>
            )}

            {/* Search Results */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-96 overflow-y-auto">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      handleSearchClick(product)
                    }}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                      <p className="text-sm font-medium text-blue-600">
                        {product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* No Results */}
            {showSearchResults && searchTerm && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 p-4">
                <p className="text-gray-500 text-center">"{searchTerm}" için sonuç bulunamadı</p>
                <p className="text-sm text-gray-400 text-center mt-1">Farklı bir arama terimi deneyin</p>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
} 