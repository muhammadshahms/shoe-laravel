"use client"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { Product, ProductVariationFormData } from "@/validations/product-variation-schema"

interface ProductVariationFormProps {
  products: Product[]
  initialAttributes?: Record<string, string>
  onSubmit: (data: ProductVariationFormData) => void
  submitLabel?: string
}

export function ProductVariationForm({
  products,
  initialAttributes = {},
  onSubmit,
  submitLabel = "Submit",
}: ProductVariationFormProps) {
  const form = useFormContext<ProductVariationFormData>()
  const [attributes, setAttributes] = useState<Record<string, string>>(initialAttributes)
  const [newKey, setNewKey] = useState("")
  const [newValue, setNewValue] = useState("")

  const addAttribute = () => {
    if (newKey && newValue) {
      setAttributes((prev) => ({ ...prev, [newKey]: newValue }))
      setNewKey("")
      setNewValue("")
    }
  }

  const removeAttribute = (key: string) => {
    setAttributes((prev) => {
      const copy = { ...prev }
      delete copy[key]
      return copy
    })
  }

  const handleSubmit = (data: ProductVariationFormData) => {
    onSubmit({
      ...data,
      attributes: Object.keys(attributes).length > 0 ? attributes : undefined,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="product_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product</FormLabel>
                <Select
                  onValueChange={(val) => field.onChange(Number.parseInt(val))}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input placeholder="Enter SKU" {...field} />
                </FormControl>
                <FormDescription>Unique identifier</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="barcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Barcode</FormLabel>
                <FormControl>
                  <Input placeholder="Enter barcode" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="in_stock"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">In Stock</FormLabel>
                  <FormDescription>Mark this variation as available</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Attributes</h3>
            <p className="text-sm text-muted-foreground">Add color, size, etc.</p>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Attribute name (e.g., Color)"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
            />
            <Input
              placeholder="Attribute value (e.g., Red)"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
            <Button type="button" onClick={addAttribute}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {Object.keys(attributes).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {Object.entries(attributes).map(([key, value]) => (
                <Badge key={key} variant="secondary" className="text-sm">
                  {key}: {value}
                  <button
                    type="button"
                    onClick={() => removeAttribute(key)}
                    className="ml-2 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Button type="submit">{submitLabel}</Button>
      </form>
    </Form>
  )
}
