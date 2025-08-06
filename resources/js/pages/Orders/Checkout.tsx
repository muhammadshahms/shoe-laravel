"use client"

import { Head, router, useForm } from "@inertiajs/react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm as useReactHookForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useCartStore, selectCartTotal } from "@/hooks/cart-store"
import AppLayout from "@/layouts/app-layout"
import Header from "@/components/Global/Header"
import Footer from "@/components/Global/Footer"

const checkoutSchema = z.object({
  // Shipping
  shipping_full_name: z.string().min(1),
  shipping_address: z.string().min(1),
  shipping_city: z.string().min(1),
  shipping_state: z.string().optional(),
  shipping_zip_code: z.string().optional(),
  shipping_country: z.string().min(1),
  shipping_phone: z.string().min(1),

  // Billing
  billing_full_name: z.string().min(1),
  billing_email: z.string().email(),
  billing_address: z.string().min(1),
  billing_city: z.string().min(1),
  billing_state: z.string().optional(),
  billing_zip_code: z.string().optional(),
  billing_country: z.string().min(1),
  billing_phone: z.string().min(1),

  // Payment & Notes
  payment_method: z.literal("cod"),
  payment_status: z.literal("unpaid"),
  notes: z.string().optional(),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

export default function Checkout() {
  const cartItems = useCartStore((state) => state.cartItems)
  const cartTotal = useCartStore(selectCartTotal)
  const clearCart = useCartStore((state) => state.clearCart)

  const form = useReactHookForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shipping_full_name: "",
      shipping_address: "",
      shipping_city: "",
      shipping_state: "",
      shipping_zip_code: "",
      shipping_country: "",
      shipping_phone: "",

      billing_full_name: "",
      billing_email: "",
      billing_address: "",
      billing_city: "",
      billing_state: "",
      billing_zip_code: "",
      billing_country: "",
      billing_phone: "",

      payment_method: "cod",
      payment_status: "unpaid",
      notes: "",
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  const onSubmit = (data: CheckoutFormData) => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty")
      return
    }

    const payload = {
      ...data,
      cartItems: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity, 
      })),
    }

    router.post("/checkout", payload, {
      onSuccess: () => {
        toast.success("Order placed!")
        clearCart()
      },
      onError: (errors) => {
        toast.error("Checkout failed.")
      },
    })
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />
      <Head title="Checkout" />

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SECTION: Billing + Shipping */}
          <div className="space-y-6 col-span-2">
            <Card>
              <CardHeader><CardTitle>Shipping Info</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <Input {...register("shipping_full_name")} placeholder="Full Name" />
                <Input {...register("shipping_phone")} placeholder="Phone" />
                <Textarea {...register("shipping_address")} placeholder="Address" />
                <div className="grid grid-cols-2 gap-4">
                  <Input {...register("shipping_city")} placeholder="City" />
                  <Input {...register("shipping_state")} placeholder="State" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input {...register("shipping_zip_code")} placeholder="ZIP Code" />
                  <Input {...register("shipping_country")} placeholder="Country" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Billing Info</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <Input {...register("billing_full_name")} placeholder="Full Name" />
                <Input {...register("billing_email")} placeholder="Email" />
                <Input {...register("billing_phone")} placeholder="Phone" />
                <Textarea {...register("billing_address")} placeholder="Address" />
                <div className="grid grid-cols-2 gap-4">
                  <Input {...register("billing_city")} placeholder="City" />
                  <Input {...register("billing_state")} placeholder="State" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input {...register("billing_zip_code")} placeholder="ZIP Code" />
                  <Input {...register("billing_country")} placeholder="Country" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Additional Notes</CardTitle></CardHeader>
              <CardContent>
                <Textarea {...register("notes")} placeholder="Any extra info?" />
              </CardContent>
            </Card>
          </div>

          {/* RIGHT SECTION: Order Summary */}
          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {cartItems.length === 0 ? (
                  <p className="text-gray-400">Cart is empty.</p>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-400">{item.quantity} × ${item.price.toFixed(2)}</p>
                        </div>
                        <p className="font-bold">${(item.quantity * item.price).toFixed(2)}</p>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between font-bold text-xl">
                      <span>Total:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Payment</CardTitle></CardHeader>
              <CardContent>
                <Label className="flex gap-2">
                  <input
                    type="radio"
                    value="cod"
                    {...register("payment_method")}
                    checked
                  />
                  Cash on Delivery (COD)
                </Label>
              </CardContent>
            </Card>

            <Button
              type="submit"
              disabled={isSubmitting || cartItems.length === 0}
              className="w-full bg-yellow-400 text-black hover:bg-yellow-300 font-semibold rounded-xl shadow-lg transition"
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </Button>
          </div>
        </div>
      </form>

      <Footer />
    </div>
  )
}
