import AppLayout from '@/layouts/app-layout';
import ProductForm from './Partials/ProductForm';
import { router, usePage } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';

const { breadcrumbs: rawBreadcrumbs } = usePage().props;

const breadcrumbs = (rawBreadcrumbs ?? []) as BreadcrumbItem[];
export default function Edit({ product, brands, categories, main_image_url, gallery_urls }: any) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        <ProductForm
          product={product}
          brands={brands}
          categories={categories}
          main_image_url={main_image_url}
          gallery_urls={gallery_urls}
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
