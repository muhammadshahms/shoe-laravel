import { z } from 'zod';

export const productVariationSchema = z.object({
  product_id: z.string().min(1, 'Product is required'),
  sku: z.string().min(1, 'SKU is required'),
  barcode: z.string().optional(),
  price: z.coerce.number().positive('Price must be greater than zero'),
  quantity: z.coerce.number().int().nonnegative('Quantity must be zero or more'),
  in_stock: z.boolean(),
  attributes: z.record(z.any()).optional(),
});

export type ProductVariationFormValues = z.infer<typeof productVariationSchema>;
