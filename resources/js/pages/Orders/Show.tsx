"use client"

import { Head, Link } from "@inertiajs/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Header from "@/components/Global/Header"
import Footer from "@/components/Global/Footer"
import UserLayout from "@/layouts/user-layout"

interface Props {
  order: {
    id: number
    order_number: string
    status: string
    grand_total: number
    item_count: number
    created_at: string
    cart_items: {
      id: number
      quantity: number
      price: number
      product: {
        id: number
        name: string
        main_image_url?: string
      }
    }[]
  }
}

export default function Show({ order }: Props) {
  return (
    <>
      <Head title={`Order #${order.order_number}`} />
      <UserLayout>

        {/* Page Content */}
        <div className="max-w-5xl mx-auto py-12 px-4 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Order #{order.order_number}</h1>
            <a
              href={`/orders/${order.id}/invoice`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition shadow"
            >
              Download Invoice
            </a>
          </div>

          <Card className="bg-gray-800 text-white border border-gray-700 shadow-lg rounded-lg p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Order Details</CardTitle>
              <div className="flex items-center justify-between mt-2">
                <Badge variant="secondary">{order.status}</Badge>
                <span className="text-sm text-gray-400">
                  {new Date(order.created_at).toLocaleDateString()}
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Summary Info */}
              <div className="grid grid-cols-2 gap-4 text-gray-300">
                <div>
                  <p><span className="font-semibold">Order ID:</span> {order.id}</p>
                  <p><span className="font-semibold">Order Number:</span> {order.order_number}</p>
                  <p><span className="font-semibold">Status:</span> {order.status}</p>
                  <p><span className="font-semibold">Date:</span> {new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <p><span className="font-semibold">Items Count:</span> {order.item_count}</p>
                  <p><span className="font-semibold">Total:</span> Rs. {order.grand_total.toLocaleString()}</p>
                </div>
              </div>

              <Separator className="bg-gray-700" />
              {/* Cart Items */}
              <div className="space-y-4">
                {order.cart_items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border border-gray-700 bg-gray-900 p-4 rounded-md"
                  >
                    <div className="flex gap-4 items-center">
                      {item.product.main_image_url ? (
                        <img
                          src={item.product.main_image_url}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-700 rounded flex items-center justify-center text-sm text-gray-400">
                          No Image
                        </div>
                      )}
                      <div>
                        <Link
                          href={`/products/${item.product.id}`}
                          className="font-semibold text-yellow-400 hover:underline"
                        >
                          {item.product.name}
                        </Link>
                        <div className="text-sm text-gray-400">
                          Quantity: {item.quantity}
                        </div>
                        <div className="text-sm text-gray-400">
                          {item.product.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          Price: Rs. {item.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </UserLayout>
    </>
  )
}
