'use client'

import React from 'react'

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Test Sayfası
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">NEOMEDYA Test</h2>
          <p className="text-gray-600 mb-4">
            Bu sayfa Next.js ve Tailwind CSS'in düzgün çalışıp çalışmadığını test etmek için oluşturuldu.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">✅ Next.js</h3>
              <p className="text-blue-600 text-sm">Çalışıyor</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">✅ Tailwind CSS</h3>
              <p className="text-green-600 text-sm">Çalışıyor</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800">✅ TypeScript</h3>
              <p className="text-purple-600 text-sm">Çalışıyor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestPage 