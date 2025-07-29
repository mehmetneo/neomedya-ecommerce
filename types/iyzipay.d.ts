declare module 'iyzipay' {
  interface IyzipayConfig {
    apiKey: string
    secretKey: string
    uri: string
  }

  interface PaymentRequest {
    locale: string
    conversationId: string
    price: string
    paidPrice: string
    currency: string
    basketId: string
    paymentGroup: string
    callbackUrl: string
    enabledInstallments: number[]
    buyer: {
      id: string
      name: string
      surname: string
      gsmNumber: string
      email: string
      identityNumber: string
      lastLoginDate: string
      registrationDate: string
      registrationAddress: string
      ip: string
      city: string
      country: string
      zipCode: string
    }
    shippingAddress: {
      contactName: string
      city: string
      country: string
      address: string
      zipCode: string
    }
    billingAddress: {
      contactName: string
      city: string
      country: string
      address: string
      zipCode: string
    }
    basketItems: Array<{
      id: string
      name: string
      category1: string
      category2: string
      itemType: string
      price: string
    }>
  }

  interface CardPaymentRequest {
    locale: string
    conversationId: string
    price: string
    paidPrice: string
    currency: string
    installment: string
    basketId: string
    paymentChannel: string
    paymentGroup: string
    paymentCard: {
      cardHolderName: string
      cardNumber: string
      expireMonth: string
      expireYear: string
      cvc: string
      registerCard: string
    }
    buyer: {
      id: string
      name: string
      surname: string
      gsmNumber: string
      email: string
      identityNumber?: string
      lastLoginDate: string
      registrationDate: string
      registrationAddress: string
      ip: string
      city: string
      country: string
      zipCode: string
    }
    shippingAddress: {
      contactName: string
      city: string
      country: string
      address: string
      zipCode: string
    }
    billingAddress: {
      contactName: string
      city: string
      country: string
      address: string
      zipCode: string
    }
    basketItems: Array<{
      id: string
      name: string
      category1: string
      category2: string
      itemType: string
      price: string
    }>
  }

  interface CheckoutFormRequest {
    locale: string
    conversationId: string
    token: string
  }

  class Iyzipay {
    constructor(config: IyzipayConfig)
    
    checkoutFormInitialize: {
      create(request: PaymentRequest, callback: (error: any, result: any) => void): void
    }
    
    checkoutForm: {
      retrieve(request: CheckoutFormRequest, callback: (error: any, result: any) => void): void
    }
    
    payment: {
      create(request: CardPaymentRequest, callback: (error: any, result: any) => void): void
    }
  }

  export = Iyzipay
} 