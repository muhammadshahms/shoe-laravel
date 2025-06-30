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
import { 
    Category, 
    Product, 
    Props, 
    baseProductSchema, 
    updateProductSchema, 
    createProductSchema 
} from '@/validations/product-schema';

// Updated Props interface to match the schema
interface ProductFormProps {
    product?: Product;
    brands: Array<{ id: number; name: string }>;
    categories: Array<{ 
        id: number; 
        name: string; 
        children: Array<{ id: number; name: string }> 
    }>;
    main_image_url?: string;
    gallery_urls?: string[];
}

export default function ProductForm({ 
    product, 
    brands, 
    categories, 
    main_image_url = '', 
    gallery_urls = [] 
}: ProductFormProps) {
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [gallery, setGallery] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const isEditing = Boolean(product?.id);
    
    // Fix: Proper default values function
    function getDefaultProductValues(product?: Product): Partial<Product> {
        if (!product) {
            return {
                name: '',
                price: undefined,
                quantity: undefined,
                brand: undefined,
                categories: [],
                in_stock: false,
                is_active: true,
                is_featured: false,
            };
        }
        
        return {
            ...product,
            price: product.price ?? undefined,
            quantity: product.quantity ?? undefined,
            brand: product.brand ? { id: product.brand.id } : undefined,
            categories: product.categories || [],
            in_stock: product.in_stock ?? false,
            is_active: product.is_active ?? true,
            is_featured: product.is_featured ?? false,
            special_price: product.special_price ?? undefined,
            special_price_start: product.special_price_start ?? undefined,
            special_price_end: product.special_price_end ?? undefined,
        };
    }

    // Fix: Use correct schema based on edit/create mode
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Product>({
        resolver: zodResolver(isEditing ? updateProductSchema : createProductSchema),
        defaultValues: getDefaultProductValues(product),
    });

    // Fix: Proper form submission with correct data handling
    const onSubmit = (data: Product) => {
        const formData = new FormData();
        
        // Add method override for updates
        if (isEditing && product?.id) {
            formData.append('_method', 'PUT');
        }

        // Handle all form fields
        Object.entries(data).forEach(([key, value]) => {
            if (value === undefined || value === null) return;

            switch (key) {
                case 'brand':
                    if (value && typeof value === 'object' && 'id' in value) {
                        formData.append('brand_id', value.id.toString());
                    }
                    break;
                    
                case 'categories':
                    if (Array.isArray(value)) {
                        value.forEach((category) => {
                            if (category && typeof category === 'object' && 'id' in category) {
                                formData.append('categories[]', category.id.toString());
                            }
                        });
                    }
                    break;
                    
                case 'in_stock':
                case 'is_active':
                case 'is_featured':
                    formData.append(key, value ? '1' : '0');
                    break;
                    
                case 'price':
                case 'special_price':
                case 'quantity':
                case 'weight':
                    if (typeof value === 'number') {
                        formData.append(key, value.toString());
                    } else if (typeof value === 'string' && value.trim() !== '') {
                        formData.append(key, value);
                    }
                    break;
                    
                default:
                    if (typeof value === 'string' || typeof value === 'number') {
                        formData.append(key, String(value));
                    }
                    break;
            }
        });

        // Handle file uploads
        if (mainImage) {
            formData.append('main_image', mainImage);
        }
        
        gallery.forEach((file, index) => {
            formData.append(`gallery[${index}]`, file);
        });

        // Fix: Correct URL construction for updates
        const url = isEditing && product?.slug 
            ? `/dashboard/products/${product.slug}` 
            : '/dashboard/products';

        setIsSubmitting(true);
        
        router.visit(url, {
            method: 'post',
            data: formData,
            forceFormData: true,
            onSuccess: (page) => {
                console.log('Product saved successfully', page);
                // Reset file inputs
                setMainImage(null);
                setGallery([]);
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            },
            onFinish: () => {
                setIsSubmitting(false);
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Product Information */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name *</Label>
                            <Input 
                                id="name" 
                                placeholder="e.g. Red Leather Wallet" 
                                {...register('name')} 
                            />
                            <p className="text-xs text-muted-foreground">Enter a unique product name</p>
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sku">SKU</Label>
                            <Input 
                                id="sku" 
                                placeholder="e.g. RED-WALLET-001" 
                                {...register('sku')} 
                            />
                            <p className="text-xs text-muted-foreground">Stock Keeping Unit (optional)</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="barcode">Barcode</Label>
                            <Input 
                                id="barcode" 
                                placeholder="e.g. 1234567890123" 
                                {...register('barcode')} 
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Brand</Label>
                            <Controller
                                control={control}
                                name="brand"
                                render={({ field }) => {
                                    // Debug logging
                                    console.log('Brand field value:', field.value);
                                    console.log('Brands array:', brands);
                                    
                                    const currentValue = field.value?.id ? String(field.value.id) : "null";
                                    
                                    return (
                                        <Select
                                            value={currentValue}
                                            onValueChange={(val) => {
                                                console.log('Selected value:', val);
                                                if (val === "null") {
                                                    field.onChange(undefined);
                                                } else {
                                                    field.onChange({ id: parseInt(val) });
                                                }
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select brand" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="null">No brand</SelectItem>
                                                {brands && brands.length > 0 ? brands.map((brand) => (
                                                    <SelectItem 
                                                        key={`brand-${brand.id}`} 
                                                        value={String(brand.id)}
                                                    >
                                                        {brand.name}
                                                    </SelectItem>
                                                )) : (
                                                    <SelectItem value="loading" disabled>Loading brands...</SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Pricing & Inventory */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">Pricing & Inventory</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price *</Label>
                            <Input 
                                id="price" 
                                type="number" 
                                step="0.01" 
                                placeholder="e.g. 499.99" 
                                {...register('price', { valueAsNumber: true })} 
                            />
                            {errors.price && (
                                <p className="text-sm text-red-500">{errors.price.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="special_price">Special Price</Label>
                            <Input 
                                id="special_price" 
                                type="number" 
                                step="0.01" 
                                placeholder="e.g. 399.99" 
                                {...register('special_price', { valueAsNumber: true })} 
                            />
                            {errors.special_price && (
                                <p className="text-sm text-red-500">{errors.special_price.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="quantity">Quantity *</Label>
                            <Input 
                                id="quantity" 
                                type="number" 
                                placeholder="e.g. 100" 
                                {...register('quantity', { valueAsNumber: true })} 
                            />
                            {errors.quantity && (
                                <p className="text-sm text-red-500">{errors.quantity.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="special_price_start">Special Price Start</Label>
                            <Input 
                                id="special_price_start" 
                                type="date" 
                                {...register('special_price_start')} 
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="special_price_end">Special Price End</Label>
                            <Input 
                                id="special_price_end" 
                                type="date" 
                                {...register('special_price_end')} 
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input 
                                id="weight" 
                                type="number" 
                                step="0.01" 
                                placeholder="e.g. 1.25" 
                                {...register('weight')} 
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="dimensions">Dimensions</Label>
                        <Input 
                            id="dimensions" 
                            placeholder="e.g. 10x20x30 cm" 
                            {...register('dimensions')} 
                        />
                    </div>
                </div>

                {/* Product Description */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">Description</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                                id="description" 
                                placeholder="Detailed product description..." 
                                rows={4}
                                {...register('description')} 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="short_description">Short Description</Label>
                            <Textarea 
                                id="short_description" 
                                placeholder="Brief product summary..." 
                                rows={4}
                                {...register('short_description')} 
                            />
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">Categories</h2>
                    <div className="space-y-6">
                        {categories.map((parent) => (
                            <div key={parent.id}>
                                <h3 className="font-medium text-sm text-gray-700 mb-3">{parent.name}</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 ml-4">
                                    {parent.children?.map((child) => (
                                        <Controller
                                            key={child.id}
                                            control={control}
                                            name="categories"
                                            render={({ field }) => {
                                                const currentCategories = field.value || [];
                                                const isChecked = currentCategories.some(c => c.id === child.id);

                                                const handleChange = (checked: boolean) => {
                                                    let newCategories = [...currentCategories];
                                                    
                                                    if (checked) {
                                                        newCategories.push({ id: child.id });
                                                    } else {
                                                        newCategories = newCategories.filter(c => c.id !== child.id);
                                                    }
                                                    
                                                    field.onChange(newCategories);
                                                };

                                                return (
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`category-${child.id}`}
                                                            checked={isChecked}
                                                            onCheckedChange={handleChange}
                                                        />
                                                        <Label 
                                                            htmlFor={`category-${child.id}`} 
                                                            className="text-sm font-normal cursor-pointer"
                                                        >
                                                            {child.name}
                                                        </Label>
                                                    </div>
                                                );
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Status */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">Product Status</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <Controller
                            name="in_stock"
                            control={control}
                            render={({ field }) => (
                                <div className="flex items-center space-x-2">
                                    <Checkbox 
                                        id="in_stock"
                                        checked={field.value || false} 
                                        onCheckedChange={field.onChange} 
                                    />
                                    <Label htmlFor="in_stock" className="cursor-pointer">In Stock</Label>
                                </div>
                            )}
                        />
                        <Controller
                            name="is_active"
                            control={control}
                            render={({ field }) => (
                                <div className="flex items-center space-x-2">
                                    <Checkbox 
                                        id="is_active"
                                        checked={field.value || false} 
                                        onCheckedChange={field.onChange} 
                                    />
                                    <Label htmlFor="is_active" className="cursor-pointer">Active</Label>
                                </div>
                            )}
                        />
                        <Controller
                            name="is_featured"
                            control={control}
                            render={({ field }) => (
                                <div className="flex items-center space-x-2">
                                    <Checkbox 
                                        id="is_featured"
                                        checked={field.value || false} 
                                        onCheckedChange={field.onChange} 
                                    />
                                    <Label htmlFor="is_featured" className="cursor-pointer">Featured</Label>
                                </div>
                            )}
                        />
                    </div>
                </div>

                {/* SEO Metadata */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">SEO Metadata</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="meta_title">Meta Title</Label>
                            <Input 
                                id="meta_title" 
                                placeholder="SEO title for search engines" 
                                {...register('meta_title')} 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="meta_keywords">Meta Keywords</Label>
                            <Input 
                                id="meta_keywords" 
                                placeholder="comma, separated, keywords" 
                                {...register('meta_keywords')} 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="meta_description">Meta Description</Label>
                            <Textarea 
                                id="meta_description" 
                                placeholder="Brief description for search engines" 
                                rows={3}
                                {...register('meta_description')} 
                            />
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">Images</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="main_image">Main Image</Label>
                            <Input 
                                id="main_image"
                                type="file" 
                                accept="image/*"
                                onChange={(e) => setMainImage(e.target.files?.[0] || null)} 
                            />
                            {main_image_url && (
                                <div className="mt-2">
                                    <img 
                                        src={main_image_url} 
                                        alt="Current main image" 
                                        className="w-24 h-24 object-cover rounded border" 
                                    />
                                </div>
                            )}
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="gallery">Gallery Images</Label>
                            <Input 
                                id="gallery"
                                type="file" 
                                accept="image/*"
                                multiple 
                                onChange={(e) => setGallery(e.target.files ? Array.from(e.target.files) : [])} 
                            />
                            {gallery_urls && gallery_urls.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {gallery_urls.map((url, index) => (
                                        <img 
                                            key={index} 
                                            src={url} 
                                            alt={`Gallery image ${index + 1}`} 
                                            className="w-16 h-16 object-cover rounded border" 
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <Button 
                        type="submit" 
                        className="px-8 py-2" 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Processing...' : (isEditing ? 'Update Product' : 'Create Product')}
                    </Button>
                </div>
            </form>
        </div>
    );
}