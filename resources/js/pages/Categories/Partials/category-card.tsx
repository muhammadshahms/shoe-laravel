"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, Eye, MoreHorizontal, Trash2, ImageIcon } from "lucide-react"
import { router } from "@inertiajs/react"
import { Category } from "@/validations/category-schema"

interface CategoryCardProps {
    category: Category
    onDelete: (category: Category) => void
}

export function CategoryCard({ category, onDelete }: CategoryCardProps) {
    return (
        <Card className="hover:shadow-md transition-shadow flex flex-col h-full p-4 sm:p-6">
            <CardHeader className="p-0 mb-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                        {category.image_url ? (
                            <img
                                src={category.image_url || "/placeholder.svg"}
                                alt={category.name}
                                className="w-14 h-14 object-cover rounded-lg border"
                            />
                        ) : (
                            <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                                <ImageIcon className="h-6 w-6 text-gray-400" />
                            </div>
                        )}
                        <div>
                            <h3 className="font-semibold text-lg">{category.name}</h3>
                            {category.parent && <p className="text-sm text-muted-foreground">Parent: {category.parent.name}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => router.get(route("categories.show", category.slug))}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.get(route("categories.edit", category.slug))}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onDelete(category)} className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Badge variant={category.is_active ? "default" : "secondary"}>
                            {category.is_active ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex flex-col flex-1 p-0">
                {category.description && (
                    <p className="text-sm text-muted-foreground mb-4">
                        {category.description}
                    </p>
                )}
                <div className="mt-auto pt-2 border-t flex justify-between text-xs text-muted-foreground">
                    <span>Position: {category.position || 0}</span>
                    <span>Created: {new Date(category.created_at).toLocaleDateString()}</span>
                </div>
            </CardContent>
        </Card>
    )
}
