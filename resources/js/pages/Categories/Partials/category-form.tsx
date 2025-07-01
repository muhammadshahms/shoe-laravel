"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Upload, X, ImageIcon } from "lucide-react"
import { type Category, type CategoryFormData, categorySchema } from "@/validations/category-schema"

interface CategoryFormProps {
  category?: Category
  parents: Category[]
  onSubmit: (formData: FormData) => void
  isLoading?: boolean
}

export function CategoryForm({ category, parents, onSubmit, isLoading }: CategoryFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(category?.image_url || null)
  const [removeImage, setRemoveImage] = useState(false)

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      parent_id: category?.parent_id?.toString() || "0",
      position: category?.position || 0,
      is_active: category?.is_active ?? true,
      remove_image: false,
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setRemoveImage(false)
      form.setValue("remove_image", false)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    setRemoveImage(true)
    form.setValue("remove_image", true)
    // Clear the file input
    const imageInput = document.getElementById("image-upload") as HTMLInputElement
    if (imageInput) {
      imageInput.value = ""
    }
  }

  const handleSubmit = (data: CategoryFormData) => {
    // Create FormData for file upload
    const formData = new FormData()

    // Handle each field properly
    formData.append("name", data.name)

    if (data.description) {
      formData.append("description", data.description)
    }

    // Handle parent_id - convert "0" to null
    if (data.parent_id && data.parent_id !== "0") {
      formData.append("parent_id", data.parent_id)
    }

    if (data.position !== undefined) {
      formData.append("position", data.position.toString())
    }

    formData.append("is_active", data.is_active ? "1" : "0")

    // Handle image upload - get the actual file from the input
    const imageInput = document.getElementById("image-upload") as HTMLInputElement
    if (imageInput?.files?.[0]) {
      formData.append("image", imageInput.files[0])
    }

    if (data.remove_image) {
      formData.append("remove_image", "1")
    }

    // If updating, add method override
    if (category) {
      formData.append("_method", "PUT")
    }

    // Call the parent's onSubmit function with FormData
    onSubmit(formData)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            {/* Image Upload Section */}
            <div className="space-y-4">
              <FormLabel>Category Image</FormLabel>
              <div className="flex items-center space-x-6">
                {imagePreview && !removeImage ? (
                  <div className="relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Category preview"
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("image-upload")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
              </div>
            </div>

            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter category description" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Parent Category Select */}
            <FormField
              control={form.control}
              name="parent_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select parent category (optional)" className="text-muted-foreground" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">No Parent</SelectItem>
                      {parents.map((parent) => (
                        <SelectItem key={parent.id} value={parent.id.toString()}>
                          {parent.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Position Field */}
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter position (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Active Status Switch */}
            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-md border p-4 bg-muted">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Status</FormLabel>
                    <div className="text-sm text-muted-foreground">Enable or disable this category</div>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={() => window.history.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : category ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>

  )
}
