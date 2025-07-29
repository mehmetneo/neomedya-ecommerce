// Türkiye'ye Uygun Ödeme Sistemleri
export interface PaymentSystem {
  id: string
  name: string
  description: string
  setupRequired: boolean
  documentsRequired: string[]
  commission: string
  setupTime: string
  minAmount?: number
  maxAmount?: number
}

export const paymentSystems: PaymentSystem[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Uluslararası ödeme sistemi - Kolay kurulum',
    setupRequired: true,
    documentsRequired: ['E-posta', 'Telefon', 'Adres'],
    commission: '%2.9 + 30 kuruş',
    setupTime: '1-2 gün',
    minAmount: 1,
    maxAmount: 100000
  },
  {
    id: 'paytr',
    name: 'PayTR',
    description: 'Türkiye\'nin güvenilir ödeme sistemi',
    setupRequired: true,
    documentsRequired: ['E-posta', 'Telefon', 'Adres'],
    commission: '%2.5 + 25 kuruş',
    setupTime: '1-2 gün',
    minAmount: 1,
    maxAmount: 50000
  },
  {
    id: 'shopier',
    name: 'Shopier',
    description: 'Basit ve hızlı Türk ödeme sistemi',
    setupRequired: true,
    documentsRequired: ['E-posta', 'Telefon', 'Adres'],
    commission: '%2.9 + 30 kuruş',
    setupTime: '1 gün',
    minAmount: 1,
    maxAmount: 25000
  },
  {
    id: 'bkm-express',
    name: 'BKM Express',
    description: 'Banka kartları ile hızlı ödeme',
    setupRequired: true,
    documentsRequired: ['E-posta', 'Telefon', 'Adres'],
    commission: '%2.5 + 25 kuruş',
    setupTime: '1-2 gün',
    minAmount: 1,
    maxAmount: 100000
  },
  {
    id: 'bank-transfer',
    name: 'Banka Transferi',
    description: 'Havale/EFT ile ödeme',
    setupRequired: false,
    documentsRequired: ['Banka hesap bilgileri'],
    commission: 'Ücretsiz',
    setupTime: 'Anında',
    minAmount: 1,
    maxAmount: 1000000
  },
  {
    id: 'crypto',
    name: 'Kripto Para',
    description: 'Bitcoin, Ethereum ile ödeme',
    setupRequired: false,
    documentsRequired: ['Kripto cüzdan adresi'],
    commission: '%1-2',
    setupTime: 'Anında',
    minAmount: 10,
    maxAmount: 100000
  },
  {
    id: 'cash-on-delivery',
    name: 'Kapıda Ödeme',
    description: 'Teslimat sırasında nakit ödeme',
    setupRequired: false,
    documentsRequired: ['Hiçbir belge gerekmez'],
    commission: 'Ücretsiz',
    setupTime: 'Anında',
    minAmount: 1,
    maxAmount: 1000
  }
]

// Stripe Ödeme Fonksiyonu
export async function createStripePayment(amount: number, currency: string = 'try') {
  try {
    const response = await fetch('/api/payment/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Stripe kuruş cinsinden ister
        currency: currency,
        description: 'Neomedya E-ticaret Ödemesi'
      })
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Stripe ödeme hatası:', error)
    throw error
  }
}

// PayTR Ödeme Fonksiyonu
export async function createPayTRPayment(amount: number, currency: string = 'TRY') {
  try {
    const response = await fetch('/api/payment/paytr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        currency: currency,
        description: 'Neomedya E-ticaret Ödemesi'
      })
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error('PayTR ödeme hatası:', error)
    throw error
  }
}

// Shopier Ödeme Fonksiyonu
export async function createShopierPayment(amount: number, currency: string = 'TRY') {
  try {
    const response = await fetch('/api/payment/shopier', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        currency: currency,
        description: 'Neomedya E-ticaret Ödemesi'
      })
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Shopier ödeme hatası:', error)
    throw error
  }
}

// BKM Express Ödeme Fonksiyonu
export async function createBKMExpressPayment(amount: number, currency: string = 'TRY') {
  try {
    const response = await fetch('/api/payment/bkm-express', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        currency: currency,
        description: 'Neomedya E-ticaret Ödemesi'
      })
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error('BKM Express ödeme hatası:', error)
    throw error
  }
}

// Detaylı Banka Transferi
export function createBankTransfer(amount: number) {
  return {
    success: true,
    method: 'bank-transfer',
    bankInfo: {
      bankName: 'Garanti BBVA',
      accountName: 'Neomedya E-ticaret Ltd. Şti.',
      iban: 'TR12 0006 2000 0000 0000 0000 00',
      swift: 'TGBATRIS',
      branchCode: '123',
      accountNumber: '12345678',
      amount: amount,
      reference: `ORD-${Date.now()}`,
      instructions: [
        'Havale yaparken referans numarasını açıklama kısmına yazın',
        'Ödeme yaptıktan sonra dekontu admin ile paylaşın',
        'Dekont onaylandıktan sonra siparişiniz hazırlanacak',
        'Sipariş durumunu "Siparişlerim" sayfasından takip edebilirsiniz'
      ]
    }
  }
}

// Kripto Para Ödemesi
export function createCryptoPayment(amount: number, cryptoType: string = 'BTC') {
  const cryptoAddresses = {
    BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    ETH: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    USDT: 'TRC20: TQn9Y2khDD95J42FQtQTdwVVRKjqEifLQk'
  }

  return {
    success: true,
    method: 'crypto',
    cryptoInfo: {
      type: cryptoType,
      address: cryptoAddresses[cryptoType as keyof typeof cryptoAddresses],
      amount: amount,
      reference: `ORD-${Date.now()}`
    }
  }
}

// Kapıda Ödeme
export function createCashOnDelivery(amount: number) {
  return {
    success: true,
    method: 'cash-on-delivery',
    cashInfo: {
      amount: amount,
      deliveryFee: 15,
      totalAmount: amount + 15,
      reference: `ORD-${Date.now()}`
    }
  }
} 