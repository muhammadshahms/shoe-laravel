"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react"
import { selectCartTotal, useCartStore } from "@/hooks/cart-store"
import { router } from "@inertiajs/react"

export function CartSheet() {
  const cartItems = useCartStore((state) => state.cartItems)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity)
  const clearCart = useCartStore((state) => state.clearCart)
  const cartTotal = useCartStore(selectCartTotal)

  const isOpen = useCartStore((state) => state.isOpen)
  const setOpen = useCartStore((state) => state.setOpen)

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col bg-gray-900 text-white border-gray-700 p-8">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl">Your Cart</SheetTitle>
        </SheetHeader>
        <Separator className="bg-white/20" />
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <ShoppingCart className="w-16 h-16 mb-4" />
            <p className="text-lg">Your cart is empty.</p>
            <p className="text-sm">Start adding some amazing products!</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image || "/placeholder.svg?height=80&width=80&query=product"}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="rounded-md object-cover border border-white/10"
                    />
                    <div className="flex-1 grid gap-1">
                      <h4 className="font-semibold text-lg">{item.title}</h4>
                      <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                      {/* {item.options?.map((opt) => (
                        <div key={opt.name} className="text-sm text-muted-foreground">
                          {opt.name}: {opt.value}
                        </div>
                      ))} */}
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-7 h-7 border-white/20 text-white hover:bg-white/10 rounded-md bg-transparent"
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        >
                          {item.quantity === 1 ? (
                            <Trash2 className="w-3 h-3 text-red-400" />
                          ) : (
                            <Minus className="w-3 h-3" />
                          )}
                        </Button>
                        <span className="text-white font-medium text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-7 h-7 border-white/20 text-white hover:bg-white/10 rounded-md bg-transparent"
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-red-400"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="mt-auto pt-6 border-t border-white/20">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-300 hover:to-orange-300 font-semibold rounded-xl shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
                disabled={cartItems.length === 0}
                onClick={() =>
                  router.post("/checkout", {}, {
                    onSuccess: () => {
                      router.visit("/checkout", {
                        preserveScroll: true,
                      });
                      // toast.success("Order placed successfully!") // optional feedback
                      alert("Order placed successfully! Redirecting to checkout...") // optional feedback
                    },
                    onError: (errors) => {
                      // toast.error(errors.error || "Checkout failed")
                      alert(errors.error || "Checkout failed") // optional feedback
                    }
                  })
                }
              >
                Proceed to Checkout
              </Button>
              <Button
                variant="ghost"
                className="w-full mt-2 text-gray-400 hover:text-white hover:bg-white/10"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
