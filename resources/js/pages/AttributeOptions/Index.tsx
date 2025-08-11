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

interface Option {
  id: number;
  label: string;
  value: string;
}

interface Props {
  attribute: { id: number; name: string };
  options: { data: Option[]; meta: any; links: any };
}

export default function AttributeOptionsPage({ attribute, options }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [deleteOption, setDeleteOption] = useState<Option | null>(null);

  const filteredOptions =
    options.data?.filter((opt) =>
      [opt.label, opt.value]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) ?? [];

  const toggleSelectAll = () => {
    if (selected.length === filteredOptions.length) setSelected([]);
    else setSelected(filteredOptions.map((o) => o.id));
  };

  const toggleSelectOne = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const confirmDelete = () => {
    if (deleteOption) {
      router.delete(route("attributes.options.destroy", [attribute.id, deleteOption.id]));
      setDeleteOption(null);
    }
  };

  const handleBulkDelete = () => {
    if (selected.length === 0) return;
    router.post(route("attributes.options.bulk-delete", attribute.id), { ids: selected });
    setSelected([]);
  };

  return (
    <AppLayout title={`Options for ${attribute.name}`}>
      <Head title={`Options for ${attribute.name}`} />
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                Options for {attribute.name}
              </h1>
              <p className="text-muted-foreground">
                Manage options for this attribute
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {selected.length > 0 && (
                <Button variant="destructive" onClick={handleBulkDelete}>
                  Delete Selected ({selected.length})
                </Button>
              )}
              <Link href={route("attributes.options.create", attribute.id)}>
                <Button>Add Option</Button>
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search options..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Table */}
          {filteredOptions.length > 0 ? (
            <>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10">
                        <Checkbox
                          checked={
                            filteredOptions.length > 0 &&
                            selected.length === filteredOptions.length
                          }
                          onCheckedChange={toggleSelectAll}
                          aria-label="Select all"
                        />
                      </TableHead>
                      <TableHead>Label</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOptions.map((opt) => (
                      <TableRow key={opt.id} className="hover:bg-muted/40">
                        <TableCell>
                          <Checkbox
                            checked={selected.includes(opt.id)}
                            onCheckedChange={() => toggleSelectOne(opt.id)}
                            aria-label={`Select option ${opt.label}`}
                          />
                        </TableCell>
                        <TableCell>{opt.label}</TableCell>
                        <TableCell>{opt.value}</TableCell>
                        <TableCell className="space-x-2">
                          <Link href={route("attributes.options.edit", [attribute.id, opt.id])}>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setDeleteOption(opt)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Pagination meta={options.meta} links={options.links} />
            </>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No options found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "No options have been added yet"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Delete Confirmation */}
        <AlertDialog
          open={!!deleteOption}
          onOpenChange={() => setDeleteOption(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete option "{deleteOption?.label}".
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
