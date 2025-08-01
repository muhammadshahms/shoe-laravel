"use client"

import { Link } from "@inertiajs/react"
import { ChevronLeft } from "lucide-react"
import type { ProductVariationShowProps } from "./types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AppLayout from "@/layouts/app-layout"

export default function ProductVariationShow({ variation }: ProductVariationShowProps) {
  return (
    <AppLayout>
      {" "}
      {/* Wrap with AppLayout */}
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7 bg-transparent" asChild>
                <Link href={route("product-variations.index")}>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Product Variation Details
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm" asChild>
                  <Link href={route("product-variations.edit", variation.id)}>Edit Variation</Link>
                </Button>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Variation: {variation.sku}</CardTitle>
                <CardDescription>Detailed information about this product variation.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Product Name</p>
                    <p className="text-lg font-semibold">{variation.product.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">SKU</p>
                    <p className="text-lg font-semibold">{variation.sku}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Price</p>
                    <p className="text-lg font-semibold">${variation.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Quantity</p>
                    <p className="text-lg font-semibold">{variation.quantity}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">In Stock</p>
                    <Badge variant={variation.in_stock ? "default" : "destructive"}>
                      {variation.in_stock ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Barcode</p>
                    <p className="text-lg font-semibold">{variation.barcode || "N/A"}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Attributes</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {variation.attribute_options.length > 0 ? (
                      variation.attribute_options.map((option) => (
                        <Badge key={option.id} variant="secondary">
                          {option.attribute?.name}: {option.name}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No attributes selected</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Created At</p>
                    <p className="text-lg font-semibold">{new Date(variation.created_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                    <p className="text-lg font-semibold">{new Date(variation.updated_at).toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm" asChild>
                <Link href={route("product-variations.edit", variation.id)}>Edit Variation</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  )
}
