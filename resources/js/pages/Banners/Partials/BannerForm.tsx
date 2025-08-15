"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChangeEvent, useState } from "react";
import { Switch } from "@/components/ui/switch";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp", "image/gif"];

// Schema for create mode (image required)
const createSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(255),
    description: z.string().max(1000).optional(),
    start_date: z.string().nonempty("Start date is required"),
    end_date: z.string().nonempty("End date is required"),
    type: z.enum(["promo", "info", "other"], { required_error: "Type is required" }),
    is_active: z.boolean().default(true),
    image: z
        .instanceof(File, { message: "Image is required" })
        .refine((file) => file.size <= MAX_FILE_SIZE, "Image must be less than 2MB")
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Only JPG, PNG, GIF, WEBP images are allowed"),
});

// Schema for edit mode (image optional)
const editSchema = createSchema.extend({
    image: z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, "Image must be less than 2MB")
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Only JPG, PNG, GIF, WEBP images are allowed")
        .optional(),
});

export type BannerFormValues = z.infer<typeof createSchema>;

interface BannerFormProps {
    initialData?: Partial<BannerFormValues> & { id?: number; image_url?: string };
    onSubmit: (data: FormData) => void;
    mode?: "create" | "edit";
}

export default function BannerForm({ initialData, onSubmit, mode = "create" }: BannerFormProps) {
    const [preview, setPreview] = useState<string | null>(initialData?.image_url || null);

    const form = useForm<BannerFormValues>({
        resolver: zodResolver(mode === "edit" ? editSchema : createSchema),
        defaultValues: {
            title: initialData?.title || "",
            description: initialData?.description || "",
            start_date: initialData?.start_date || "",
            end_date: initialData?.end_date || "",
            type: initialData?.type || "promo",
            is_active: initialData?.is_active ?? true,
        },
    });

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image", file as any, { shouldValidate: true });
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (values: BannerFormValues) => {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (key === "is_active") {
                    formData.append(key, value ? "1" : "0");
                } else {
                    formData.append(key, value as any);
                }
            }
        });

        if (initialData?.id) {
            formData.append("_method", "PUT"); // Laravel PUT
        }

        onSubmit(formData);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">
                {mode === "edit" ? "Edit Banner" : "Create Banner"}
            </h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                    {/* Title */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter banner title" {...field} />
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
                                    <Textarea placeholder="Enter banner description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="start_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="end_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>End Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Type */}
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select banner type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="promo">Promo</SelectItem>
                                        <SelectItem value="info">Info</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Status */}
                    <FormField
                        control={form.control}
                        name="is_active"
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-3">
                                <div className="space-y-0.5">
                                    <FormLabel>Active</FormLabel>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={(checked) => field.onChange(checked)}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Image */}
                    <FormField
                        control={form.control}
                        name="image"
                        render={() => (
                            <FormItem>
                                <FormLabel>Banner Image</FormLabel>
                                <FormControl>
                                    <Input type="file" accept="image/*" onChange={handleImageChange} />
                                </FormControl>
                                {preview && (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="mt-2 w-full max-h-64 object-cover rounded-lg"
                                    />
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit */}
                    <Button type="submit" className="w-full">
                        {mode === "edit" ? "Update Banner" : "Create Banner"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
