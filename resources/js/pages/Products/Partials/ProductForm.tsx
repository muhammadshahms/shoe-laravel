import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import * as z from 'zod';
import route from 'ziggy-js';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    short_description: z.string().optional(),
    sku: z.string().optional(),
    barcode: z.string().optional(),
    brand_id: z.string().nullable().optional(),
    price: z.number().min(0, 'Price must be ≥ 0'),
    special_price: z.number().nullable().optional(),
    special_price_start: z.string().nullable().optional(),
    special_price_end: z.string().nullable().optional(),
    quantity: z.number().min(0, 'Quantity must be ≥ 0'),
    in_stock: z.boolean().optional(),
    is_active: z.boolean().optional(),
    is_featured: z.boolean().optional(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    meta_keywords: z.string().optional(),
    weight: z.number().nullable().optional(),
    dimensions: z.string().optional(),
    category_ids: z.array(z.string()).optional(),
});

export default function ProductForm({ product = {}, brands = [], categories = [], mainImageUrl = '', galleryUrls = [] }) {
    const [mainImage, setMainImage] = useState(null);
    const [gallery, setGallery] = useState([]);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            ...product,
            price: product.price ?? 0,
            quantity: product.quantity ?? 0,
            brand_id: product.brand?.id?.toString() || '',
            category_ids: product.categories?.map((c) => c.id.toString()) || [],
            in_stock: product.in_stock ?? false,
            is_active: product.is_active ?? true,
            is_featured: product.is_featured ?? false,
        },
    });

    const onSubmit = (data) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((v, i) => formData.append(`${key}[${i}]`, parseInt(v)));
            } else if (typeof value === 'boolean') {
                formData.append(key, value ? '1' : '0');
            } else if (key === 'brand_id' && value) {
                formData.append('brand_id', parseInt(value));
            } else {
                formData.append(key, value ?? '');
            }
        });

        if (mainImage) {
            formData.append('main_image', mainImage);
        }

        gallery.forEach((file, index) => {
            formData.append(`gallery[${index}]`, file);
        });

        const isEditing = !!product?.slug;
        const url = isEditing
            ? `/dashboard/products/${product.slug}`
            : '/dashboard/products';

        router.visit(url, {
            method: isEditing ? 'put' : 'post',
            data: formData,
            forceFormData: true,
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" {...register('name')} />
                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input id="sku" {...register('sku')} />
                </div>

                <div>
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input id="barcode" {...register('barcode')} />
                </div>

                <div>
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" type="number" step="0.01" {...register('price', { valueAsNumber: true })} />
                </div>

                <div>
                    <Label>Special Price</Label>
                    <Input type="number" step="0.01" {...register('special_price', { valueAsNumber: true })} />
                </div>

                <div>
                    <Label>Quantity</Label>
                    <Input type="number" {...register('quantity', { valueAsNumber: true })} />
                </div>

                <div>
                    <Label>Special Price Start</Label>
                    <Input type="date" {...register('special_price_start')} />
                </div>

                <div>
                    <Label>Special Price End</Label>
                    <Input type="date" {...register('special_price_end')} />
                </div>

                <div>
                    <Label>Brand</Label>
                    <Controller
                        control={control}
                        name="brand_id"
                        render={({ field }) => (
                            <Select value={field.value ?? ''} onValueChange={(val) => field.onChange(val === 'null' ? null : val)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="null">None</SelectItem>
                                    {brands.map((brand) => (
                                        <SelectItem key={brand.id} value={brand.id.toString()}>
                                            {brand.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>

                <div>
                    <Label>Weight</Label>
                    <Input type="number" step="0.01" {...register('weight', { valueAsNumber: true })} />
                </div>

                <div>
                    <Label>Dimensions</Label>
                    <Input {...register('dimensions')} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label>Description</Label>
                    <Textarea {...register('description')} />
                </div>

                <div>
                    <Label>Short Description</Label>
                    <Textarea {...register('short_description')} />
                </div>
            </div>

            <div>
                <Label>Categories</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                    {categories.map((cat) => (
                        <label key={cat.id} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value={cat.id}
                                {...register('category_ids')}
                                defaultChecked={product.categories?.some((c) => c.id === cat.id)}
                            />
                            <span>{cat.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Controller
                    name="in_stock"
                    control={control}
                    render={({ field }) => (
                        <label className="flex items-center gap-2">
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            <span>In Stock</span>
                        </label>
                    )}
                />
                <Controller
                    name="is_active"
                    control={control}
                    render={({ field }) => (
                        <label className="flex items-center gap-2">
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            <span>Active</span>
                        </label>
                    )}
                />
                <Controller
                    name="is_featured"
                    control={control}
                    render={({ field }) => (
                        <label className="flex items-center gap-2">
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            <span>Featured</span>
                        </label>
                    )}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <Label>Meta Title</Label>
                    <Input {...register('meta_title')} />
                </div>
                <div>
                    <Label>Meta Description</Label>
                    <Textarea {...register('meta_description')} />
                </div>
                <div>
                    <Label>Meta Keywords</Label>
                    <Input {...register('meta_keywords')} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label>Main Image</Label>
                    <Input type="file" onChange={(e) => setMainImage(e.target.files[0])} />
                    {mainImageUrl && <img src={mainImageUrl} alt="Main" className="w-24 mt-2 rounded" />}
                </div>

                <div>
                    <Label>Gallery Images</Label>
                    <Input type="file" multiple onChange={(e) => setGallery([...e.target.files])} />
                    {galleryUrls?.length > 0 && (
                        <div className="flex gap-2 mt-2">
                            {galleryUrls.map((url, i) => (
                                <img key={i} src={url} className="w-16 rounded" alt={`gallery-${i}`} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Button type="submit" className="w-full mt-6">
                {product?.slug ? 'Update' : 'Create'} Product
            </Button>
        </form>
    );
}
