"use client"
import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}
export interface Product {
  id: number
  name: string
  price: number
  special_price?: number
  rating?: number
  reviews_count?: number
  main_image_url: string
  is_active: boolean
  is_featured: boolean
  in_stock: boolean
  categories_list: string
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart from localStorage on initial mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("v0-store-cart")
      if (storedCart) {
        setCartItems(JSON.parse(storedCart))
      }
    }
  }, [])

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("v0-store-cart", JSON.stringify(cartItems))
    }
  }, [cartItems])

  const addItem = useCallback((product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      if (existingItem) {
        toast.success(`Increased quantity of ${product.name} in cart!`)
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        toast.success(`${product.name} added to cart!`)
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.main_image_url,
            quantity: 1,
          },
        ]
      }
    })
  }, [])

  const removeItem = useCallback((productId: number) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === productId)
      if (itemToRemove) {
        toast.info(`${itemToRemove.name} removed from cart.`)
      }
      return prevItems.filter((item) => item.id !== productId)
    })
  }, [])

  const updateQuantity = useCallback((productId: number, newQuantity: number) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter((item) => item.id !== productId)
      }
      return prevItems.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
    })
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
    toast.info("Cart cleared!")
  }, [])

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  return {
    cartItems,
    cartTotal,
    cartItemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }
}
