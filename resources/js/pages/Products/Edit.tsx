import AppLayout from '@/layouts/app-layout';
import ProductForm from './Partials/ProductForm';
import { router } from '@inertiajs/react';

export default function Edit({ product, brands, categories }) {
  return (
    <AppLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        <ProductForm
          product={product}
          brands={brands}
          categories={categories}
          onSubmit={(data) => {
            router.post(`/dashboard/products/${product.slug}`, {
              _method: 'put',
              ...data,
            });
          }}
        />
      </div>
    </AppLayout>
  );
}
