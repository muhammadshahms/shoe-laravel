"use client"

import { useState } from "react"
import { Head, router } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, ChevronRight, ChevronDown, Plus, Edit, Eye, ImageIcon } from "lucide-react"
import appLayout from "@/layouts/app-layout"
import AppLayout from "@/layouts/app-layout"

interface Category {
  id: number
  name: string
  slug: string
  description?: string
  parent_id?: number
  position: number
  is_active: boolean
  parent?: Category
  image_url?: string
  created_at: string
  updated_at: string
}

interface Props {
  categories: Category[]
}

interface TreeNodeProps {
  category: Category
  children: Category[]
  level: number
  expandedNodes: Set<number>
  onToggle: (id: number) => void
  allCategories: Category[] // Add this prop to pass all categories
}

function TreeNode({ category, children, level, expandedNodes, onToggle, allCategories }: TreeNodeProps) {
  const isExpanded = expandedNodes.has(category.id)
  const hasChildren = children.length > 0

  return (

    <div className="select-none">
      <div
        className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer`}
        style={{ paddingLeft: `${level * 24 + 8}px` }}
      >
        {hasChildren ? (
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => onToggle(category.id)}>
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        ) : (
          <div className="w-6" />
        )}

        {category.image_url ? (
          <img
            src={category.image_url || "/placeholder.svg"}
            alt={category.name}
            className="w-8 h-8 object-cover rounded border"
          />
        ) : (
          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
            <ImageIcon className="h-4 w-4 text-gray-400" />
          </div>
        )}

        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-medium">{category.name}</span>
            <Badge variant={category.is_active ? "default" : "secondary"} className="text-xs">
              {category.is_active ? "Active" : "Inactive"}
            </Badge>
            {hasChildren && (
              <span className="text-xs text-muted-foreground">
                ({children.length} {children.length === 1 ? "child" : "children"})
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                router.get(route("categories.show", category.slug))
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                router.get(route("categories.edit", category.slug))
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {isExpanded && hasChildren && (
        <div>
          {children.map((child) => {
            // Now we can access allCategories to find grandchildren
            const grandChildren = allCategories.filter((c) => c.parent_id === child.id)
            return (
              <TreeNode
                key={child.id}
                category={child}
                children={grandChildren}
                level={level + 1}
                expandedNodes={expandedNodes}
                onToggle={onToggle}
                allCategories={allCategories} // Pass it down
              />
            )
          })}
        </div>
      )}
    </div>

  )
}

export default function CategoriesTree({ categories }: Props) {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set())

  // Build tree structure
  const rootCategories = categories.filter((c) => !c.parent_id)

  const filteredCategories = searchTerm
    ? categories.filter(
      (category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    : categories

  const handleToggle = (id: number) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedNodes(newExpanded)
  }

  const expandAll = () => {
    setExpandedNodes(new Set(categories.map((c) => c.id)))
  }

  const collapseAll = () => {
    setExpandedNodes(new Set())
  }

  return (
    <>
      <AppLayout>
        <Head title="Categories Tree" />
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={() => router.get(route("categories.index"))}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Categories
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => router.get(route("categories.create"))}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold">Categories Tree</h1>
              <p className="text-muted-foreground">Hierarchical view of all categories</p>
            </div>

            {/* Search and Controls */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
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
                <Button variant="outline" size="sm" onClick={expandAll}>
                  Expand All
                </Button>
                <Button variant="outline" size="sm" onClick={collapseAll}>
                  Collapse All
                </Button>
              </div>
            </div>


            {/* Tree View */}
            <Card>

              <CardContent>
                {searchTerm ? (
                  // Flat search results
                  <div className="space-y-1">
                    {filteredCategories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50">
                        {category.image_url ? (
                          <img
                            src={category.image_url || "/placeholder.svg"}
                            alt={category.name}
                            className="w-8 h-8 object-cover rounded border"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                            <ImageIcon className="h-4 w-4 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="font-medium">{category.name}</span>
                            <Badge variant={category.is_active ? "default" : "secondary"} className="text-xs">
                              {category.is_active ? "Active" : "Inactive"}
                            </Badge>
                            {category.parent && (
                              <span className="text-xs text-muted-foreground">Parent: {category.parent.name}</span>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => router.get(route("categories.show", category.slug))}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => router.get(route("categories.edit", category.slug))}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Tree structure
                  <div className="space-y-1">
                    {rootCategories.map((category) => {
                      const children = categories.filter((c) => c.parent_id === category.id)
                      return (
                        <TreeNode
                          key={category.id}
                          category={category}
                          children={children}
                          level={0}
                          expandedNodes={expandedNodes}
                          onToggle={handleToggle}
                          allCategories={categories} // Pass the full categories array
                        />
                      )
                    })}
                  </div>
                )}

                {filteredCategories.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No categories found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </AppLayout>
    </>
  )
}
