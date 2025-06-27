import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    short_description: z.string().optional(),
    sku: z.string().optional(),
    barcode: z.string().optional(),
    brand_id: z.string().nullable().optional(),

    price: z.preprocess((val) => val === '' ? undefined : Number(val),
        z.number({ invalid_type_error: 'Price is required' }).min(0, 'Price must be ≥ 0')
    ),

    special_price: z.preprocess((val) => val === '' || val === null ? null : Number(val),
        z.number({ invalid_type_error: 'Special price must be a number' }).nullable().optional()
    ),

    special_price_start: z.string().nullable().optional(),
    special_price_end: z.string().nullable().optional(),

    quantity: z.preprocess((val) => val === '' ? undefined : Number(val),
        z.number({ invalid_type_error: 'Quantity is required' }).min(0, 'Quantity must be ≥ 0')
    ),

    in_stock: z.boolean().optional(),
    is_active: z.boolean().optional(),
    is_featured: z.boolean().optional(),

    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    meta_keywords: z.string().optional(),

    weight: z.preprocess((val) => val === '' || val === null ? null : Number(val),
        z.number({ invalid_type_error: 'Weight must be a number' }).nullable().optional()
    ),

    dimensions: z.string().optional(),
    category_ids: z.array(z.string()).optional(),
});


export type ProductFormData = z.infer<typeof productSchema>;