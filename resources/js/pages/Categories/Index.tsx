"use client"

import { useState } from "react"
import { Head, router } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Plus, Search, Grid, List, TreePine } from "lucide-react"
import { Category } from "@/validations/category-schema"
import { CategoryCard } from "./Partials/category-card"
import AppLayout from "@/layouts/app-layout"
import Pagination from "@/components/pagination"

interface Props {
    categories: {
        data: Category[]
        meta: any
        links: any
    }
}
export default function Index({ categories }: Props) {
    const [searchTerm, setSearchTerm] = useState("")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [deleteCategory, setDeleteCategory] = useState<Category | null>(null)

    const filteredCategories = categories.data.filter(
        (category) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleDelete = (category: Category) => {
        setDeleteCategory(category)
    }

    const confirmDelete = () => {
        if (deleteCategory) {
            router.delete(route("categories.destroy", deleteCategory.slug), {
                onSuccess: () => {
                    setDeleteCategory(null)
                },
            })
        }
    }

    return (

        <AppLayout>
            <Head title="Categories" />

            <div className="container mx-auto py-8 px-4">
                <div className="flex flex-col space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                        <div>
                            <h1 className="text-3xl font-bold">Categories</h1>
                            <p className="text-muted-foreground">Manage your product categories</p>
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="outline" onClick={() => router.get(route("categories.tree"))}>
                                <TreePine className="h-4 w-4 mr-2" />
                                Tree View
                            </Button>
                            <Button onClick={() => router.get(route("categories.create"))}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Category
                            </Button>
                        </div>
                    </div>

                    {/* Search and Filters */}


                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-4 sm:space-x-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search categories..."
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
                                variant={viewMode === "list" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setViewMode("list")}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>


                    {/* Categories Grid/List */}
                    {filteredCategories.length > 0 ? (
                        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" : "space-y-6"}>
                            {filteredCategories.map((category) => (
                                <CategoryCard key={category.id} category={category} onDelete={handleDelete} />
                            ))}
                        </div>

                    ) : (
                        <Card >
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold mb-2">No categories found</h3>
                                    <p className="text-muted-foreground mb-4">
                                        {searchTerm ? "Try adjusting your search terms" : "Get started by creating your first category"}
                                    </p>
                                    <Button onClick={() => router.get(route("categories.create"))}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Category
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
                <Pagination meta={categories.meta} links={categories.links} />
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteCategory} onOpenChange={() => setDeleteCategory(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the category "{deleteCategory?.name}" and
                            remove it from our servers.
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

        </AppLayout >
    )
}
