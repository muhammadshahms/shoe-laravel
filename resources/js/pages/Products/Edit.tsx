import AppLayout from '@/layouts/app-layout'
import React from 'react'
import ProductForm from './Partials/ProductForm'

const Edit = ({ brands, categories }) => {
    return (
        <AppLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
                <ProductForm brands={brands} categories={categories} />
            </div>
        </AppLayout>
    )
}

export default Edit
