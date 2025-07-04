
"use client"

import { router } from "@inertiajs/react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, ExternalLink, Eye } from "lucide-react"
import type { Brand } from "@/validations/brand-schema"

interface BrandCardProps {
  brand: Brand
  onDelete: (brand: Brand) => void
}

export function BrandCard({ brand, onDelete }: BrandCardProps) {
  const handleEdit = () => {
    router.get(route("brands.edit", brand.slug))
  }

  const handleView = () => {
    router.get(route("brands.show", brand.slug))
  }

  const handleVisitWebsite = () => {
    if (brand.website) {
      window.open(brand.website, "_blank")
    }
  }

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            {brand.logo_url && (
              <img
                src={brand.logo_url || "/placeholder.svg"}
                alt={brand.name}
                className="w-12 h-12 object-cover rounded-lg border"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">{brand.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{brand.slug}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleView}>
                <Eye className="h-4 w-4 mr-2" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              {brand.website && (
                <DropdownMenuItem onClick={handleVisitWebsite}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Website
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onDelete(brand)} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Description */}
          {brand.description && <p className="text-sm text-muted-foreground line-clamp-2">{brand.description}</p>}

          {/* Website */}
          {brand.website && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVisitWebsite}
                className="h-auto p-1 text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                <span className="text-xs truncate max-w-[150px]">{brand.website.replace(/^https?:\/\//, "")}</span>
              </Button>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2">
              <Badge variant={brand.is_active ? "default" : "secondary"} className="text-xs">
                {brand.is_active ? "Active" : "Inactive"}
              </Badge>
              {brand.position !== null && <span className="text-xs text-muted-foreground">Pos: {brand.position}</span>}
            </div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
