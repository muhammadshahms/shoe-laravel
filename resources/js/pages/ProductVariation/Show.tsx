"use client"

import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { ProductVariation } from "@/validations/product-variation-schema"
import { Link } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"

interface ProductVariationShowProps {
  variation: ProductVariation
}

export default function ProductVariationShow({ variation }: ProductVariationShowProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    // In Laravel Inertia, you would use Inertia.delete()
    console.log("Delete variation:", variation.id)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <AppLayout>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/dashboard/product-variations">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Variations
            </Button>
          </Link>

          <div className="flex gap-2">
            <Link href={`/product-variations/${variation.id}/edit`}>
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the product variation "{variation.sku}".
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="grid gap-6 ">
          <Card className="py-4">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{variation.sku}</CardTitle>
                  <CardDescription>Product Variation Details</CardDescription>
                </div>
                <Badge variant={variation.in_stock ? "default" : "secondary"} className="text-sm">
                  {variation.in_stock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Product Information
                    </h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Product:</span>
                        <span className="text-sm">{variation.product.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">SKU:</span>
                        <span className="text-sm font-mono">{variation.sku}</span>
                      </div>
                      {variation.barcode && (
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Barcode:</span>
                          <span className="text-sm font-mono">{variation.barcode}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Pricing & Inventory
                    </h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Price:</span>
                        <span className="text-sm font-semibold">
                          ${Number(variation.price).toFixed(2)}
                        </span>

                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Quantity:</span>
                        <span className="text-sm">{variation.quantity} units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Status:</span>
                        <Badge variant={variation.in_stock ? "default" : "secondary"} className="text-xs">
                          {variation.in_stock ? "Available" : "Unavailable"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Attributes</h3>
                    <div className="mt-2">
                      {variation.attributes && Object.keys(variation.attributes).length > 0 ? (
                        <div className="space-y-2">
                          {Object.entries(variation.attributes).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-sm font-medium capitalize">{key}:</span>
                              <span className="text-sm">{value}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No attributes defined</p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Timestamps</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Created:</span>
                        <span className="text-sm">{formatDate(variation.created_at)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Updated:</span>
                        <span className="text-sm">{formatDate(variation.updated_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {variation.attributes && Object.keys(variation.attributes).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Variation Attributes</CardTitle>
                <CardDescription>Custom attributes for this product variation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(variation.attributes).map(([key, value]) => (
                    <Badge key={key} variant="outline" className="text-sm">
                      <span className="font-medium">{key}:</span>
                      <span className="ml-1">{value}</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
