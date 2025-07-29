'use client'

import { useState } from 'react'

interface AddProductModalProps {
  onClose: () => void
  onSuccess: () => void
  onFileUpload: (file: File) => Promise<string | null>
  uploading: boolean
}

export default function AddProductModal({ onClose, onSuccess, onFileUpload, uploading }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'erkek',
    price: '',
    originalPrice: '',
    stock: '',
    description: '',
    status: 'active' as 'active' | 'inactive',
    image: '',
    images: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
    tags: [] as string[]
  })

  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
          stock: parseInt(formData.stock)
        })
      })

      const data = await response.json()
      if (data.success) {
        alert('Ürün başarıyla eklendi!')
        onSuccess()
      } else {
        alert('Ürün eklenemedi: ' + data.error)
      }
    } catch (error) {
      console.error('❌ Ürün ekleme hatası:', error)
      alert('Ürün eklenirken hata oluştu')
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = await onFileUpload(file)
    if (url) {
      setFormData(prev => ({
        ...prev,
        image: url
      }))
    }
  }

  const handleMultipleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const urls: string[] = []
    for (let i = 0; i < files.length; i++) {
      const url = await onFileUpload(files[i])
      if (url) urls.push(url)
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...urls]
    }))
  }

  const categories = [
    { id: 'erkek', name: 'Erkek' },
    { id: 'kadin', name: 'Kadın' },
    { id: 'cocuk', name: 'Çocuk' },
    { id: 'ayakkabi', name: 'Ayakkabı' },
    { id: 'aksesuar', name: 'Aksesuar' }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Yeni Ürün Ekle</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ürün Adı *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ürün adını girin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fiyat (₺) *</label>
              <input
                type="number"
                required
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">İndirimli Fiyat (₺)</label>
              <input
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stok *</label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Aktif</option>
                <option value="inactive">Pasif</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ürün açıklaması"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ana Fotoğraf *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formData.image && (
              <div className="mt-2">
                <img src={formData.image} alt="Preview" className="w-20 h-20 object-cover rounded" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ek Fotoğraflar</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleMultipleImageUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formData.images.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.images.map((image, index) => (
                  <img key={index} src={image} alt={`Preview ${index + 1}`} className="w-20 h-20 object-cover rounded" />
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bedenler</label>
              <input
                type="text"
                value={formData.sizes.join(', ')}
                onChange={(e) => setFormData(prev => ({ ...prev, sizes: e.target.value.split(',').map(s => s.trim()) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="S, M, L, XL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Renkler</label>
              <input
                type="text"
                value={formData.colors.join(', ')}
                onChange={(e) => setFormData(prev => ({ ...prev, colors: e.target.value.split(',').map(s => s.trim()) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Beyaz, Mavi, Siyah"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Etiketler</label>
              <input
                type="text"
                value={formData.tags.join(', ')}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value.split(',').map(s => s.trim()) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="gömlek, erkek, klasik"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Ekleniyor...</span>
                </>
              ) : (
                <span>Ürün Ekle</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 