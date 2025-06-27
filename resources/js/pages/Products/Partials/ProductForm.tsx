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
import { Category, Product, Props, baseProductSchema } from '@/validations/product-schema';

export default function ProductForm({ product, brands, categories, mainImageUrl = '', galleryUrls = [] }: Props) {
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [gallery, setGallery] = useState<File[]>([]);

    function getDefaultProductValues(product: Partial<Product>) {
        return {
            ...product,
            price: product.price ?? undefined,
            quantity: product.quantity ?? undefined,
            brand_id: product.brand?.id?.toString() ?? undefined,
            category_ids: categories?.map((c : Category) => c.id.toString()) ?? [],
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
    } = useForm<Product>({
        resolver: zodResolver(baseProductSchema),
        defaultValues: getDefaultProductValues(product ?? {}),
    });

    const onSubmit = (data: z.infer<typeof baseProductSchema>) => {
        const formData = new FormData();
        const isEditing = !!product?.slug;

        if (isEditing) formData.append('_method', 'PUT');

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

        const url = isEditing ? `/dashboard/products/${product.slug}` : '/dashboard/products';

        router.visit(url, {
            method: 'post',
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
                    <Label htmlFor="sku">SKU <span className="text-muted-foreground text-xs">(optional)</span></Label>
                    <Input id="sku" placeholder="e.g. RED-WALLET-001" {...register('sku')} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="barcode">Barcode <span className="text-muted-foreground text-xs">(optional)</span></Label>
                    <Input id="barcode" placeholder="e.g. 1234567890123" {...register('barcode')} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" type="number" step="0.01" placeholder="e.g. 499.99" {...register('price', { valueAsNumber: true })} />
                    <p className="text-xs text-muted-foreground mt-1">Set the product's selling price.</p>
                    {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Special Price <span className="text-muted-foreground text-xs">(optional)</span></Label>
                    <Input type="number" step="0.01" placeholder="e.g. 399.99" {...register('special_price', { valueAsNumber: true })} />
                </div>

                <div className="space-y-2">
                    <Label>Quantity</Label>
                    <Input type="number" placeholder="e.g. 100" {...register('quantity', { valueAsNumber: true })} />
                    <p className="text-xs text-muted-foreground mt-1">Enter available stock quantity.</p>
                    {errors.quantity && <p className="text-sm text-red-500 mt-1">{errors.quantity.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Special Price Start <span className="text-muted-foreground text-xs">(optional)</span></Label>
                    <Input type="date" {...register('special_price_start')} />
                </div>

                <div className="space-y-2">
                    <Label>Special Price <span className="text-muted-foreground text-xs">(optional)</span></Label>
                    <Input
                        type="number"
                        step="0.01"
                        placeholder="e.g. 399.99"
                        {...register('special_price')}
                    />
                    {errors.special_price && (
                        <p className="text-sm text-red-500 mt-1">{errors.special_price.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label>Brand <span className="text-muted-foreground text-xs">(optional)</span></Label>
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

                <div className="space-y-2">
                    <Label>Weight <span className="text-muted-foreground text-xs">(optional)</span></Label>
                    <Input
                        type="number"
                        step="0.01"
                        placeholder="e.g. 1.25"
                        {...register('weight')}
                    />
                    {errors.weight && (
                        <p className="text-sm text-red-500 mt-1">{errors.weight.message}</p>
                    )}
                </div>


                <div className="space-y-2">
                    <Label>Dimensions <span className="text-muted-foreground text-xs">(optional)</span></Label>
                    <Input placeholder="e.g. 10x20x30 cm" {...register('dimensions')} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Description <span className="text-muted-foreground text-xs">(optional)</span></Label>
                    <Textarea placeholder="Detailed product description..." {...register('description')} />
                </div>
                <div className="space-y-2">
                    <Label>Short Description <span className="text-muted-foreground text-xs">(optional)</span></Label>
                    <Textarea placeholder="e.g. Compact leather wallet for men..." {...register('short_description')} />
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-base font-semibold">Categories</Label>

                <div className="space-y-5">
                    {categories.map((parent) => (
                        <div key={parent.id}>
                            <div className="mb-2 text-sm font-medium text-muted-foreground">{parent.name}</div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 ml-2">
                                {parent.children.map((child) => {
                                    const checkboxId = `category-${child.id}`
                                    return (
                                        <Controller
                                            key={checkboxId}
                                            control={control}
                                            name="category_ids"
                                            render={({ field }) => {
                                                const isChecked = field.value?.includes(child.id.toString())

                                                const handleChange = (checked: boolean) => {
                                                    const newValue = new Set(field.value || [])
                                                    if (checked) {
                                                        newValue.add(child.id.toString())
                                                    } else {
                                                        newValue.delete(child.id.toString())
                                                    }
                                                    field.onChange(Array.from(newValue))
                                                }

                                                return (
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={checkboxId}
                                                            checked={isChecked}
                                                            onCheckedChange={handleChange}
                                                        />
                                                        <Label htmlFor={checkboxId} className="text-sm font-normal">
                                                            {child.name}
                                                        </Label>
                                                    </div>
                                                )
                                            }}
                                        />
                                    )
                                })}
                            </div>
                        </div>
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
                <div className="space-y-2">
                    <Label>Meta Title <span className="text-muted-foreground text-xs">(optional)</span></Label>
                    <Input placeholder="e.g. Buy Red Leather Wallet Online" {...register('meta_title')} />
                </div>
                <div className="space-y-2">
                    <Label>Meta Description <span className="text-muted-foreground text-xs">(optional)</span></Label>
                    <Textarea placeholder="e.g. High-quality wallet, genuine leather, perfect for gifting" {...register('meta_description')} />
                </div>
                <div className="space-y-2">
                    <Label>Meta Keywords <span className="text-muted-foreground text-xs">(optional)</span></Label>
                    <Input placeholder="e.g. wallet, leather, gift, red" {...register('meta_keywords')} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Main Image <span className="text-muted-foreground text-xs">(optional)</span></Label>
                    <Input type="file" onChange={(e) => setMainImage(e.target.files?.[0] ?? null)} />
                    {mainImageUrl && <img src={mainImageUrl} alt="Main" className="w-24 mt-2 rounded" />}
                </div>
                <div className="space-y-2">
                    <Label>Gallery Images <span className="text-muted-foreground text-xs">(optional)</span></Label>
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
