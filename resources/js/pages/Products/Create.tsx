import React from 'react';
import ProductForm from './Partials/ProductForm';
import AppLayout from '@/layouts/app-layout';
import { Props } from '@/validations/product-schema';

export default function Create({ brands, categories }: Props) {
    return (
        <AppLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Create Product</h1>
                <ProductForm brands={brands} categories={categories} />
            </div>
        </AppLayout>
    );
}
