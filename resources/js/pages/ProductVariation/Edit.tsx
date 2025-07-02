"use client"

import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Link } from "@inertiajs/react"
import {
  productVariationSchema,
  type ProductVariation,
  type Product,
  type ProductVariationFormData,
} from "@/validations/product-variation-schema"
import { ProductVariationForm } from "./Partials/ProductVariationForm"

interface ProductVariationEditProps {
  variation: ProductVariation
  products: Product[]
}

export default function ProductVariationEdit({ variation, products }: ProductVariationEditProps) {
  const form = useForm<ProductVariationFormData>({
    resolver: zodResolver(productVariationSchema),
    defaultValues: {
      product_id: variation.product_id,
      sku: variation.sku,
      barcode: variation.barcode || "",
      price: Number(variation.price),
      quantity: variation.quantity,
      in_stock: variation.in_stock,
      attributes: variation.attributes || {},
    },
  })

  const onSubmit = async (data: ProductVariationFormData) => {
    console.log("Update variation:", data)
    // Inertia.put(`/product-variations/${variation.id}`, data)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Link href="dashboard/product-variations">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Variations
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Product Variation</CardTitle>
          <CardDescription>Update the details of this product variation</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <ProductVariationForm
              products={products}
              initialAttributes={variation.attributes || {}}
              onSubmit={onSubmit}
              submitLabel="Update Variation"
            />
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  )
}
