"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { ProductVariationFormData, Product, Attribute } from "./../types"

interface ProductVariationFormProps {
  data: ProductVariationFormData
  setData: (key: keyof ProductVariationFormData, value: any) => void
  products: Product[]
  attributes: Attribute[]
  errors: Partial<Record<keyof ProductVariationFormData, string>>
  handleAttributeOptionChange: (optionId: number, checked: boolean) => void
}

export default function ProductVariationForm({
  data,
  setData,
  products,
  attributes,
  errors,
  handleAttributeOptionChange,
}: ProductVariationFormProps) {
  return (
    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Variation Details</CardTitle>
          <CardDescription>Basic information about the product variation.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="product_id">Product</Label>
            <Select
              value={data.product_id.toString()}
              onValueChange={(value) => setData("product_id", Number.parseInt(value))}
            >
              <SelectTrigger id="product_id">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.product_id && <p className="text-sm text-red-500">{errors.product_id}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              type="text"
              placeholder="Enter SKU"
              value={data.sku}
              onChange={(e) => setData("sku", e.target.value)}
            />
            {errors.sku && <p className="text-sm text-red-500">{errors.sku}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="barcode">Barcode (Optional)</Label>
            <Input
              id="barcode"
              type="text"
              placeholder="Enter barcode"
              value={data.barcode || ""}
              onChange={(e) => setData("barcode", e.target.value)}
            />
            {errors.barcode && <p className="text-sm text-red-500">{errors.barcode}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={data.price}
                onChange={(e) => setData("price", Number.parseFloat(e.target.value))}
              />
              {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                step="1"
                placeholder="0"
                value={data.quantity}
                onChange={(e) => setData("quantity", Number.parseInt(e.target.value))}
              />
              {errors.quantity && <p className="text-sm text-red-500">{errors.quantity}</p>}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in_stock"
              checked={data.in_stock}
              onCheckedChange={(checked) => setData("in_stock", Boolean(checked))}
            />
            <Label htmlFor="in_stock">In Stock</Label>
            {errors.in_stock && <p className="text-sm text-red-500">{errors.in_stock}</p>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attributes</CardTitle>
          <CardDescription>Select attribute options for this variation.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {attributes.map((attribute) => (
            <div key={attribute.id} className="grid gap-2">
              <Label className="font-semibold">{attribute.name }</Label>
              <div className="flex flex-wrap gap-4">
                {attribute.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <pre className="text-sm text-gray-500">{option.label}</pre>
                    <pre className="text-sm text-gray-500">({option.value})</pre>
                    <Checkbox
                      id={`option-${option.id}`}
                      checked={data.attribute_option_ids?.includes(option.id)}
                      onCheckedChange={(checked) => handleAttributeOptionChange(option.id, Boolean(checked))}
                    />
                    <Label htmlFor={`option-${option.id}`}>{option.name}</Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {errors.attribute_option_ids && <p className="text-sm text-red-500">{errors.attribute_option_ids}</p>}
        </CardContent>
      </Card>
    </div>
  )
}
