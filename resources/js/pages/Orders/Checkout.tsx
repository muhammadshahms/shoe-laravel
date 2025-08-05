"use client"

import { Head, useForm } from "@inertiajs/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCartStore, selectCartTotal } from "@/hooks/cart-store"
import { toast } from "sonner"

export default function Checkout() {
  const cartItems = useCartStore((state) => state.cartItems)
  const clearCart = useCartStore((state) => state.clearCart)
  const cartTotal = useCartStore(selectCartTotal)

  const { data, setData, post, processing, errors } = useForm({
    shipping_full_name: "",
    shipping_address: "",
    shipping_city: "",
    shipping_state: "",
    shipping_zip_code: "",
    shipping_country: "",
    shipping_phone: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.")
      return
    }

    post("/checkout", {
      onSuccess: () => {
        toast.success("Order placed successfully")
        clearCart()
      },
      onError: (e) => {
        toast.error(e.error || "Checkout failed")
      },
    })
  }

  return (
    <>
      <Head title="Checkout" />
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Info */}
          <div className="space-y-4 col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={data.shipping_full_name}
                  onChange={(e) => setData("shipping_full_name", e.target.value)}
                />
                <Input
                  placeholder="Phone"
                  value={data.shipping_phone}
                  onChange={(e) => setData("shipping_phone", e.target.value)}
                />
                <Textarea
                  placeholder="Street Address"
                  value={data.shipping_address}
                  onChange={(e) => setData("shipping_address", e.target.value)}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="City"
                    value={data.shipping_city}
                    onChange={(e) => setData("shipping_city", e.target.value)}
                  />
                  <Input
                    placeholder="State"
                    value={data.shipping_state}
                    onChange={(e) => setData("shipping_state", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="ZIP Code"
                    value={data.shipping_zip_code}
                    onChange={(e) => setData("shipping_zip_code", e.target.value)}
                  />
                  <Input
                    placeholder="Country"
                    value={data.shipping_country}
                    onChange={(e) => setData("shipping_country", e.target.value)}
                  />
                </div>
                <Textarea
                  placeholder="Additional notes (optional)"
                  value={data.notes}
                  onChange={(e) => setData("notes", e.target.value)}
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-gray-500">
                            {item.quantity} × ${item.price.toFixed(2)}
                          </div>
                        </div>
                        <div className="font-semibold">
                          ${(item.quantity * item.price).toFixed(2)}
                        </div>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold rounded-xl shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
              disabled={processing || cartItems.length === 0}
            >
              {processing ? "Placing Order..." : "Place Order"}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
