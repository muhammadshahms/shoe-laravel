"use client"

import { Head, router } from "@inertiajs/react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryForm } from "./Partials/category-form"
import { Category } from "@/validations/category-schema"
import AppLayout from "@/layouts/app-layout"

interface Props {
  parents: Category[]
}

export default function Create({ parents }: Props) {
  const handleSubmit = (formData: FormData) => {
    router.post(route("categories.store"), formData, {
      forceFormData: true,
    })
  }

  return (
    <AppLayout>
      <Head title="Create Category" />

      <div className="px-4">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-4 mt-4">
            <Button variant="ghost" size="sm" onClick={() => router.get(route("categories.index"))}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Button>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold">Create Category</h1>
            <p className="text-muted-foreground">Add a new category to organize your products</p>
          </div>

          {/* Form */}
          <CategoryForm parents={parents} onSubmit={handleSubmit} />
        </div>
      </div>
    </AppLayout>
  )
}
