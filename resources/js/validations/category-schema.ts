import { z } from "zod"

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name must be less than 255 characters"),
  description: z.string().optional(),
  parent_id: z.string().optional(), // Remove nullable, use empty string instead
  position: z.coerce.number().optional(),
  is_active: z.boolean().optional(),
  image: z.any().optional(),
  remove_image: z.boolean().optional().default(false),
})

export type CategoryFormData = z.infer<typeof categorySchema>

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  parent_id?: number
  position?: number
  is_active: boolean
  image_url?: string
  parent?: Category
  children?: Category[]
  created_at: string
  updated_at: string
}
