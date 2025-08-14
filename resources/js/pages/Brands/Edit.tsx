"use client"

import { useState } from "react"
import { router, usePage } from "@inertiajs/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink } from "lucide-react"
import AppLayout from "@/layouts/app-layout"
import type { Brand } from "@/validations/brand-schema"
import { BrandForm } from "./Partials/BrandForm"
import { BreadcrumbItem } from "@/types"

interface Props {
  brand: Brand
}

export default function EditBrand({ brand }: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (formData: FormData) => {
    setIsLoading(true)

    router.post(`/dashboard/brands/${brand.slug}`, formData, {
      onSuccess: () => {
        // Redirect will be handled by the server response
      },
      onError: (errors) => {
        console.error("Form submission errors:", errors)
      },
      onFinish: () => {
        setIsLoading(false)
      },
    })
  }

  const handleBack = () => {
    router.visit("/dashboard/brands")
  }

  const handleViewBrand = () => {
    if (brand.website) {
      window.open(brand.website, "_blank")
    }
  }

  const { breadcrumbs: rawBreadcrumbs } = usePage().props;

  const breadcrumbs = (rawBreadcrumbs ?? []) as BreadcrumbItem[];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Brands
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={brand.is_active ? "default" : "secondary"}>{brand.is_active ? "Active" : "Inactive"}</Badge>
            {brand.website && (
              <Button variant="outline" size="sm" onClick={handleViewBrand}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Website
              </Button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                {brand.logo_url && (
                  <img
                    src={brand.logo_url || "/placeholder.svg"}
                    alt={brand.name}
                    className="w-12 h-12 object-cover rounded-lg border"
                  />
                )}
                <div>
                  <CardTitle className="text-2xl font-bold">Edit {brand.name}</CardTitle>
                  <p className="text-muted-foreground">Update the brand information below.</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <BrandForm brand={brand} onSubmit={handleSubmit} isLoading={isLoading} />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
