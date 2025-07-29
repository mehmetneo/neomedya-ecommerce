'use client'

import { useState } from 'react'

interface Settings {
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  address: string
  currency: string
  taxRate: number
  shippingCost: number
  freeShippingThreshold: number
  emailNotifications: boolean
  smsNotifications: boolean
  maintenanceMode: boolean
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    siteName: 'Neomedya E-ticaret',
    siteDescription: 'Modern ve güvenilir online alışveriş deneyimi',
    contactEmail: 'info@neomedya.com',
    contactPhone: '+90 555 123 4567',
    address: 'İstanbul, Türkiye',
    currency: 'TRY',
    taxRate: 18,
    shippingCost: 29.99,
    freeShippingThreshold: 500,
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false
  })

  const [activeTab, setActiveTab] = useState('general')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    // Simüle edilmiş kaydetme işlemi
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    alert('Ayarlar başarıyla kaydedildi!')
  }

  const handleInputChange = (key: keyof Settings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Sistem Ayarları</h2>
        <p className="text-gray-600">Site ayarlarını yapılandırın ve yönetin</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'general', name: 'Genel Ayarlar', icon: '⚙️' },
            { id: 'contact', name: 'İletişim Bilgileri', icon: '📞' },
            { id: 'payment', name: 'Ödeme Ayarları', icon: '💳' },
            { id: 'notifications', name: 'Bildirimler', icon: '🔔' },
            { id: 'security', name: 'Güvenlik', icon: '🔒' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow">
        {activeTab === 'general' && (
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Genel Ayarlar</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Adı</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleInputChange('siteName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Açıklaması</label>
                <input
                  type="text"
                  value={settings.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Para Birimi</label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="TRY">Türk Lirası (₺)</option>
                  <option value="USD">Amerikan Doları ($)</option>
                  <option value="EUR">Euro (€)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">KDV Oranı (%)</label>
                <input
                  type="number"
                  value={settings.taxRate}
                  onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-medium text-gray-900">İletişim Bilgileri</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-posta Adresi</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefon Numarası</label>
                <input
                  type="tel"
                  value={settings.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Adres</label>
                <textarea
                  value={settings.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Ödeme ve Kargo Ayarları</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kargo Ücreti (₺)</label>
                <input
                  type="number"
                  value={settings.shippingCost}
                  onChange={(e) => handleInputChange('shippingCost', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ücretsiz Kargo Limiti (₺)</label>
                <input
                  type="number"
                  value={settings.freeShippingThreshold}
                  onChange={(e) => handleInputChange('freeShippingThreshold', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Ödeme Yöntemleri</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="credit-card" className="mr-2" defaultChecked />
                  <label htmlFor="credit-card" className="text-sm text-blue-700">Kredi Kartı</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="bank-transfer" className="mr-2" defaultChecked />
                  <label htmlFor="bank-transfer" className="text-sm text-blue-700">Banka Transferi</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="paypal" className="mr-2" />
                  <label htmlFor="paypal" className="text-sm text-blue-700">PayPal</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="cash-on-delivery" className="mr-2" />
                  <label htmlFor="cash-on-delivery" className="text-sm text-blue-700">Kapıda Ödeme</label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Bildirim Ayarları</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">E-posta Bildirimleri</h4>
                  <p className="text-sm text-gray-500">Sipariş durumu ve önemli güncellemeler için e-posta bildirimleri</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">SMS Bildirimleri</h4>
                  <p className="text-sm text-gray-500">Kargo durumu ve önemli güncellemeler için SMS bildirimleri</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.smsNotifications}
                    onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Güvenlik Ayarları</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Bakım Modu</h4>
                  <p className="text-sm text-gray-500">Siteyi geçici olarak kapatın (sadece admin erişimi)</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-yellow-800 mb-2">Güvenlik Uyarısı</h4>
                <p className="text-sm text-yellow-700">
                  Bu ayarlar sistem güvenliğini etkileyebilir. Değişiklik yapmadan önce dikkatli olun.
                </p>
              </div>
              
              <div className="space-y-3">
                <button className="w-full px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors">
                  Tüm Oturumları Sonlandır
                </button>
                <button className="w-full px-4 py-2 text-sm font-medium text-orange-700 bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors">
                  Veritabanı Yedekle
                </button>
                <button className="w-full px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                  Güvenlik Loglarını Görüntüle
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Kaydediliyor...</span>
                </>
              ) : (
                <span>Ayarları Kaydet</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 