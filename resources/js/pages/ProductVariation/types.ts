import { z } from "zod"

// Provided Zod schema and types
export const productVariationSchema = z.object({
  product_id: z.number().min(1, "Product is required"),
  sku: z.string().min(1, "SKU is required"),
  barcode: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  quantity: z.number().int().min(0, "Quantity must be non-negative"),
  in_stock: z.boolean().default(true),
  attribute_option_ids: z.array(z.number()).optional(),
})

export type ProductVariationFormData = z.infer<typeof productVariationSchema>

export interface Product {
  id: number
  name: string
}

export interface AttributeOption {
  id: number
  attribute_id: number
  name: string
  attribute?: Attribute // Nested attribute for display
}

export interface Attribute {
  id: number
  name: string
  options: AttributeOption[]
}

export interface ProductVariation {
  id: number
  product_id: number
  sku: string
  barcode?: string
  price: number
  quantity: number
  in_stock: boolean
  attribute_option_ids?: number[]
  product: Product // Relationship loaded by Laravel
  attribute_options: AttributeOption[] // Relationship loaded by Laravel
  created_at: string
  updated_at: string
}

// Inertia.js pagination links
export interface InertiaLink {
  url: string | null
  label: string
  active: boolean
}

// Inertia.js pagination meta
export interface InertiaMeta {
  current_page: number
  from: number
  last_page: number
  links: InertiaLink[]
  path: string
  per_page: number
  to: number
  total: number
}

// Props for Index page
export interface ProductVariationIndexProps {
  variations: {
    data: ProductVariation[]
    links: InertiaLink[]
    meta: InertiaMeta
  }
}

// Props for Create page
export interface ProductVariationCreateProps {
  products: Product[]
  attributes: Attribute[]
}

// Props for Edit page
export interface ProductVariationEditProps {
  variation: ProductVariation
  products: Product[]
  attributes: Attribute[]
  selectedOptionIds: number[]
}

// Props for Show page
export interface ProductVariationShowProps {
  variation: ProductVariation
}
    