import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { router } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductVariationFormValues, productVariationSchema } from '@/validations/product-variation-schema';
import { Checkbox } from '@/components/ui/checkbox';

export default function Create({ products }: { products: any[] }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductVariationFormValues>({
    resolver: zodResolver(productVariationSchema),
    defaultValues: {
      product_id: '',
      sku: '',
      barcode: '',
      price: 0,
      quantity: 0,
      in_stock: false,
      attributes: {},
    },
  });

  const onSubmit = (data: ProductVariationFormValues) => {
    router.post(route('product-variations.store'), data);
  };

  return (
    <AppLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="product">Product <span className="text-red-500">*</span></Label>
          <Select onValueChange={(value) => setValue('product_id', value)}>
            <SelectTrigger id="product">
              <SelectValue placeholder="Select Product" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.id} value={product.id.toString()}>
                  {product.name} ({product.id})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.product_id ? (
            <p className="text-red-500">{errors.product_id.message}</p>
          ) : (
            <p className="text-gray-500 text-sm">This field is required</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="sku">SKU <span className="text-red-500">*</span></Label>
          <Input id="sku" placeholder="SKU" {...register('sku')} />
          {errors.sku ? (
            <p className="text-red-500">{errors.sku.message}</p>
          ) : (
            <p className="text-gray-500 text-sm">This field is required</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="barcode">Barcode</Label>
          <Input id="barcode" placeholder="Barcode" {...register('barcode')} />
          {errors.barcode && <p className="text-red-500">{errors.barcode.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price <span className="text-red-500">*</span></Label>
          <Input id="price" type="number" placeholder="Price" {...register('price', { valueAsNumber: true })} />
          {errors.price ? (
            <p className="text-red-500">{errors.price.message}</p>
          ) : (
            <p className="text-gray-500 text-sm">This field is required and must be greater than zero</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity <span className="text-red-500">*</span></Label>
          <Input id="quantity" type="number" placeholder="Quantity" {...register('quantity', { valueAsNumber: true })} />
          {errors.quantity ? (
            <p className="text-red-500">{errors.quantity.message}</p>
          ) : (
            <p className="text-gray-500 text-sm">This field is required and must be zero or more</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="in_stock" className="flex items-center space-x-2">
            <Checkbox
              id="in_stock"
              checked={watch('in_stock')}
              onCheckedChange={(checked) => setValue('in_stock', !!checked)}
            />
            <span>In Stock</span>
          </Label>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          Save Variation
        </Button>
      </form>
    </AppLayout>
  );
}
