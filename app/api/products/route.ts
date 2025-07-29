import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

// Dynamic route olarak işaretle
export const dynamic = 'force-dynamic'

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
    
    // Static generation için mock ürünler
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Premium Pamuklu T-Shirt',
        category: 'Erkek',
        price: 89.99,
        stock: 50,
        status: 'active',
        image: '/images/placeholder.svg',
        description: 'Rahat ve dayanıklı pamuklu t-shirt',
        createdAt: new Date().toISOString(),
        salesCount: 0,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Beyaz', 'Siyah', 'Mavi']
      },
      {
        id: '2',
        name: 'Kadın Elbise',
        category: 'Kadın',
        price: 299.99,
        stock: 30,
        status: 'active',
        image: '/images/placeholder.svg',
        description: 'Şık ve modern kadın elbisesi',
        createdAt: new Date().toISOString(),
        salesCount: 0,
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Kırmızı', 'Mavi', 'Siyah']
      },
      {
        id: '3',
        name: 'Çocuk T-Shirt',
        category: 'Çocuk',
        price: 49.99,
        stock: 40,
        status: 'active',
        image: '/images/placeholder.svg',
        description: 'Çocuklar için rahat t-shirt',
        createdAt: new Date().toISOString(),
        salesCount: 0,
        sizes: ['4-5', '6-7', '8-9', '10-11'],
        colors: ['Yeşil', 'Mavi', 'Kırmızı']
      }
    ]
    
    // Kategori filtresi
    let filteredProducts = mockProducts
    if (category && category !== 'all') {
      filteredProducts = mockProducts.filter(product => product.category === category)
    }
    
    // Arama filtresi
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      )
    }
    
    // Limit uygula
    if (limit) {
      filteredProducts = filteredProducts.slice(0, parseInt(limit))
    }
    
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