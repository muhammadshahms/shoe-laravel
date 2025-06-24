import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import * as z from 'zod';
import route from 'ziggy-js';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const schema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    short_description: z.string().optional(),
    sku: z.string().optional(),
    barcode: z.string().optional(),
    brand_id: z.string().nullable().optional(),
    price: z.number().min(0),
    special_price: z.number().nullable().optional(),
    special_price_start: z.string().nullable().optional(),
    special_price_end: z.string().nullable().optional(),
    quantity: z.number().min(0),
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
            category_ids: product.categories?.map((c) => c.id.toString()) || [],
            brand_id: product.brand?.id?.toString() || '',
        },
    });

    const onSubmit = (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((v, i) => formData.append(`${key}[${i}]`, v));
            } else {
                formData.append(key, value ?? '');
            }
        });

        if (mainImage) formData.append('main_image', mainImage);
        gallery.forEach((file, index) => formData.append(`gallery[${index}]`, file));

        const isEditing = !!product?.id;
        const url = isEditing
            ? `/dashboard/products/${product.id}`
            : '/dashboard/products';

        router.visit(url, {
            method: isEditing ? 'put' : 'post',
            data: formData,
            forceFormData: true,
        });

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label>Name</Label>
                <Input {...register('name')} />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
                <Label>Price</Label>
                <Input type="number" step="0.01" {...register('price', { valueAsNumber: true })} />
            </div>

            <div>
                <Label>Quantity</Label>
                <Input type="number" {...register('quantity', { valueAsNumber: true })} />
            </div>

            <div>
                <Label>Brand</Label>
                <Controller
                    control={control}
                    name="brand_id"
                    render={({ field }) => (
                        <Select
                            value={field.value ?? ''}
                            onValueChange={(val) => field.onChange(val === 'null' ? null : val)}
                        >
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
                <Label>Categories</Label>
                <div className="grid grid-cols-2 gap-2">
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

            <Button type="submit">{product?.id ? 'Update' : 'Create'} Product</Button>
        </form>
    );
}
