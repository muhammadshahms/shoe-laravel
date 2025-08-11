"use client";

import React from "react";
import { usePage, Head, Link, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbItem } from "@/types";
import { z } from "zod";
import { useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const optionSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
});

type OptionForm = z.infer<typeof optionSchema>;

interface EditOptionProps {
  attribute: {
    id: number;
    name: string;
  };
  option: {
    id: number;
    label: string;
    value: string;
  };
}

export default function EditOption({ attribute, option }: EditOptionProps) {
  const { breadcrumbs: rawBreadcrumbs } = usePage().props;
  const breadcrumbs = (rawBreadcrumbs ?? []) as BreadcrumbItem[];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useReactHookForm<OptionForm>({
    resolver: zodResolver(optionSchema),
    defaultValues: {
      label: option.label || "",
      value: option.value || "",
    },
  });

  const onSubmit = (values: OptionForm) => {
    router.put(route("attributes.options.update", [attribute.id, option.id]), values);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit Option for ${attribute.name}`} />

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                Edit Option for {attribute.name}
              </h1>
              <p className="text-muted-foreground">
                Update the details of this option
              </p>
            </div>
            <Link href={route("attributes.show", attribute.id)}>
              <Button variant="outline">Back to Attribute</Button>
            </Link>
          </div>

          {/* Form Card */}
          <Card className="max-w-xl">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Label */}
                <div>
                  <Label htmlFor="label">Label</Label>
                  <Input
                    id="label"
                    placeholder="Enter option label"
                    {...register("label")}
                  />
                  {errors.label && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.label.message}
                    </p>
                  )}
                </div>

                {/* Value */}
                <div>
                  <Label htmlFor="value">Value</Label>
                  <Input
                    id="value"
                    placeholder="Enter option value"
                    {...register("value")}
                  />
                  {errors.value && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.value.message}
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
                    Update
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
