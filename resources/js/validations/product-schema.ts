// File: schemas/productSchema.ts

import { z } from "zod";

export const brandSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Brand name is required"),
});

export const categorySchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Category name is required"),
});

export const baseProductSchema = z.object({
  id: z.number().optional(),
  slug: z.string().optional(),
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  short_description: z.string().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  brand: z
    .object({
      id: z.number(),
    })
    .optional(),
  price: z.preprocess(
    (val) => (val === '' || val === null || val === undefined ? undefined : val),
    z.number({ invalid_type_error: 'Price is required' }).positive("Price must be greater than zero")
  ),
  special_price: z.preprocess(
    (val) => {
      if (val === '' || val === null || val === undefined) return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    },
    z.number().positive("Special price must be greater than zero").optional()
  ).nullable().optional(),

  special_price_start: z.string().nullable().optional(),
  special_price_end: z.string().nullable().optional(),
  quantity: z.preprocess(
    (val) => {
      if (val === '' || val === null || val === undefined) return undefined;
      if (typeof val === 'number' && isNaN(val)) return undefined;
      return val;
    },
    z.number({ invalid_type_error: 'Quantity is required' })
      .min(0, "Quantity must be zero or more")
  ),

  in_stock: z.boolean().optional(),
  is_active: z.boolean().optional(),
  is_featured: z.boolean().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  meta_keywords: z.string().optional(),
  weight: z.string().optional(),
  dimensions: z.string().optional(),
  categories: z
    .array(
      z.object({
        id: z.number(),
      })
    )
    .optional(),
});

export const createProductSchema = baseProductSchema.extend({
  // Additional creation-specific validations if any
});

export const updateProductSchema = baseProductSchema.partial();

// ✅ Props schema for page validation

export const propsSchema = z.object({
  product: baseProductSchema.optional(),
  brands: z.array(brandSchema),
  categories: z.array(categorySchema),
  main_image_url: z.string().optional(),
  gallery_urls: z.array(z.string()).optional(),
});

// ✅ TypeScript inference

export type Brand = z.infer<typeof brandSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Product = z.infer<typeof baseProductSchema>;
export type Props = z.infer<typeof propsSchema>;
