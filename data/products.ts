export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  category: string
  subcategory: string
  colors: string[]
  sizes: string[]
  rating: number
  reviews: number
  inStock: boolean
  isNew?: boolean
  isSale?: boolean
  tags: string[]
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Pamuklu T-Shirt',
    description: 'Yüksek kaliteli %100 pamuktan üretilen rahat ve nefes alabilir t-shirt. Günlük kullanım için ideal.',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=600&fit=crop'
    ],
    category: 'erkek',
    subcategory: 't-shirt',
    colors: ['Beyaz', 'Siyah', 'Gri', 'Mavi'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    isSale: true,
    tags: ['pamuk', 'rahat', 'günlük']
  },
  {
    id: '2',
    name: 'Slim Fit Kot Pantolon',
    description: 'Modern kesim slim fit kot pantolon. Yüksek bel ve dar paça tasarımı ile şık görünüm.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=600&fit=crop'
    ],
    category: 'erkek',
    subcategory: 'pantolon',
    colors: ['Mavi', 'Siyah', 'Gri'],
    sizes: ['28', '30', '32', '34', '36'],
    rating: 4.6,
    reviews: 89,
    inStock: true,
    tags: ['kot', 'slim-fit', 'modern']
  },
  {
    id: '3',
    name: 'Kadın Elbise - Yaz Koleksiyonu',
    description: 'Hafif ve akışkan kumaştan üretilen yaz elbisesi. Çiçek desenli ve bel kısmında bağcık detayı.',
    price: 249.99,
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=500&h=600&fit=crop'
    ],
    category: 'kadın',
    subcategory: 'elbise',
    colors: ['Çiçekli', 'Mavi', 'Pembe'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviews: 156,
    inStock: true,
    isNew: true,
    isSale: true,
    tags: ['elbise', 'yaz', 'çiçekli']
  },
  {
    id: '4',
    name: 'Oversize Sweatshirt',
    description: 'Rahat ve sıcak tutan oversize sweatshirt. Kapüşonlu ve cep detaylı tasarım.',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop'
    ],
    category: 'kadın',
    subcategory: 'sweatshirt',
    colors: ['Gri', 'Siyah', 'Beyaz', 'Pembe'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 203,
    inStock: true,
    tags: ['sweatshirt', 'oversize', 'kapüşonlu']
  },
  {
    id: '5',
    name: 'Deri Ceket',
    description: 'Gerçek deri ceket. Yüksek kaliteli malzeme ve işçilik. Klasik ve şık tasarım.',
    price: 899.99,
    originalPrice: 1299.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop'
    ],
    category: 'erkek',
    subcategory: 'ceket',
    colors: ['Kahverengi', 'Siyah'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviews: 67,
    inStock: true,
    isSale: true,
    tags: ['deri', 'ceket', 'klasik']
  },
  {
    id: '6',
    name: 'Çocuk T-Shirt Seti',
    description: '3\'lü paket çocuk t-shirt seti. %100 pamuk, rahat ve dayanıklı.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop'
    ],
    category: 'çocuk',
    subcategory: 't-shirt',
    colors: ['Çok Renkli'],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    rating: 4.5,
    reviews: 45,
    inStock: true,
    tags: ['çocuk', 'set', 'pamuk']
  },
  {
    id: '7',
    name: 'Spor Ayakkabı',
    description: 'Hafif ve rahat spor ayakkabı. Günlük kullanım ve spor aktiviteleri için ideal.',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=600&fit=crop'
    ],
    category: 'ayakkabı',
    subcategory: 'spor',
    colors: ['Beyaz', 'Siyah', 'Gri', 'Mavi'],
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
    rating: 4.8,
    reviews: 234,
    inStock: true,
    isSale: true,
    tags: ['spor', 'ayakkabı', 'rahat']
  },
  {
    id: '8',
    name: 'Kadın Bluz',
    description: 'Şık ve zarif kadın bluzu. İş ve günlük kullanım için uygun.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=600&fit=crop'
    ],
    category: 'kadın',
    subcategory: 'bluz',
    colors: ['Beyaz', 'Mavi', 'Pembe'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.6,
    reviews: 89,
    inStock: true,
    tags: ['bluz', 'şık', 'iş']
  }
]

export const categories = [
  { id: 'erkek', name: 'Erkek', image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop' },
  { id: 'kadın', name: 'Kadın', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop' },
  { id: 'çocuk', name: 'Çocuk', image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop' },
  { id: 'ayakkabı', name: 'Ayakkabı', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' }
]

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category)
}

export const getFeaturedProducts = () => {
  return products.filter(product => product.isNew || product.isSale).slice(0, 8)
}

export const getProductById = (id: string) => {
  return products.find(product => product.id === id)
} 