'use client'

import { useState, useEffect } from 'react'
import AddProductModal from './components/AddProductModal'
import EditProductModal from './components/EditProductModal'

interface Product {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  stock: number
  status: 'active' | 'inactive'
  image: string
  description: string
  createdAt: string
  salesCount: number
  images?: string[]
  sizes?: string[]
  colors?: string[]
  tags?: string[]
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [uploading, setUploading] = useState(false)

  // Ürünleri yükle
  const loadProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/products')
      const data = await response.json()

      if (data.success) {
        setProducts(data.products)
        console.log('✅ Ürünler yüklendi:', data.products.length)
      } else {
        console.error('❌ Ürünler yüklenemedi:', data.error)
      }
    } catch (error) {
      console.error('❌ Ürün yükleme hatası:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const toggleProductStatus = async (productId: string) => {
    try {
      const product = products.find(p => p.id === productId)
      if (!product) return

      const response = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: productId,
          status: product.status === 'active' ? 'inactive' : 'active'
        })
      })

      const data = await response.json()
      if (data.success) {
        await loadProducts()
      }
    } catch (error) {
      console.error('❌ Ürün durumu güncelleme hatası:', error)
    }
  }

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true)
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      if (data.success) {
        return data.url
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('❌ Dosya yükleme hatası:', error)
      alert('Dosya yüklenemedi: ' + error)
      return null
    } finally {
      setUploading(false)
    }
  }

  const categories = [
    { id: 'all', name: 'Tüm Kategoriler' },
    { id: 'erkek', name: 'Erkek' },
    { id: 'kadin', name: 'Kadın' },
    { id: 'cocuk', name: 'Çocuk' },
    { id: 'ayakkabi', name: 'Ayakkabı' },
    { id: 'aksesuar', name: 'Aksesuar' }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ürün Yönetimi</h2>
          <p className="text-gray-600">Tüm ürünleri görüntüleyin ve yönetin</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Yeni Ürün
        </button>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-lg">🛍️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Toplam Ürün</p>
              <p className="text-xl font-bold text-gray-900">{products.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-lg">✅</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Aktif Ürün</p>
              <p className="text-xl font-bold text-gray-900">{products.filter(p => p.status === 'active').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-yellow-600 text-lg">📦</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Toplam Stok</p>
              <p className="text-xl font-bold text-gray-900">{products.reduce((sum, product) => sum + product.stock, 0)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-lg">💰</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Toplam Satış</p>
              <p className="text-xl font-bold text-gray-900">{products.reduce((sum, product) => sum + product.salesCount, 0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtreler */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Arama</label>
            <input
              type="text"
              placeholder="Ürün adı veya açıklama..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tümü</option>
              <option value="active">Aktif</option>
              <option value="inactive">Pasif</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ürün Listesi */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ürün
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fiyat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stok
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Satış
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-lg">🛍️</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.category === 'erkek' ? 'bg-blue-100 text-blue-800' :
                      product.category === 'kadin' ? 'bg-pink-100 text-pink-800' :
                      product.category === 'cocuk' ? 'bg-green-100 text-green-800' :
                      product.category === 'ayakkabi' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {categories.find(c => c.id === product.category)?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₺{product.price.toFixed(2)}</div>
                    {product.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">₺{product.originalPrice.toFixed(2)}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      product.stock === 0 ? 'text-red-600' : 
                      product.stock < 10 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {product.stock} adet
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.salesCount} satış
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedProduct(product)
                          setShowEditModal(true)
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Düzenle
                      </button>
                      <button 
                        onClick={() => toggleProductStatus(product.id)}
                        className={`${
                          product.status === 'active' 
                            ? 'text-red-600 hover:text-red-900' 
                            : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {product.status === 'active' ? 'Pasifleştir' : 'Aktifleştir'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-6xl mb-4">🛍️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ürün Bulunamadı</h3>
          <p className="text-gray-500">Arama kriterlerinize uygun ürün bulunamadı.</p>
        </div>
      )}

      {/* Yeni Ürün Ekleme Modal */}
      {showAddModal && (
        <AddProductModal 
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false)
            loadProducts()
          }}
          onFileUpload={handleFileUpload}
          uploading={uploading}
        />
      )}

      {/* Ürün Düzenleme Modal */}
      {showEditModal && selectedProduct && (
        <EditProductModal 
          product={selectedProduct}
          onClose={() => {
            setShowEditModal(false)
            setSelectedProduct(null)
          }}
          onSuccess={() => {
            setShowEditModal(false)
            setSelectedProduct(null)
            loadProducts()
          }}
          onFileUpload={handleFileUpload}
          uploading={uploading}
        />
      )}
    </div>
  )
} 