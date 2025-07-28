"use client"
// import Image from "next/image"
import { Separator } from "@/components/ui/separator"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { MinusCircle, PlusCircle, Trash2, ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

interface CartSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function CartSheet({ isOpen, onOpenChange }: CartSheetProps) {
  const { cartItems, cartTotal, cartItemCount, removeItem, updateQuantity, clearCart } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="bg-gray-900 border-gray-700 flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-white flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-yellow-400" />
            Your Cart ({cartItemCount})
          </SheetTitle>
          <SheetDescription className="text-gray-400">Review your items before checkout.</SheetDescription>
        </SheetHeader>
        <Separator className="bg-white/20 my-4" />
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow text-gray-400">
            <ShoppingCart className="w-16 h-16 mb-4 text-gray-600" />
            <p className="text-lg">Your cart is empty.</p>
            <p className="text-sm">Add some amazing products!</p>
          </div>
        ) : (
          <ScrollArea className="flex-grow pr-4">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-white/5 p-3 rounded-lg border border-white/10">
                  <img 
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-grow">
                    <h4 className="font-medium text-white text-base">{item.name}</h4>
                    <p className="text-gray-400 text-sm">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="text-gray-400 hover:text-white"
                    >
                      <MinusCircle className="w-5 h-5" />
                      <span className="sr-only">Decrease quantity</span>
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value))}
                      className="w-16 text-center bg-white/10 border-white/20 text-white"
                      min="1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-gray-400 hover:text-white"
                    >
                      <PlusCircle className="w-5 h-5" />
                      <span className="sr-only">Increase quantity</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 hover:text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                      <span className="sr-only">Remove item</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
        <Separator className="bg-white/20 my-4" />
        <div className="flex justify-between items-center text-white text-lg font-bold">
          <span>Total:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-300 hover:to-orange-300 font-semibold"
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-white/20 text-white hover:bg-white/10 bg-white/5"
            onClick={clearCart}
            disabled={cartItems.length === 0}
          >
            Clear Cart
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
