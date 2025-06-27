import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import * as z from 'zod';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Brand, Category, Product, Props } from '@/types/product';
import { productSchema, ProductFormData } from '@/validations/product-schema';
export default function ProductForm({ product = {}, brands, categories, mainImageUrl = '', galleryUrls = [] }: Props) {
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [gallery, setGallery] = useState<File[]>([]);
    function getDefaultProductValues(product: Partial<Product>) {
        return {
            ...product,
            price: product.price ?? undefined,
            quantity: product.quantity ?? undefined,
            brand_id: product.brand?.id?.toString() ?? undefined,
            category_ids: product.categories?.map((c) => c.id.toString()) ?? [],
            in_stock: product.in_stock ?? false,
            is_active: product.is_active ?? true,
            is_featured: product.is_featured ?? false,
        };
    }

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: getDefaultProductValues(product),
    });



const onSubmit = (data: z.infer<typeof productSchema>) => {
    const formData = new FormData();

    // Laravel expects _method field for PUT/PATCH requests in multipart/form-data
    const isEditing = !!product?.slug;
    if (isEditing) {
        formData.append('_method', 'PUT');
    }

    Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((v, i) => formData.append(`${key}[${i}]`, String(parseInt(v))));
        } else if (typeof value === 'boolean') {
            formData.append(key, value ? '1' : '0');
        } else if (key === 'brand_id' && value) {
            formData.append('brand_id', String(parseInt(String(value))));
        } else {
            formData.append(key, value != null ? String(value) : '');
        }
    });

    if (mainImage) {
        formData.append('main_image', mainImage);
    }

    gallery.forEach((file, index) => {
        formData.append(`gallery[${index}]`, file);
    });

    const url = isEditing
        ? `/dashboard/products/${product.slug}`
        : '/dashboard/products';

    router.visit(url, {
        method: isEditing ? 'post' : 'post',
        data: formData,
        forceFormData: true,
    });
};

return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="e.g. Red Leather Wallet" {...register('name')} />
                <p className="text-xs text-muted-foreground mt-1">Enter a unique product name.</p>
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" placeholder="e.g. RED-WALLET-001" {...register('sku')} />
                <p className="text-xs text-muted-foreground mt-1">Unique inventory code (optional)</p>
            </div >
            <div className='space-y-2'>
                <Label htmlFor="barcode">Barcode</Label>
                <Input id="barcode" placeholder="e.g. 1234567890123" {...register('barcode')} />
                <p className="text-xs text-muted-foreground mt-1">Scannable product code (optional)</p>
            </div>
            <div className='space-y-2'>
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" step="0.01" placeholder="e.g. 499.99" {...register('price', { valueAsNumber: true })} />
                <p className="text-xs text-muted-foreground mt-1">Set the product's selling price.</p>
                {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>}
            </div>
            <div className='space-y-2'>
                <Label>Special Price</Label>
                <Input type="number" step="0.01" placeholder="e.g. 399.99 (optional)" {...register('special_price', { valueAsNumber: true })} />
            </div>
            <div className='space-y-2'>
                <Label>Quantity</Label>
                <Input type="number" placeholder="e.g. 100" {...register('quantity', { valueAsNumber: true })} />
                <p className="text-xs text-muted-foreground mt-1">Enter available stock quantity.</p>
                {errors.quantity && <p className="text-sm text-red-500 mt-1">{errors.quantity.message}</p>}
            </div>
            <div className='space-y-2'>
                <Label>Special Price Start</Label>
                <Input type="date" {...register('special_price_start')} />
            </div>
            <div className='space-y-2'>
                <Label>Special Price End</Label>
                <Input type="date" {...register('special_price_end')} />
            </div>
            <div className='space-y-2'>
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
            <div className='space-y-2'>
                <Label>Weight</Label>
                <Input type="number" step="0.01" placeholder="e.g. 1.25" {...register('weight', { valueAsNumber: true })} />
            </div>
            <div className='space-y-2'>
                <Label>Dimensions</Label>
                <Input placeholder="e.g. 10x20x30 cm" {...register('dimensions')} />
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Detailed product description..." {...register('description')} />
            </div>
            <div className="space-y-2">
                <Label>Short Description</Label>
                <Textarea placeholder="e.g. Compact leather wallet for men..." {...register('short_description')} />
            </div>
        </div>
        <div className="space-y-2">
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
        </div >
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            <div className="space-y-2">
                <Label>Meta Title</Label>
                <Input placeholder="e.g. Buy Red Leather Wallet Online" {...register('meta_title')} />
            </div>
            <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea placeholder="e.g. High-quality wallet, genuine leather, perfect for gifting" {...register('meta_description')} />
            </div>
            <div className="space-y-2">
                <Label>Meta Keywords</Label>
                <Input placeholder="e.g. wallet, leather, gift, red" {...register('meta_keywords')} />
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label>Main Image</Label>
                <Input type="file" onChange={(e) => setMainImage(e.target.files && e.target.files[0] ? e.target.files[0] : null)} />
                {mainImageUrl && <img src={mainImageUrl} alt="Main" className="w-24 mt-2 rounded" />}
            </div>
            <div className="space-y-2">
                <Label>Gallery Images</Label>
                <Input type="file" multiple onChange={(e) => setGallery(e.target.files ? Array.from(e.target.files) : [])} />
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
