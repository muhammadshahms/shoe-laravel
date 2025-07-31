import { create } from "zustand"
import { persist } from "zustand/middleware"
import { toast } from "sonner"

export interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

interface ProductForCart {
  id: number
  name: string
  price: number
  main_image_url: string
}

interface CartStore {
  cartItems: CartItem[]
  addItem: (product: ProductForCart) => void
  removeItem: (id: number) => void
  updateItemQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addItem: (product) => {
        const existing = get().cartItems.find((item) => item.id === product.id)

        if (existing) {
          set({
            cartItems: get().cartItems.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          })
          toast.success(`Increased quantity of ${product.name}`)
        } else {
          const newItem: CartItem = {
            id: product.id,
            title: product.name,
            price: product.price,
            image: product.main_image_url,
            quantity: 1,
          }
          set({ cartItems: [...get().cartItems, newItem] })
          toast.success(`${product.name} added to cart`)
        }
      },

      removeItem: (id) => {
        const toRemove = get().cartItems.find((item) => item.id === id)
        if (toRemove) toast.info(`${toRemove.title} removed from cart`)
        set({ cartItems: get().cartItems.filter((item) => item.id !== id) })
      },

      updateItemQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        set({
          cartItems: get().cartItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })
        const updated = get().cartItems.find((item) => item.id === id)
        if (updated) toast.info(`Updated quantity of ${updated.title} to ${quantity}`)
      },

      clearCart: () => {
        set({ cartItems: [] })
        toast.info("Cart cleared")
      },
    }),
    {
      name: "v0-cart-store", // localStorage key
    }
  )
)

// 🔁 Selector for cart total
export const selectCartTotal = (state: CartStore) =>
  state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
