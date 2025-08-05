// resources/js/Pages/Orders/Show.tsx

import { Head } from "@inertiajs/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

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
      <Head title={`Order #${order.id}`} />

      <div className="max-w-5xl mx-auto py-8 px-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Order #{order.id}</CardTitle>
            <div className="flex items-center justify-between mt-2">
              <Badge variant="outline">{order.status}</Badge>
              <span className="text-sm text-gray-500">
                {new Date(order.created_at).toLocaleDateString()}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-medium">Items: {order.item_count}</div>
                <div className="font-medium">
                  Total: Rs. {order.grand_total.toLocaleString()}
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              {order.cart_items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border p-4 rounded-md"
                >
                  <div>
                    <div className="font-semibold">{item.product?.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      Rs. {item.price.toLocaleString()} × {item.quantity}
                    </div>
                    <div className="font-semibold">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
