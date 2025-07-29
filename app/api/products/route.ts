import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const PRODUCTS_FILE = path.join(process.cwd(), 'data', 'products.json')

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

// Ürünleri okuma fonksiyonu
async function readProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

// GET: Ürünleri getir (web sitesi için)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const limit = searchParams.get('limit')
    
    const products = await readProducts()
    
    // Sadece aktif ürünleri filtrele
    let filteredProducts = products.filter(product => product.status === 'active')
    
    // Kategori filtresi
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.category === category)
    }
    
    // Arama filtresi
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }
    
    // Limit uygula
    if (limit) {
      filteredProducts = filteredProducts.slice(0, parseInt(limit))
    }
    
    console.log(`📦 Web: ${filteredProducts.length} ürün getirildi`)
    
    return NextResponse.json({
      success: true,
      products: filteredProducts
    })
  } catch (error) {
    console.error('❌ Web ürün getirme hatası:', error)
    return NextResponse.json(
      { success: false, error: 'Ürünler yüklenemedi' },
      { status: 500 }
    )
  }
} 