import AppLayout from '@/layouts/app-layout'
import React from 'react'
import ProductForm from './Partials/ProductForm'

interface Props {
  product: any
  brands: any[]
  categories: any[]
  main_image_url: string
  gallery_urls: string[]
}

const Edit = ({ product, brands, categories, main_image_url, gallery_urls }: Props) => {
  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
        <ProductForm
          product={product}
          brands={brands}
          categories={categories}
          mainImageUrl={main_image_url}
          galleryUrls={gallery_urls}
        />
      </div>
    </AppLayout>
  )
}

export default Edit
