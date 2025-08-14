"use client"

import { useState } from "react"
import { router, usePage } from "@inertiajs/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import AppLayout from "@/layouts/app-layout"
import { BrandForm } from "./Partials/BrandForm"
import { BreadcrumbItem } from "@/types"

export default function CreateBrand() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (formData: FormData) => {
    setIsLoading(true)

    router.post("/dashboard/brands", formData, {
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
  const { breadcrumbs: rawBreadcrumbs } = usePage().props;

  const breadcrumbs = (rawBreadcrumbs ?? []) as BreadcrumbItem[];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Brands
          </Button>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Create New Brand</CardTitle>
              <p className="text-muted-foreground">Add a new brand to your catalog. Fill in the details below.</p>
            </CardHeader>
            <CardContent>
              <BrandForm onSubmit={handleSubmit} isLoading={isLoading} />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
