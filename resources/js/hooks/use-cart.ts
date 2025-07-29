"use client"

import { useState, useEffect, useCallback } from "react"
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

// Define the return type of the useCart hook
interface UseCartHook {
  cartItems: CartItem[]
  addItem: (product: ProductForCart) => void
  removeItem: (id: number) => void
  updateItemQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartItemCount: number
}

export const useCart = (): UseCartHook => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart from localStorage on initial mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("v0-cart")
      if (storedCart) {
        setCartItems(JSON.parse(storedCart))
        console.log("Cart loaded from localStorage:", JSON.parse(storedCart)) // Added line
      } else {
        console.log("No cart data found in localStorage.") // Added line
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error)
      localStorage.removeItem("v0-cart")
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("v0-cart", JSON.stringify(cartItems))
      console.log("Cart saved to localStorage:", cartItems) // Added line
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error)
    }
  }, [cartItems])

  // Add an item to the cart or increment its quantity if it already exists
  const addItem = useCallback((product: ProductForCart) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        const updatedItems = prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
        toast.success(`Increased quantity of ${product.name} to ${existingItem.quantity + 1}`)
        return updatedItems
      } else {
        const newItem: CartItem = {
          id: product.id,
          title: product.name,
          price: product.price,
          image: product.main_image_url,
          quantity: 1,
        }
        toast.success(`${product.name} added to cart!`)
        return [...prevItems, newItem]
      }
    })
  }, [])

  // Remove an item from the cart
  const removeItem = useCallback((id: number) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === id)
      if (itemToRemove) {
        toast.info(`${itemToRemove.title} removed from cart.`)
      }
      return prevItems.filter((item) => item.id !== id)
    })
  }, [])

  // Update the quantity of an item in the cart
  const updateItemQuantity = useCallback((id: number, quantity: number) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        // If quantity is 0 or less, remove the item
        const itemToRemove = prevItems.find((item) => item.id === id)
        if (itemToRemove) {
          toast.info(`${itemToRemove.title} removed from cart.`)
        }
        return prevItems.filter((item) => item.id !== id)
      }

      const updatedItems = prevItems.map((item) => (item.id === id ? { ...item, quantity: quantity } : item))
      const updatedItem = updatedItems.find((item) => item.id === id)
      if (updatedItem) {
        toast.info(`Quantity of ${updatedItem.title} updated to ${updatedItem.quantity}`)
      }
      return updatedItems
    })
  }, [])

  // Clear all items from the cart
  const clearCart = useCallback(() => {
    setCartItems([])
    toast.info("Cart cleared!")
  }, [])

  // Calculate total price of items in the cart
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  // Calculate total number of items (sum of quantities) in the cart
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  return {
    cartItems,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
  }
}
