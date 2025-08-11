"use client";

import React from "react";
import { usePage, Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbItem } from "@/types";
import { z } from "zod";
import { useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { router } from "@inertiajs/react";

const attributeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["text", "select", "color"], {
    errorMap: () => ({ message: "Please select a type" }),
  }),
});

type AttributeForm = z.infer<typeof attributeSchema>;

export default function CreateAttribute() {
  const { breadcrumbs: rawBreadcrumbs } = usePage().props;
  const breadcrumbs = (rawBreadcrumbs ?? []) as BreadcrumbItem[];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useReactHookForm<AttributeForm>({
    resolver: zodResolver(attributeSchema),
    defaultValues: {
      name: "",
      type: undefined as any,
    },
  });

  const typeValue = watch("type");

  const onSubmit = (values: AttributeForm) => {
    router.post(route("attributes.store"), values);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Attribute" />

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Create Attribute</h1>
              <p className="text-muted-foreground">
                Add a new product attribute to your store
              </p>
            </div>
            <Link href={route("attributes.index")}>
              <Button variant="outline">Back to Attributes</Button>
            </Link>
          </div>

          {/* Form Card */}
          <Card className="max-w-xl">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter attribute name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Type */}
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    onValueChange={(value) =>
                      setValue("type", value as AttributeForm["type"])
                    }
                    value={typeValue || ""}
                  >
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="select">Select</SelectItem>
                      <SelectItem value="color">Color</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.type.message}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => history.back()}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    Save
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
