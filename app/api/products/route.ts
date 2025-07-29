import { NextRequest, NextResponse } from 'next/server'

// Dynamic route olarak işaretle
export const dynamic = 'force-dynamic'

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: string
  image: string
  description: string
  createdAt: string
  salesCount: number
  sizes: string[]
  colors: string[]
}

// Static ürün verileri
const staticProducts: Product[] = [
  // Erkek ürünleri
  {
    id: '1',
    name: 'Premium Pamuklu T-Shirt',
    category: 'Erkek',
    price: 89.99,
    stock: 50,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    description: 'Rahat ve dayanıklı pamuklu t-shirt',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Beyaz', 'Siyah', 'Mavi']
  },
  {
    id: '2',
    name: 'Slim Fit Kot Pantolon',
    category: 'Erkek',
    price: 199.99,
    stock: 30,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    description: 'Modern kesim kot pantolon',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['30', '32', '34', '36'],
    colors: ['Mavi', 'Siyah', 'Gri']
  },
  {
    id: '3',
    name: 'Deri Ceket',
    category: 'Erkek',
    price: 899.99,
    stock: 15,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    description: 'Şık deri ceket',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Siyah', 'Kahverengi']
  },
  {
    id: '4',
    name: 'Spor Ayakkabı',
    category: 'Erkek',
    price: 299.99,
    stock: 40,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    description: 'Rahat spor ayakkabı',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['40', '41', '42', '43', '44'],
    colors: ['Beyaz', 'Siyah', 'Gri']
  },
  {
    id: '5',
    name: 'Gömlek',
    category: 'Erkek',
    price: 149.99,
    stock: 25,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop',
    description: 'Resmi gömlek',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Beyaz', 'Mavi', 'Pembe']
  },

  // Kadın ürünleri
  {
    id: '11',
    name: 'Kadın Elbise',
    category: 'Kadın',
    price: 299.99,
    stock: 20,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
    description: 'Şık kadın elbisesi',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Kırmızı', 'Mavi', 'Siyah']
  },
  {
    id: '12',
    name: 'Kadın Bluz',
    category: 'Kadın',
    price: 129.99,
    stock: 35,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4c3d5d8b?w=400&h=400&fit=crop',
    description: 'Zarif kadın bluzu',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Beyaz', 'Pembe', 'Mavi']
  },
  {
    id: '13',
    name: 'Kadın Pantolon',
    category: 'Kadın',
    price: 179.99,
    stock: 30,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop',
    description: 'Rahat kadın pantolonu',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Siyah', 'Mavi', 'Bej']
  },
  {
    id: '14',
    name: 'Kadın Ceket',
    category: 'Kadın',
    price: 399.99,
    stock: 15,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
    description: 'Şık kadın ceketi',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Siyah', 'Bej', 'Mavi']
  },
  {
    id: '15',
    name: 'Kadın T-Shirt',
    category: 'Kadın',
    price: 89.99,
    stock: 45,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    description: 'Rahat kadın t-shirt',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Beyaz', 'Siyah', 'Pembe']
  },

  // Çocuk ürünleri
  {
    id: '21',
    name: 'Çocuk T-Shirt',
    category: 'Çocuk',
    price: 49.99,
    stock: 60,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop',
    description: 'Çocuklar için rahat t-shirt',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['4-5', '6-7', '8-9', '10-11'],
    colors: ['Yeşil', 'Mavi', 'Kırmızı']
  },
  {
    id: '22',
    name: 'Çocuk Pantolon',
    category: 'Çocuk',
    price: 89.99,
    stock: 40,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop',
    description: 'Dayanıklı çocuk pantolonu',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['4-5', '6-7', '8-9', '10-11'],
    colors: ['Mavi', 'Siyah', 'Gri']
  },
  {
    id: '23',
    name: 'Çocuk Elbise',
    category: 'Çocuk',
    price: 119.99,
    stock: 25,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop',
    description: 'Şirin çocuk elbisesi',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['4-5', '6-7', '8-9', '10-11'],
    colors: ['Pembe', 'Mavi', 'Mor']
  },
  {
    id: '24',
    name: 'Çocuk Mont',
    category: 'Çocuk',
    price: 199.99,
    stock: 20,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop',
    description: 'Sıcak çocuk montu',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['4-5', '6-7', '8-9', '10-11'],
    colors: ['Kırmızı', 'Mavi', 'Yeşil']
  },
  {
    id: '25',
    name: 'Çocuk Şort',
    category: 'Çocuk',
    price: 59.99,
    stock: 35,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop',
    description: 'Rahat çocuk şortu',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['4-5', '6-7', '8-9', '10-11'],
    colors: ['Mavi', 'Siyah', 'Gri']
  },

  // Ayakkabı ürünleri
  {
    id: '31',
    name: 'Spor Ayakkabı',
    category: 'Ayakkabı',
    price: 299.99,
    stock: 50,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    description: 'Rahat spor ayakkabı',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
    colors: ['Beyaz', 'Siyah', 'Gri']
  },
  {
    id: '32',
    name: 'Günlük Ayakkabı',
    category: 'Ayakkabı',
    price: 199.99,
    stock: 40,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    description: 'Günlük kullanım ayakkabısı',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
    colors: ['Kahverengi', 'Siyah', 'Bej']
  },
  {
    id: '33',
    name: 'Resmi Ayakkabı',
    category: 'Ayakkabı',
    price: 399.99,
    stock: 25,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    description: 'Şık resmi ayakkabı',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
    colors: ['Siyah', 'Kahverengi']
  },
  {
    id: '34',
    name: 'Bot',
    category: 'Ayakkabı',
    price: 499.99,
    stock: 20,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    description: 'Dayanıklı bot',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
    colors: ['Siyah', 'Kahverengi']
  },
  {
    id: '35',
    name: 'Sandalet',
    category: 'Ayakkabı',
    price: 149.99,
    stock: 30,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    description: 'Rahat sandalet',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
    colors: ['Bej', 'Siyah', 'Beyaz']
  },

  // Aksesuar ürünleri
  {
    id: '41',
    name: 'Saat',
    category: 'Aksesuar',
    price: 599.99,
    stock: 15,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',
    description: 'Şık kol saati',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['Standart'],
    colors: ['Siyah', 'Gümüş', 'Altın']
  },
  {
    id: '42',
    name: 'Çanta',
    category: 'Aksesuar',
    price: 199.99,
    stock: 25,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    description: 'Şık el çantası',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['Standart'],
    colors: ['Siyah', 'Kahverengi', 'Bej']
  },
  {
    id: '43',
    name: 'Kolye',
    category: 'Aksesuar',
    price: 99.99,
    stock: 40,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    description: 'Zarif kolye',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['Standart'],
    colors: ['Gümüş', 'Altın', 'Pembe']
  },
  {
    id: '44',
    name: 'Güneş Gözlüğü',
    category: 'Aksesuar',
    price: 149.99,
    stock: 30,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    description: 'Şık güneş gözlüğü',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['Standart'],
    colors: ['Siyah', 'Kahverengi', 'Gri']
  },
  {
    id: '45',
    name: 'Kemer',
    category: 'Aksesuar',
    price: 79.99,
    stock: 35,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    description: 'Deri kemer',
    createdAt: new Date().toISOString(),
    salesCount: 0,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Siyah', 'Kahverengi', 'Bej']
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const limit = searchParams.get('limit')

    // Kategori filtresi
    let filteredProducts = staticProducts
    if (category && category !== 'all') {
      filteredProducts = staticProducts.filter(product => product.category === category)
    }

    // Arama filtresi
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
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