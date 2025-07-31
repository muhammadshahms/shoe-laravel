"use client"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { toast } from "sonner"

// Define the structure of a cart item
interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

// Define the structure of a product as received from Inertia props
interface ProductForCart {
  id: number
  name: string
  price: number
  main_image_url: string
}

// Define the state and actions for the cart store
interface CartState {
  cartItems: CartItem[]
  addItem: (product: ProductForCart, quantityToAdd: number) => void
  removeItem: (id: number) => void
  updateItemQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  isOpen: boolean
  setOpen: (open: boolean) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      isOpen: false,
      setOpen: (open) => set({ isOpen: open }),

      addItem: (product, quantityToAdd) => {
        set((state) => {
          const existingItem = state.cartItems.find((item) => item.id === product.id)
          if (existingItem) {
            const newQuantity = existingItem.quantity + quantityToAdd
            const updatedItems = state.cartItems.map((item) =>
              item.id === product.id ? { ...item, quantity: newQuantity } : item,
            )
            toast.success(`Increased quantity of ${product.name} to ${newQuantity}`)
            return { cartItems: updatedItems, isOpen: true } // Open cart
          } else {
            const newItem: CartItem = {
              id: product.id,
              title: product.name,
              price: product.price,
              image: product.main_image_url,
              quantity: quantityToAdd,
            }
            toast.success(`${product.name} added to cart!`)
            return { cartItems: [...state.cartItems, newItem], isOpen: true } // Open cart
          }
        })
      },

      removeItem: (id) => {
        set((state) => {
          const itemToRemove = state.cartItems.find((item) => item.id === id)
          if (itemToRemove) {
            toast.info(`${itemToRemove.title} removed from cart.`)
          }
          return { cartItems: state.cartItems.filter((item) => item.id !== id) }
        })
      },

      updateItemQuantity: (id, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            const itemToRemove = state.cartItems.find((item) => item.id === id)
            if (itemToRemove) {
              toast.info(`${itemToRemove.title} removed from cart.`)
            }
            return { cartItems: state.cartItems.filter((item) => item.id !== id) }
          }
          const updatedItems = state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          )
          const updatedItem = updatedItems.find((item) => item.id === id)
          if (updatedItem) {
            toast.info(`Quantity of ${updatedItem.title} updated to ${updatedItem.quantity}`)
          }
          return { cartItems: updatedItems }
        })
      },

      clearCart: () => {
        set({ cartItems: [] })
        toast.info("Cart cleared!")
      },
    }),
    {
      name: "v0-cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

// Selectors for derived state (can be used directly in components)
export const selectCartTotal = (state: CartState) =>
  state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
export const selectCartItemCount = (state: CartState) =>
  state.cartItems.reduce((count, item) => count + item.quantity, 0)
