"use client"

import { useState } from "react"
import { MoreHorizontal, Plus, Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { ProductVariation } from "@/validations/product-variation-schema"
import { Link, router } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"

interface ProductVariationIndexProps {
  variations: {
    data: ProductVariation[]
    current_page: number
    last_page: number
    prev_page_url: string | null
    next_page_url: string | null
  }
}

export default function ProductVariationIndex({ variations }: ProductVariationIndexProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const filtered = variations.data.filter(
    (v) =>
      v.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id: number) => {
    router.delete(`/dashboard/product-variations/${id}`, {
      onFinish: () => setDeleteId(null),
    })
  }

  return (
    <AppLayout>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Product Variations</CardTitle>
            <CardDescription>
              Manage your product variations and inventory
            </CardDescription>
          </div>
          <Link href="/dashboard/product-variations/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Variation
            </Button>
          </Link>
        </div>

        <div className="mb-4">
          <Input
            placeholder="Search by SKU or product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm mt-4"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Barcode</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No product variations found
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((variation) => (
                  <TableRow key={variation.id}>
                    <TableCell className="font-medium">{variation.sku}</TableCell>
                    <TableCell>{variation.product.name}</TableCell>
                    <TableCell>${Number(variation.price).toFixed(2)}</TableCell>
                    <TableCell>{variation.quantity}</TableCell>
                    <TableCell>
                      <Badge variant={variation.in_stock ? "default" : "secondary"}>
                        {variation.in_stock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </TableCell>
                    <TableCell>{variation.barcode || "-"}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.visit(`/dashboard/product-variations/${variation.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.visit(`/dashboard/product-variations/${variation.id}/edit`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => setDeleteId(variation.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {variations.last_page > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Page {variations.current_page} of {variations.last_page}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={!variations.prev_page_url}
                onClick={() => router.visit(variations.prev_page_url!)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={!variations.next_page_url}
                onClick={() => router.visit(variations.next_page_url!)}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the product variation.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteId && handleDelete(deleteId)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AppLayout>
  )
}
