"use client"

import type React from "react"

import { Link, useForm } from "@inertiajs/react"
import { ChevronLeft } from "lucide-react"
import type { ProductVariationEditProps, ProductVariationFormData } from "./types"
// import { route } from "@/utils/route"
import { Button } from "@/components/ui/button"
// import { toast } from "@/hooks/use-toast"
import { useEffect } from "react"
import ProductVariationForm from "./Partials/ProductVariationForm" // Import the new form component
import AppLayout from "@/layouts/app-layout"

export default function ProductVariationEdit({
  variation,
  products,
  attributes,
  selectedOptionIds,
}: ProductVariationEditProps) {
  const { data, setData, put, processing, errors } = useForm<ProductVariationFormData>({
    product_id: variation.product_id,
    sku: variation.sku,
    barcode: variation.barcode || "",
    price: variation.price,
    quantity: variation.quantity,
    in_stock: variation.in_stock,
    attribute_option_ids: selectedOptionIds || [],
  })

  useEffect(() => {
    // Ensure initial data is set correctly, especially for attribute_option_ids
    setData({
      product_id: variation.product_id,
      sku: variation.sku,
      barcode: variation.barcode || "",
      price: variation.price,
      quantity: variation.quantity,
      in_stock: variation.in_stock,
      attribute_option_ids: selectedOptionIds || [],
    })
  }, [variation, selectedOptionIds])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    put(route("product-variations.update", variation.id), {
      // onSuccess: () => {
      //   toast({
      //     title: "Success!",
      //     description: "Product variation updated successfully.",
      //   })
      // },
      // onError: (errors) => {
      //   toast({
      //     title: "Error!",
      //     description: "Failed to update product variation.",
      //     variant: "destructive",
      //   })
      //   console.error(errors)
      // },
    })
  }

  const handleAttributeOptionChange = (optionId: number, checked: boolean) => {
    setData((prevData) => {
      const currentOptions = prevData.attribute_option_ids || []
      if (checked) {
        return { ...prevData, attribute_option_ids: [...currentOptions, optionId] }
      } else {
        return { ...prevData, attribute_option_ids: currentOptions.filter((id) => id !== optionId) }
      }
    })
  }

  return (
    <AppLayout>
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
                Edit Product Variation
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm" asChild>
                  <Link href={route("product-variations.index")}>Cancel</Link>
                </Button>
                <Button size="sm" onClick={handleSubmit} disabled={processing}>
                  Save Changes
                </Button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <ProductVariationForm
                data={data}
                setData={setData}
                products={products}
                attributes={attributes}
                errors={errors}
                handleAttributeOptionChange={handleAttributeOptionChange}
              />
              <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm" asChild>
                  <Link href={route("product-variations.index")}>Cancel</Link>
                </Button>
                <Button size="sm" onClick={handleSubmit} disabled={processing}>
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </AppLayout>
  )
}
