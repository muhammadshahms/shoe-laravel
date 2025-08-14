"use client";

import { useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Search, Package } from "lucide-react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import Pagination from "@/components/pagination";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { BreadcrumbItem } from "@/types";

interface Attribute {
  id: number;
  name: string;
  code: string;
  options_count: number;
}

interface Props {
  attributes: { data: Attribute[]; meta: any; links: any };
}

export default function AttributesPage({ attributes }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [deleteAttribute, setDeleteAttribute] = useState<Attribute | null>(null);

  const { breadcrumbs: rawBreadcrumbs } = usePage().props;
  const breadcrumb = (rawBreadcrumbs ?? []) as BreadcrumbItem[];

  const filteredAttributes =
    attributes.data?.filter((attr) =>
      [attr.name, attr.code]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) ?? [];

  const toggleSelectAll = () => {
    if (selected.length === filteredAttributes.length) setSelected([]);
    else setSelected(filteredAttributes.map((a) => a.id));
  };

  const toggleSelectOne = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const confirmDelete = () => {
    if (deleteAttribute) {
      router.delete(route("attributes.destroy", deleteAttribute.id));
      setDeleteAttribute(null);
    }
  };

  const handleBulkDelete = () => {
    if (selected.length === 0) return;
    router.post(route("attributes.bulk-delete"), { ids: selected });
    setSelected([]);
  };

  return (
    <AppLayout breadcrumbs={breadcrumb}>
      <Head title="Attributes" />
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Attributes</h1>
              <p className="text-muted-foreground">Manage product attributes</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {selected.length > 0 && (
                <Button variant="destructive" onClick={handleBulkDelete}>
                  Delete Selected ({selected.length})
                </Button>
              )}
              <Link href={route("attributes.create")}>
                <Button>Add Attribute</Button>
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search attributes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Table */}
          {filteredAttributes.length > 0 ? (
            <>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10">
                        <Checkbox
                          checked={
                            filteredAttributes.length > 0 &&
                            selected.length === filteredAttributes.length
                          }
                          onCheckedChange={toggleSelectAll}
                          aria-label="Select all"
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Options Count</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAttributes.map((attr) => (
                      <TableRow key={attr.id} className="hover:bg-muted/40">
                        <TableCell>
                          <Checkbox
                            checked={selected.includes(attr.id)}
                            onCheckedChange={() => toggleSelectOne(attr.id)}
                            aria-label={`Select attribute ${attr.name}`}
                          />
                        </TableCell>
                        <TableCell>{attr.name}</TableCell>
                        <TableCell>{attr.code}</TableCell>
                        <TableCell>{attr.options_count}</TableCell>
                        <TableCell className="space-x-2">
                          <Link href={route("attributes.options.index", attr.id)}>
                            <Button variant="outline" size="sm">
                              Options
                            </Button>
                          </Link>
                          <Link href={route("attributes.edit", attr.id)}>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setDeleteAttribute(attr)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Pagination meta={attributes.meta} links={attributes.links} />
            </>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No attributes found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "No attributes have been added yet"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Delete Confirmation */}
        <AlertDialog
          open={!!deleteAttribute}
          onOpenChange={() => setDeleteAttribute(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete attribute "{deleteAttribute?.name}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AppLayout>
  );
}
