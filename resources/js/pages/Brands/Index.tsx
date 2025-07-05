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
import { Plus, Search, Grid, List, BadgePercent } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import AppLayout from "@/layouts/app-layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { router } from "@inertiajs/react";
import Pagination from "@/components/pagination";

interface Brand {
  id: string;
  slug: string;
  name: string;
  description?: string;
  is_active: boolean;
}

interface Props {
  brands: {
    data: Brand[];
    meta: any;
    links: any;
  };
}

export default function BrandsPage({ brands }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [deleteBrand, setDeleteBrand] = useState<Brand | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const filteredBrands = brands.data.filter(
    (brand) =>
      brand.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleSelectAll = () => {
    if (selected.length === filteredBrands.length) {
      setSelected([]);
    } else {
      setSelected(filteredBrands.map((b) => b.slug));
    }
  };

  const toggleSelectOne = (slug: string) => {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  };

  const isAllSelected =
    filteredBrands.length > 0 &&
    selected.length === filteredBrands.length;

  const handleDelete = (brand: Brand) => {
    setDeleteBrand(brand);
  };

  const confirmDelete = () => {
    if (deleteBrand) {
      router.delete(route("brands.destroy", deleteBrand.slug));
      setDeleteBrand(null);
    }
  };

  const handleBulkDelete = () => {
    if (selected.length === 0) return;
    router.post(route("brands.bulk-delete"), { slugs: selected });
    setSelected([]);
  };

  const handleEdit = (slug: string) => {
    router.get(route("brands.edit", slug));
  };

  const handleCreate = () => {
    router.get(route("brands.create"));
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Brands</h1>
              <p className="text-muted-foreground">Manage your brands and partners</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {selected.length > 0 && (
                <Button variant="destructive" onClick={handleBulkDelete}>
                  <BadgePercent className="h-4 w-4 mr-2" />
                  Delete Selected ({selected.length})
                </Button>
              )}
              <Button onClick={handleCreate}>
                <Plus className="h-4 w-4 mr-2" />
                Add Brand
              </Button>
            </div>
          </div>

          {/* Search and View Mode */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search brands..."
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

          {/* Brands Grid or Table */}
          {filteredBrands.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBrands.map((brand) => (
                  <Card key={brand.id} className="flex flex-col p-4">
                    <h3 className="text-xl font-semibold">{brand.name}</h3>
                    <p className="text-muted-foreground mb-4">{brand.description || "No description"}</p>
                    <Badge variant={brand.is_active ? "default" : "secondary"}>
                      {brand.is_active ? "Active" : "Inactive"}
                    </Badge>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(brand.slug)}>
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 bg-transparent"
                        onClick={() => handleDelete(brand)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
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
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBrands.map((brand) => (
                      <TableRow key={brand.id} className="hover:bg-muted/40">
                        <TableCell>
                          <Checkbox
                            checked={selected.includes(brand.slug)}
                            onCheckedChange={() => toggleSelectOne(brand.slug)}
                            aria-label={`Select brand ${brand.name}`}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{brand.name}</TableCell>
                        <TableCell>{brand.description || "-"}</TableCell>
                        <TableCell>
                          <Badge variant={brand.is_active ? "default" : "secondary"}>
                            {brand.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(brand.slug)}>
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 bg-transparent"
                            onClick={() => handleDelete(brand)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                  <BadgePercent className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No brands found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm
                      ? "Try adjusting your search terms"
                      : "Get started by adding your first brand"}
                  </p>
                  <Button onClick={handleCreate}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Brand
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Pagination meta={brands.meta} links={brands.links} />
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteBrand} onOpenChange={() => setDeleteBrand(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the brand "{deleteBrand?.name}".
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
