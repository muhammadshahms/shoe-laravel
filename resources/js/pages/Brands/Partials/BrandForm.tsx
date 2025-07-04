"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Upload, X, ImageIcon } from "lucide-react"
import { type Brand, type BrandFormData, brandSchema } from "@/validations/brand-schema"

interface BrandFormProps {
  brand?: Brand
  onSubmit: (formData: FormData) => void
  isLoading?: boolean
}

export function BrandForm({ brand, onSubmit, isLoading }: BrandFormProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(brand?.logo_url || null)
  const [removeLogo, setRemoveLogo] = useState(false)

  const form = useForm<BrandFormData>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: brand?.name || "",
      description: brand?.description || "",
      website: brand?.website || "",
      position: brand?.position ?? 0,
      is_active: brand?.is_active ?? true,
      remove_logo: false,
    },
  })

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      form.setValue("logo", file)
      setRemoveLogo(false)
      form.setValue("remove_logo", false)
    }
  }

  const handleRemoveLogo = () => {
    setLogoPreview(null)
    setRemoveLogo(true)
    form.setValue("logo", undefined)
    form.setValue("remove_logo", true)
  }

  const handleSubmit = (data: BrandFormData) => {
    const formData = new FormData()

    formData.append("name", data.name)
    if (data.description) formData.append("description", data.description)
    if (data.website) formData.append("website", data.website)
    if (data.position !== undefined) formData.append("position", data.position.toString())
    formData.append("is_active", data.is_active ? "1" : "0")

    const logoInput = document.getElementById("logo-upload") as HTMLInputElement
    if (logoInput?.files?.[0]) {
      formData.append("logo", logoInput.files[0])
    }

    if (data.remove_logo) {
      formData.append("remove_logo", "1")
    }

    if (brand) {
      formData.append("_method", "PUT")
    }

    onSubmit(formData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Logo Upload */}
        <div className="space-y-4">
          <FormLabel>Brand Logo</FormLabel>
          <div className="flex items-center space-x-6">
            {logoPreview && !removeLogo ? (
              <div className="relative">
                <img
                  src={logoPreview || "/placeholder.svg"}
                  alt="Logo Preview"
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                  onClick={handleRemoveLogo}
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
              <Input id="logo-upload" type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
              <Button type="button" variant="outline" onClick={() => document.getElementById("logo-upload")?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Logo
              </Button>
            </div>
          </div>
        </div>

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter brand name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter brand description" className="resize-none" rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Website */}
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Position */}
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter display position"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Active Status */}
        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between p-4 border rounded-md bg-muted">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active Status</FormLabel>
                <p className="text-sm text-muted-foreground">Enable or disable this brand</p>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button type="button" variant="outline" onClick={() => window.history.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : brand ? "Update Brand" : "Create Brand"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
