import { z } from "zod"


export const productVariationSchema = z.object({
  product_id: z.number().min(1, "Product is required"),
  sku: z.string().min(1, "SKU is required"),
  barcode: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  quantity: z.number().int().min(0, "Quantity must be non-negative"),
  in_stock: z.boolean().default(true),

  // ✅ Replaced attributes with attribute_option_ids
  attribute_option_ids: z.array(z.number()).optional(),
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
  attribute_option_ids?: number[];

  product: {
    id: number
    name: string
  }

  created_at: string
  updated_at: string
}


export interface Product {
  id: number
  name: string
}
