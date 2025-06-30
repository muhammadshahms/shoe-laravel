import AppLayout from '@/layouts/app-layout';
import ProductForm from './Partials/ProductForm';
import { router } from '@inertiajs/react';

export default function Create({ brands, categories }) {
    return (
        <AppLayout>
            <div className="p-6">

                <h2 className="text-2xl font-bold mb-4">Create Product</h2>
                <ProductForm
                    brands={brands}
                    categories={categories}
                    onSubmit={(data) => {
                        router.post('/dashboard/products', data);
                    }}
                />
            </div>
        </AppLayout>
    );
}
