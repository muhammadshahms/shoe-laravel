"use client"

import { useState } from "react"
import { Head, router, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Plus, Search, Grid, List, ExternalLink } from "lucide-react"
import type { Brand } from "@/validations/brand-schema"
import AppLayout from "@/layouts/app-layout"
import Pagination from "@/components/pagination"
import type { BreadcrumbItem } from "@/types"
import { Badge } from "@/components/ui/badge"
import { BrandCard } from "./Partials/BrandCard"

interface Props {
  brands: {
    data: Brand[]
    meta: any
    links: any
  }
}

export default function Index({ brands }: Props) {
  const { breadcrumbs: rawBreadcrumbs } = usePage().props
  const breadcrumbs = (rawBreadcrumbs ?? []) as BreadcrumbItem[]

  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [deleteBrand, setDeleteBrand] = useState<Brand | null>(null)

  const filteredBrands = brands.data.filter(
    (brand) =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.website?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (brand: Brand) => {
    setDeleteBrand(brand)
  }

  const confirmDelete = () => {
    if (deleteBrand) {
      router.delete(route("brands.destroy", deleteBrand.slug), {
        onSuccess: () => {
          setDeleteBrand(null)
        },
      })
    }
  }

  const handleVisitWebsite = (website: string) => {
    window.open(website, "_blank")
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Brands" />
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold">Brands</h1>
              <p className="text-muted-foreground">Manage your brand catalog</p>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => router.get(route("brands.create"))}>
                <Plus className="h-4 w-4 mr-2" />
                Add Brand
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-2">
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

          {/* Brands Grid/List */}
          {filteredBrands.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBrands.map((brand) => (
                  <BrandCard key={brand.id} brand={brand} onDelete={handleDelete} />
                ))}
              </div>
            ) : (
              <div className="rounded-md border">
                <table className="w-full table-auto text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 font-semibold">Brand</th>
                      <th className="text-left p-3 font-semibold">Description</th>
                      <th className="text-left p-3 font-semibold">Website</th>
                      <th className="text-left p-3 font-semibold">Position</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                      <th className="text-left p-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBrands.map((brand) => (
                      <tr key={brand.id} className="border-t hover:bg-muted/50">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            {brand.logo_url && (
                              <img
                                src={brand.logo_url || "/placeholder.svg"}
                                alt={brand.name}
                                className="w-8 h-8 object-cover rounded border"
                              />
                            )}
                            <div>
                              <div className="font-medium">{brand.name}</div>
                              <div className="text-xs text-muted-foreground">{brand.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="max-w-[200px] truncate">{brand.description || "-"}</div>
                        </td>
                        <td className="p-3">
                          {brand.website ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleVisitWebsite(brand.website!)}
                              className="h-auto p-1 text-blue-600 hover:text-blue-800"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Visit
                            </Button>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="p-3">{brand.position ?? "-"}</td>
                        <td className="p-3">
                          <Badge variant={brand.is_active ? "default" : "secondary"}>
                            {brand.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.get(route("brands.edit", brand.slug))}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 bg-transparent"
                              onClick={() => handleDelete(brand)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">No brands found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm ? "Try adjusting your search terms" : "Get started by creating your first brand"}
                  </p>
                  <Button onClick={() => router.get(route("brands.create"))}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Brand
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <Pagination meta={brands.meta} links={brands.links} />
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteBrand} onOpenChange={() => setDeleteBrand(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the brand "{deleteBrand?.name}" and remove it
              from our servers.
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
    </AppLayout>
  )
}
