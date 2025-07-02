import { z } from "zod"

export const productVariationSchema = z.object({
  product_id: z.number().min(1, "Product is required"),
  sku: z.string().min(1, "SKU is required"),
  barcode: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  quantity: z.number().int().min(0, "Quantity must be non-negative"),
  in_stock: z.boolean().default(true),
  attributes: z.record(z.string()).optional(),
})

export type ProductVariationFormData = z.infer<typeof productVariationSchema>

export interface ProductVariation {
  id: number
  product_id: number
  sku: string
  barcode?: string
  price: number
  quantity: number
  in_stock: boolean
  attributes?: Record<string, string>
  created_at: string
  updated_at: string
  product: {
    id: number
    name: string
  }
}

export interface Product {
  id: number
  name: string
}
