import { z } from "zod"

export const brandSchema = z.object({
  name: z.string().min(1, "Brand name is required"),
  description: z.string().optional(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  position: z.number().min(0, "Position must be 0 or greater"),
  is_active: z.boolean(),
  logo: z.instanceof(File).optional(),
  remove_logo: z.boolean().optional(),
})

export type BrandFormData = z.infer<typeof brandSchema>

export interface Brand {
  id: number
  name: string
  description: string | null
  website: string | null
  position: number | null
  is_active: boolean
  slug: string
  logo_url?: string | null
}
