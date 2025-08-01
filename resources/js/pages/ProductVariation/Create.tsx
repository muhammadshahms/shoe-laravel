"use client"

import type React from "react"

import { Link, useForm } from "@inertiajs/react"
import { ChevronLeft } from "lucide-react"
import type { ProductVariationCreateProps, ProductVariationFormData } from "./types"
import { Button } from "@/components/ui/button"
// import { toast } from "@/hooks/use-toast"
import ProductVariationForm from "./Partials/ProductVariationForm" // Import the new form component
import AppLayout from "@/layouts/app-layout"

export default function ProductVariationCreate({ products, attributes }: ProductVariationCreateProps) {
  const { data, setData, post, processing, errors } = useForm<ProductVariationFormData>({
    product_id: products[0]?.id || 0,
    sku: "",
    barcode: "",
    price: 0,
    quantity: 0,
    in_stock: true,
    attribute_option_ids: [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route("product-variations.store"), {
      // onSuccess: () => {
      //   toast({
      //     title: "Success!",
      //     description: "Product variation created successfully.",
      //   })
      // },
      // onError: (errors) => {
      //   toast({
      //     title: "Error!",
      //     description: "Failed to create product variation.",
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
                New Product Variation
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm" asChild>
                  <Link href={route("product-variations.index")}>Cancel</Link>
                </Button>
                <Button size="sm" onClick={handleSubmit} disabled={processing}>
                  Create Variation
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
                  Create Variation
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </AppLayout>
  )
}
