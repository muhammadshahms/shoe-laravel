'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import DeleteAlert from '@/components/Global/DeleteAlert';
import { X } from 'lucide-react';

const productSchema = z.object({
    name: z.string().min(1, 'Product name is required'),

    // Price and quantity must not be empty, must be numbers ≥ 0
    price: z
        .preprocess((val) => (val === '' ? undefined : Number(val)), z
            .number({ invalid_type_error: 'Price is required' })
            .min(0, 'Price must be at least 0')),

    quantity: z
        .preprocess((val) => (val === '' ? undefined : Number(val)), z
            .number({ invalid_type_error: 'Quantity is required' })
            .min(0, 'Quantity must be at least 0')),


    description: z.string().optional(),
    short_description: z.string().optional(),
    sku: z.string().optional(),
    barcode: z.string().optional(),
    brand_id: z.string().optional(),
    special_price: z.coerce.number().min(0).optional(),
    special_price_start: z.string().optional(),
    special_price_end: z.string().optional(),
    in_stock: z.boolean().default(false),
    is_active: z.boolean().default(true),
    is_featured: z.boolean().default(false),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    meta_keywords: z.string().optional(),
    weight: z.string().optional(),
    dimensions: z.string().optional(),
    category_ids: z.array(z.string()).optional(),
    main_image: z.any().optional(),
    gallery: z
        .any()
        .refine(
            (files) => !files || files.length <= 8,
            { message: 'You can upload up to 8 images only.' }
        )
        .optional(),
});

type ProductFormProps = {
    product?: any;
    categories: any[];
    brands: { id: number; name: string }[];
    main_image_url: string;
    gallery_urls: any[];
    onSubmit: (data: any) => void;
};

export default function ProductForm({
    product,
    categories,
    brands,
    main_image_url,
    gallery_urls,
    onSubmit,
}: ProductFormProps) {
    const [mainImagePreview, setMainImagePreview] = useState<string | null>(main_image_url || null);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>(gallery_urls || []);
    const form = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: product?.name || '',
            price: product?.price?.toString() || '',         // ← Make string, not 0
            quantity: product?.quantity?.toString() || '',   // ← Make string, not 0
            description: product?.description || '',
            short_description: product?.short_description || '',
            sku: product?.sku || '',
            barcode: product?.barcode || '',
            brand_id: product?.brand_id?.toString() || '',
            special_price: product?.special_price || undefined,
            special_price_start: product?.special_price_start || '',
            special_price_end: product?.special_price_end || '',
            in_stock: product?.in_stock || false,
            is_active: product?.is_active || true,
            is_featured: product?.is_featured || false,
            meta_title: product?.meta_title || '',
            meta_description: product?.meta_description || '',
            meta_keywords: product?.meta_keywords || '',
            weight: product?.weight || '',
            dimensions: product?.dimensions || '',
            main_image: undefined,
            gallery: undefined,


            category_ids:
                product?.categories?.map((cat: any) => cat.id.toString()) || [],
        },
    });

    const selectedCategories = form.watch('category_ids') || [];
    const [removedMainImage, setRemovedMainImage] = useState(false);
    const [removedGalleryIndexes, setRemovedGalleryIndexes] = useState<number[]>([]);
    const toggleCategory = (id: string) => {
        const current = new Set(selectedCategories);
        current.has(id) ? current.delete(id) : current.add(id);
        form.setValue('category_ids', Array.from(current));
    };
    const handleSubmitForm = (values: any) => {
        onSubmit({
            ...values,
            removedMainImage,
            removedGalleryIndexes,
        });
    };

    const handleImageRemove = () => {
        setMainImagePreview(null);
        setRemovedMainImage(true);
        form.setValue('main_image', undefined);
    };

    const handleGalleryImageRemove = (i) => {
        setGalleryPreviews((prev) => prev.filter((_, index) => index !== i));
        setRemovedGalleryIndexes((prev) => [...prev, i]);

        const galleryFiles = Array.from(form.getValues('gallery') || []);
        galleryFiles.splice(i, 1);
        form.setValue('gallery', galleryFiles.length ? galleryFiles : undefined);
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmitForm)}
                className="space-y-6"
                encType="multipart/form-data"
            >
                <Tabs defaultValue="general" className="w-full">
                    <TabsList className="mb-4">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="seo">SEO</TabsTrigger>
                    </TabsList>

                    {/* ------------------- GENERAL ------------------- */}
                    <TabsContent value="general" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Product Name <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
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
                                        <FormLabel>
                                            Price <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="nuumber" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="brand_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Brand</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select brand" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {brands.map((brand) => (
                                                        <SelectItem
                                                            key={brand.id}
                                                            value={brand.id.toString()}
                                                        >
                                                            {brand.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
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
                                        <FormLabel>
                                            Quantity <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="special_price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Special Price</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea rows={4} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div>
                            <FormLabel>Categories</FormLabel>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                                {categories.map((parent) => (
                                    <div key={parent.id}>
                                        <div className="font-medium">{parent.name}</div>
                                        {parent.children.map((child: any) => (
                                            <div
                                                key={child.id}
                                                className="flex items-center space-x-2"
                                            >
                                                <Checkbox
                                                    id={`cat-${child.id}`}
                                                    checked={selectedCategories.includes(
                                                        child.id.toString()
                                                    )}
                                                    onCheckedChange={() =>
                                                        toggleCategory(child.id.toString())
                                                    }
                                                />
                                                <label
                                                    htmlFor={`cat-${child.id}`}
                                                    className="text-sm"
                                                >
                                                    {child.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <FormField
                                    control={form.control}
                                    name="main_image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Main Image</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            field.onChange(file);
                                                            setMainImagePreview(URL.createObjectURL(file));
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            {mainImagePreview && (
                                                <div className="mt-2 relative w-fit">
                                                    <img
                                                        src={mainImagePreview}
                                                        alt="Main Image Preview"
                                                        className="w-32 h-32 object-cover border rounded"
                                                    />

                                                    <DeleteAlert
                                                        title="Remove image?"
                                                        description="Are you sure you want to remove this image?"
                                                        confirmText="Remove"
                                                        onConfirm={handleImageRemove}
                                                        icon={<X className='w-3 h-3' />}
                                                        triggerClassName="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                                        isLoading={false}
                                                    />

                                                </div>
                                            )}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="gallery"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Gallery</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    disabled={galleryPreviews.length >= 8}
                                                    onChange={(e) => {
                                                        const selectedFiles = Array.from(e.target.files || []);
                                                        const existingPreviews = galleryPreviews.length;

                                                        if (selectedFiles.length + existingPreviews > 8) {
                                                            form.setError("gallery", {
                                                                type: "manual",
                                                                message: "You can upload up to 8 images only.",
                                                            });
                                                            return;
                                                        }

                                                        form.clearErrors("gallery");

                                                        const previews = selectedFiles.map((file) =>
                                                            URL.createObjectURL(file)
                                                        );
                                                        setGalleryPreviews((prev) => [...prev, ...previews]);

                                                        const dt = new DataTransfer();
                                                        const currentFiles = Array.from(form.getValues("gallery") || []);
                                                        [...currentFiles, ...selectedFiles].forEach((file) =>
                                                            dt.items.add(file)
                                                        );
                                                        form.setValue("gallery", dt.files, { shouldDirty: true });
                                                    }}
                                                />
                                            </FormControl>
                                            {galleryPreviews.length > 0 && (
                                                <div className="flex gap-2 mt-2 flex-wrap">
                                                    {galleryPreviews.map((url, i) => (
                                                        <div key={i} className="relative w-fit">
                                                            <img
                                                                src={url}
                                                                alt={`Gallery Image ${i + 1}`}
                                                                className="w-20 h-20 object-cover border rounded"
                                                            />
                                                            <DeleteAlert
                                                                icon={<X className='w-3 h-3' />}
                                                                triggerClassName="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                                                isLoading={false}
                                                                title="Remove gallery image?"
                                                                description="Are you sure you want to remove this image from the gallery?"
                                                                confirmText="Yes, remove"
                                                                onConfirm={() => handleGalleryImageRemove(i)}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {galleryPreviews.length} / 8 images uploaded
                                            </p>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 mt-4">
                            {['is_active', 'is_featured', 'in_stock'].map((fieldName) => (
                                <FormField
                                    key={fieldName}
                                    control={form.control}
                                    name={fieldName as any}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal capitalize">
                                                {fieldName.replace('_', ' ')}
                                            </FormLabel>
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    {/* ------------------- SEO ------------------- */}
                    <TabsContent value="seo" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="meta_title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Meta Title</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slug</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="meta_description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Meta Description</FormLabel>
                                    <FormControl>
                                        <Textarea rows={4} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="meta_keywords"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Meta Keywords</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </TabsContent>
                </Tabs>

                <Button type="submit">Save</Button>
            </form>
        </Form>
    );
}
