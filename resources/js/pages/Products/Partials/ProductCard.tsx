"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2, Package } from "lucide-react";
import { useState } from "react";

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  brand?: { name: string };
  categories?: { name: string }[];
  categories_list?: string;
  quantity: number;
  is_active: boolean;
  image?: string;
  description?: string;
  main_image_url?: string;
}

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}


export function ProductImage({ src, alt, className }: { src: string | undefined; alt: string; className?: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <Package className="h-8 w-8 text-muted-foreground" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setImageError(true)}
    />
  );
}


export function ProductCard({
  product,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: ProductCardProps) {
  const formatPrice = (price: number | string | undefined): string => {
    if (typeof price === "number") {
      return price.toFixed(2);
    }
    if (typeof price === "string") {
      const numPrice = Number.parseFloat(price);
      return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
    }
    return "0.00";
  };

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-sm ${isSelected ? "ring-2 ring-primary" : ""
        }`}
    >
      <CardHeader className="pb-2 pt-3 px-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={isSelected}
              onCheckedChange={onSelect}
              aria-label={`Select product ${product.name}`}
            />
            <div>
              <h3 className="font-semibold text-base leading-tight">
                {product.name}
              </h3>
              {product.brand && (
                <p className="text-xs text-muted-foreground">
                  {product.brand.name}
                </p>
              )}
            </div>
          </div>
          <Badge variant={product.is_active ? "default" : "secondary"}>
            {product.is_active ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 px-4 pb-4">
        <div className="aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
          <ProductImage src={product.main_image_url} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Price</span>
            <span className="font-semibold text-sm">
              ${formatPrice(product.price)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Stock</span>
            <span
              className={`font-medium text-sm ${product.quantity < 10 ? "text-red-600" : "text-green-600"
                }`}
            >
              {product.quantity}
            </span>
          </div>

          {(product.categories_list || product.categories) && (
            <div className="flex justify-between items-start">
              <span className="text-xs text-muted-foreground">Categories</span>
              <span className="text-xs text-right max-w-[60%] truncate">
                {product.categories_list ||
                  product.categories?.map((c) => c.name).join(", ")}
              </span>
            </div>
          )}

          {product.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        <div className="flex gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="flex-1 bg-transparent px-2 py-1 text-xs"
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="text-red-600 hover:text-red-700 bg-transparent px-2 py-1 text-xs"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>

  );
}
