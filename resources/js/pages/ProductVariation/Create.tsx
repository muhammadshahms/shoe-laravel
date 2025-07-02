"use client"

import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, router } from "@inertiajs/react"
import {
  productVariationSchema,
  type Product,
  type ProductVariationFormData,
} from "@/validations/product-variation-schema"
import { ProductVariationForm } from "./Partials/ProductVariationForm"
import AppLayout from "@/layouts/app-layout"

interface ProductVariationCreateProps {
  products: Product[]
}

export default function ProductVariationCreate({ products }: ProductVariationCreateProps) {
  const form = useForm<ProductVariationFormData>({
    resolver: zodResolver(productVariationSchema),
    defaultValues: {
      product_id: products.length > 0 ? products[0].id : 0,
      sku: "",
      barcode: "",
      price: 0,
      quantity: 0,
      in_stock: true,
      attributes: {},
    },
  })

  const onSubmit = (data: ProductVariationFormData) => {
    router.post(route('product-variations.store'), data)
  }

  return (
    <AppLayout>
      <div className="px-4">
        <div className="my-6">
          <Link href="/dashboard/product-variations">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Variations
            </Button>
          </Link>
        </div>

        <div className="space-y-6 px-4">

          <FormProvider {...form}>
            <ProductVariationForm
              products={products}
              onSubmit={onSubmit}
              submitLabel="Create Variation"
            />
          </FormProvider>
        </div>
      </div>
    </AppLayout>
  )
}
