// File: types/product.ts
export interface Brand {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id:number;
  slug?: string;
  name?: string;
  description?: string;
  short_description?: string;
  sku?: string;
  barcode?: string;
  brand?: { id: number };
  price?: number;
  special_price?: number;
  special_price_start?: string;
  special_price_end?: string;
  quantity?: number;
  in_stock?: boolean;
  is_active?: boolean;
  is_featured?: boolean;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  weight?: number;
  dimensions?: string;
  categories?: { id: number }[];
}

export interface Props {
  product?: Product;
  brands: Brand[];
  categories: Category[];
  mainImageUrl?: string;
  galleryUrls?: string[];
}
