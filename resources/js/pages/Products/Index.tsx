"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Search, Grid, List, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductCard } from "./Partials/ProductCard";
import AppLayout from "@/layouts/app-layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { router, usePage } from "@inertiajs/react";
import Pagination from "@/components/pagination"; // adjust import as per your structure
import { BreadcrumbItem } from "@/types";

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
}

interface Props {
  products: {
    data: Product[];
    meta: any;
    links: any;
  };
}

export default function ProductsPage({ products }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

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

  const filteredProducts = products.data.filter(
    (product) =>
      product.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleSelectAll = () => {
    if (selected.length === filteredProducts.length) {
      setSelected([]);
    } else {
      setSelected(filteredProducts.map((p) => p.slug));
    }
  };

  const toggleSelectOne = (slug: string) => {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  };

  const isAllSelected =
    filteredProducts.length > 0 &&
    selected.length === filteredProducts.length;

  const handleDelete = (product: Product) => {
    setDeleteProduct(product);
  };

  const confirmDelete = () => {
    if (deleteProduct) {
      router.delete(route("products.destroy", deleteProduct.slug));
      setDeleteProduct(null);
    }
  };

  const handleBulkDelete = () => {
    if (selected.length === 0) return;
    router.post(route("products.bulk-delete"), { slugs: selected });
    setSelected([]);
  };

  const handleEdit = (slug: string) => {
    router.get(route("products.edit", slug));
  };

  const handleCreate = () => {
    router.get(route("products.create"));
  };
  const { breadcrumbs: rawBreadcrumbs } = usePage().props;

  const breadcrumbs = (rawBreadcrumbs ?? []) as BreadcrumbItem[];
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Products</h1>
              <p className="text-muted-foreground">Manage your product inventory</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {selected.length > 0 && (
                <Button variant="destructive" onClick={handleBulkDelete}>
                  <Package className="h-4 w-4 mr-2" />
                  Delete Selected ({selected.length})
                </Button>
              )}
              <Button onClick={handleCreate}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>

          {/* Search and View Mode */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products Grid or Table */}
          {filteredProducts.length > 0 ? (
            viewMode === "grid" ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isSelected={selected.includes(product.slug)}
                      onSelect={() => toggleSelectOne(product.slug)}
                      onEdit={() => handleEdit(product.slug)}
                      onDelete={() => handleDelete(product)}
                    />
                  ))}
                </div>
                <Pagination meta={products.meta} links={products.links} />
              </>
            ) : (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10">
                          <Checkbox
                            checked={isAllSelected}
                            onCheckedChange={toggleSelectAll}
                            aria-label="Select all"
                          />
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id} className="hover:bg-muted/40">
                          <TableCell>
                            <Checkbox
                              checked={selected.includes(product.slug)}
                              onCheckedChange={() => toggleSelectOne(product.slug)}
                              aria-label={`Select product ${product.name}`}
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {product.name}
                          </TableCell>
                          <TableCell>${formatPrice(product.price)}</TableCell>
                          <TableCell>{product.brand?.name || "-"}</TableCell>
                          <TableCell>
                            {product.categories_list ||
                              product.categories?.map((c) => c.name).join(", ") ||
                              "-"}
                          </TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>
                            <Badge variant={product.is_active ? "default" : "secondary"}>
                              {product.is_active ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell className="space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(product.slug)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 bg-transparent"
                              onClick={() => handleDelete(product)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <Pagination meta={products.meta} links={products.links} />
              </>
            )
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm
                      ? "Try adjusting your search terms"
                      : "Get started by adding your first product"}
                  </p>
                  <Button onClick={handleCreate}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteProduct} onOpenChange={() => setDeleteProduct(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the product "{deleteProduct?.name}" and remove it from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AppLayout>
  );
}
