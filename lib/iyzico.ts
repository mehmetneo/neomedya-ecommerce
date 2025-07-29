import Iyzipay from 'iyzipay'

// iyzico Konfigürasyonu
export const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY || 'sandbox-api-key',
  secretKey: process.env.IYZICO_SECRET_KEY || 'sandbox-secret-key',
  uri: process.env.IYZICO_URI || 'https://sandbox-api.iyzipay.com'
})

// Ödeme Başlatma Fonksiyonu
export async function createPayment(amount: number, currency: string = 'TRY', basketId: string, buyer: any, items: any[]) {
  return new Promise((resolve, reject) => {
    const buyerData: any = {
      id: buyer.id || 'BY789',
      name: buyer.firstName,
      surname: buyer.lastName,
      gsmNumber: buyer.phone,
      email: buyer.email,
      lastLoginDate: new Date().toISOString(),
      registrationDate: new Date().toISOString(),
      registrationAddress: buyer.address,
      ip: '85.34.78.112',
      city: buyer.city,
      country: 'Turkey',
      zipCode: buyer.postalCode
    }

    // Vergi kimlik numarası varsa ekle
    if (buyer.identityNumber && buyer.identityNumber.trim() !== '') {
      buyerData.identityNumber = buyer.identityNumber
    }

    const request = {
      locale: 'tr',
      conversationId: `conv_${Date.now()}`,
      price: amount.toString(),
      paidPrice: amount.toString(),
      currency: currency,
      basketId: basketId,
      paymentGroup: 'PRODUCT',
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/callback`,
      enabledInstallments: [1, 2, 3, 6, 9],
      buyer: buyerData,
      shippingAddress: {
        contactName: `${buyer.firstName} ${buyer.lastName}`,
        city: buyer.city,
        country: 'Turkey',
        address: buyer.address,
        zipCode: buyer.postalCode
      },
      billingAddress: {
        contactName: `${buyer.firstName} ${buyer.lastName}`,
        city: buyer.city,
        country: 'Turkey',
        address: buyer.address,
        zipCode: buyer.postalCode
      },
      basketItems: items.map((item, index) => ({
        id: item.id,
        name: item.name,
        category1: 'Giyim',
        category2: 'Moda',
        itemType: 'PHYSICAL',
        price: (item.price * item.quantity).toString()
      }))
    }

    iyzipay.checkoutFormInitialize.create(request, (err: any, result: any) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

// Ödeme Durumu Kontrolü
export async function checkPaymentStatus(token: string) {
  return new Promise((resolve, reject) => {
    const request = {
      locale: 'tr',
      conversationId: `check_${Date.now()}`,
      token: token
    }

    iyzipay.checkoutForm.retrieve(request, (err: any, result: any) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

// Kredi Kartı ile Ödeme
export async function createCardPayment(amount: number, currency: string = 'TRY', card: any, buyer: any, items: any[]) {
  return new Promise((resolve, reject) => {
    const buyerData: any = {
      id: buyer.id || 'BY789',
      name: buyer.firstName,
      surname: buyer.lastName,
      gsmNumber: buyer.phone,
      email: buyer.email,
      lastLoginDate: new Date().toISOString(),
      registrationDate: new Date().toISOString(),
      registrationAddress: buyer.address,
      ip: '85.34.78.112',
      city: buyer.city,
      country: 'Turkey',
      zipCode: buyer.postalCode
    }

    // Vergi kimlik numarası varsa ekle
    if (buyer.identityNumber && buyer.identityNumber.trim() !== '') {
      buyerData.identityNumber = buyer.identityNumber
    }

    const request = {
      locale: 'tr',
      conversationId: `card_${Date.now()}`,
      price: amount.toString(),
      paidPrice: amount.toString(),
      currency: currency,
      installment: '1',
      basketId: `basket_${Date.now()}`,
      paymentChannel: 'WEB',
      paymentGroup: 'PRODUCT',
      paymentCard: {
        cardHolderName: card.cardName,
        cardNumber: card.cardNumber.replace(/\s/g, ''),
        expireMonth: card.expiryMonth,
        expireYear: card.expiryYear,
        cvc: card.cvv,
        registerCard: '0'
      },
      buyer: buyerData,
      shippingAddress: {
        contactName: `${buyer.firstName} ${buyer.lastName}`,
        city: buyer.city,
        country: 'Turkey',
        address: buyer.address,
        zipCode: buyer.postalCode
      },
      billingAddress: {
        contactName: `${buyer.firstName} ${buyer.lastName}`,
        city: buyer.city,
        country: 'Turkey',
        address: buyer.address,
        zipCode: buyer.postalCode
      },
      basketItems: items.map((item, index) => ({
        id: item.id,
        name: item.name,
        category1: 'Giyim',
        category2: 'Moda',
        itemType: 'PHYSICAL',
        price: (item.price * item.quantity).toString()
      }))
    }

    iyzipay.payment.create(request, (err: any, result: any) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
} 