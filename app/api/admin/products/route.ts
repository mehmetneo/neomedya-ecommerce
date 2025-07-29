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
  updatedAt?: string
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
    // Dosya yoksa varsayılan ürünleri oluştur
    const defaultProducts: Product[] = [
      {
        id: '1',
        name: 'Erkek Gömlek',
        category: 'erkek',
        price: 299.99,
        originalPrice: 399.99,
        stock: 25,
        status: 'active',
        image: '/images/products/erkek-gomlek.jpg',
        description: 'Modern kesim erkek gömlek',
        createdAt: '2024-01-15',
        salesCount: 12,
        images: ['/images/products/erkek-gomlek-1.jpg', '/images/products/erkek-gomlek-2.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Beyaz', 'Mavi', 'Siyah'],
        tags: ['gömlek', 'erkek', 'klasik']
      },
      {
        id: '2',
        name: 'Kadın Elbise',
        category: 'kadin',
        price: 450.00,
        stock: 15,
        status: 'active',
        image: '/images/products/kadin-elbise.jpg',
        description: 'Şık kadın elbise',
        createdAt: '2024-02-10',
        salesCount: 8,
        images: ['/images/products/kadin-elbise-1.jpg'],
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Kırmızı', 'Siyah', 'Mavi'],
        tags: ['elbise', 'kadın', 'şık']
      },
      {
        id: '3',
        name: 'Çocuk T-Shirt',
        category: 'cocuk',
        price: 89.99,
        stock: 30,
        status: 'active',
        image: '/images/products/cocuk-tshirt.jpg',
        description: 'Rahat çocuk t-shirt',
        createdAt: '2024-03-05',
        salesCount: 20,
        images: ['/images/products/cocuk-tshirt-1.jpg'],
        sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
        colors: ['Beyaz', 'Mavi', 'Kırmızı'],
        tags: ['t-shirt', 'çocuk', 'rahat']
      },
      {
        id: '4',
        name: 'Spor Ayakkabı',
        category: 'ayakkabi',
        price: 599.99,
        originalPrice: 799.99,
        stock: 10,
        status: 'active',
        image: '/images/products/spor-ayakkabi.jpg',
        description: 'Konforlu spor ayakkabı',
        createdAt: '2024-01-20',
        salesCount: 15,
        images: ['/images/products/spor-ayakkabi-1.jpg'],
        sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
        colors: ['Beyaz', 'Siyah', 'Gri'],
        tags: ['ayakkabı', 'spor', 'konforlu']
      },
      {
        id: '5',
        name: 'Kolye Set',
        category: 'aksesuar',
        price: 150.00,
        stock: 50,
        status: 'active',
        image: '/images/products/kolye-set.jpg',
        description: 'Elegant kolye seti',
        createdAt: '2024-02-25',
        salesCount: 25,
        images: ['/images/products/kolye-set-1.jpg'],
        sizes: ['Tek Boy'],
        colors: ['Altın', 'Gümüş', 'Rose Altın'],
        tags: ['kolye', 'aksesuar', 'elegant']
      }
    ]
    
    // Varsayılan ürünleri kaydet
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(defaultProducts, null, 2))
    return defaultProducts
  }
}

// Ürünleri yazma fonksiyonu
async function writeProducts(products: Product[]): Promise<void> {
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2))
}

// GET: Tüm ürünleri getir
export async function GET() {
  try {
    console.log('📦 Admin: Ürünler getiriliyor...')
    const products = await readProducts()
    console.log(`📊 Toplam ürün sayısı: ${products.length}`)
    
    return NextResponse.json({
      success: true,
      products
    })
  } catch (error) {
    console.error('❌ Admin ürün getirme hatası:', error)
    return NextResponse.json(
      { success: false, error: 'Ürünler yüklenemedi' },
      { status: 500 }
    )
  }
}

// POST: Yeni ürün ekle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const products = await readProducts()
    
    const newProduct: Product = {
      id: `PROD-${Date.now()}`,
      name: body.name,
      category: body.category,
      price: parseFloat(body.price),
      originalPrice: body.originalPrice ? parseFloat(body.originalPrice) : undefined,
      stock: parseInt(body.stock),
      status: body.status || 'active',
      image: body.image || '/images/products/default.jpg',
      description: body.description,
      createdAt: new Date().toISOString(),
      salesCount: 0,
      images: body.images || [],
      sizes: body.sizes || [],
      colors: body.colors || [],
      tags: body.tags || []
    }
    
    products.push(newProduct)
    await writeProducts(products)
    
    console.log('✅ Yeni ürün eklendi:', newProduct.name)
    
    return NextResponse.json({
      success: true,
      product: newProduct
    })
  } catch (error) {
    console.error('❌ Ürün ekleme hatası:', error)
    return NextResponse.json(
      { success: false, error: 'Ürün eklenemedi' },
      { status: 500 }
    )
  }
}

// PUT: Ürün güncelle
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const products = await readProducts()
    
    const productIndex = products.findIndex(p => p.id === body.id)
    if (productIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Ürün bulunamadı' },
        { status: 404 }
      )
    }
    
    const updatedProduct = {
      ...products[productIndex],
      ...body,
      updatedAt: new Date().toISOString()
    }
    
    products[productIndex] = updatedProduct
    await writeProducts(products)
    
    console.log('✅ Ürün güncellendi:', updatedProduct.name)
    
    return NextResponse.json({
      success: true,
      product: updatedProduct
    })
  } catch (error) {
    console.error('❌ Ürün güncelleme hatası:', error)
    return NextResponse.json(
      { success: false, error: 'Ürün güncellenemedi' },
      { status: 500 }
    )
  }
}

// DELETE: Ürün sil
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Ürün ID gerekli' },
        { status: 400 }
      )
    }
    
    const products = await readProducts()
    const filteredProducts = products.filter(p => p.id !== id)
    
    if (filteredProducts.length === products.length) {
      return NextResponse.json(
        { success: false, error: 'Ürün bulunamadı' },
        { status: 404 }
      )
    }
    
    await writeProducts(filteredProducts)
    
    console.log('✅ Ürün silindi:', id)
    
    return NextResponse.json({
      success: true
    })
  } catch (error) {
    console.error('❌ Ürün silme hatası:', error)
    return NextResponse.json(
      { success: false, error: 'Ürün silinemedi' },
      { status: 500 }
    )
  }
} 