import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string, size: string, color: string) => void
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const { items } = get()
        const existingItem = items.find(
          i => i.id === item.id && i.size === item.size && i.color === item.color
        )
        
        if (existingItem) {
          set({
            items: items.map(i =>
              i.id === item.id && i.size === item.size && i.color === item.color
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          })
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] })
        }
      },
      
      removeItem: (id, size, color) => {
        const { items } = get()
        set({
          items: items.filter(
            i => !(i.id === id && i.size === size && i.color === color)
          )
        })
      },
      
      updateQuantity: (id, size, color, quantity) => {
        const { items } = get()
        if (quantity <= 0) {
          get().removeItem(id, size, color)
          return
        }
        
        set({
          items: items.map(i =>
            i.id === id && i.size === size && i.color === color
              ? { ...i, quantity }
              : i
          )
        })
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        const { items } = get()
        return items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      
      getItemCount: () => {
        const { items } = get()
        return items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
) 