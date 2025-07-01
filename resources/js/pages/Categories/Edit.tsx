"use client"

import { useState } from "react"
import { Head, router } from "@inertiajs/react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Category } from "@/validations/category-schema"
import { CategoryForm } from "./Partials/category-form"
import AppLayout from "@/layouts/app-layout"

interface Props {
    category: Category
    parents: Category[]
}

export default function Edit({ category, parents }: Props) {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (formData: FormData) => {
        setIsLoading(true)

        router.post(route("categories.update", category.slug), formData, {
            forceFormData: true,
            preserveState: false,
            onSuccess: () => {
                console.log("Category updated successfully")
                setIsLoading(false)
            },
            onError: (errors) => {
                console.error("Validation errors:", errors)
                setIsLoading(false)
            },
            onFinish: () => {
                setIsLoading(false)
            },
        })
    }

    return (
        <>
            <AppLayout>
                <Head title={`Edit ${category.name}`} />
                <div className="container mx-auto py-8 px-4">
                    <div className="flex flex-col space-y-6">
                        {/* Header */}
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" onClick={() => router.get(route("categories.index"))}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Categories
                            </Button>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Edit Category</h1>
                            <p className="text-muted-foreground">Update "{category.name}" category details</p>
                        </div>

                        {/* Form */}
                        <CategoryForm category={category} parents={parents} onSubmit={handleSubmit} isLoading={isLoading} />
                    </div>
                </div>
            </AppLayout>
        </>
    )
}
