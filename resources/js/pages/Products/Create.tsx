import React from 'react';
import ProductForm from './Partials/ProductForm';
import AppLayout from '@/layouts/app-layout';

export default function Create({ brands, categories }) {
    return (
        <AppLayout>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Create Product</h1>
                <ProductForm brands={brands} categories={categories} />
            </div>
        </AppLayout>
    );
}
