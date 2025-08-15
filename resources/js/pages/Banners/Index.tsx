"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Search, Grid, List, ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import AppLayout from "@/layouts/app-layout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { router, usePage } from "@inertiajs/react";
import Pagination from "@/components/pagination";
import { BreadcrumbItem } from "@/types";

interface Banner {
    id: number;
    title: string;
    type: string;
    is_active: boolean;
    start_date: string;
    end_date: string;
    image?: string;
}

interface Props {
    banners: {
        data: Banner[];
        meta: any;
        links: any;
    };
}

export default function BannersPage({ banners }: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
    const [deleteBanner, setDeleteBanner] = useState<Banner | null>(null);
    const [selected, setSelected] = useState<number[]>([]);

    const filteredBanners = banners.data.filter(
        (b) =>
            b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleSelectAll = () => {
        if (selected.length === filteredBanners.length) setSelected([]);
        else setSelected(filteredBanners.map((b) => b.id));
    };

    const toggleSelectOne = (id: number) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        );
    };

    const isAllSelected =
        filteredBanners.length > 0 && selected.length === filteredBanners.length;

    const handleDelete = (banner: Banner) => setDeleteBanner(banner);
    const confirmDelete = () => {
        if (deleteBanner) {
            router.delete(route("banners.destroy", deleteBanner.id));
            setDeleteBanner(null);
        }
    };

    const handleBulkDelete = () => {
        if (selected.length === 0) return;
        router.post(route("banners.bulk-delete"), { ids: selected });
        setSelected([]);
    };

    const handleEdit = (id: number) => router.get(route("banners.edit", id));
    const handleCreate = () => router.get(route("banners.create"));
    const { breadcrumbs: rawBreadcrumbs } = usePage().props;
    const breadcrumbs = (rawBreadcrumbs ?? []) as BreadcrumbItem[];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="container mx-auto py-8 px-4">
                <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold">Banners</h1>
                            <p className="text-muted-foreground">Manage your banners</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {selected.length > 0 && (
                                <Button variant="destructive" onClick={handleBulkDelete}>
                                    Delete Selected ({selected.length})
                                </Button>
                            )}
                            <Button onClick={handleCreate}>
                                <Plus className="h-4 w-4 mr-2" /> Add Banner
                            </Button>
                        </div>
                    </div>

                    {/* Search and View Mode */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search banners..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant={viewMode === "grid" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setViewMode("grid")}
                            >
                                <Grid className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === "table" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setViewMode("table")}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Grid / Table */}
                    {filteredBanners.length > 0 ? (
                        viewMode === "grid" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredBanners.map((b) => (
                                    <Card key={b.id} className="flex flex-col p-4">
                                        {b.image && (
                                            <img
                                                src={b.image}
                                                alt={b.title}
                                                className="w-full h-32 object-cover rounded mb-2"
                                            />
                                        )}
                                        <h3 className="text-xl font-semibold">{b.title}</h3>
                                        <p className="text-muted-foreground mb-2">Type: {b.type}</p>
                                        <Badge variant={b.is_active ? "default" : "secondary"}>
                                            {b.is_active ? "Active" : "Inactive"}
                                        </Badge>
                                        <div className="mt-4 flex gap-2">
                                            <Button variant="outline" size="sm" onClick={() => handleEdit(b.id)}>
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-red-600 bg-transparent"
                                                onClick={() => handleDelete(b)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-10">
                                                <Checkbox
                                                    checked={isAllSelected}
                                                    onCheckedChange={toggleSelectAll}
                                                />
                                            </TableHead>
                                            
                                            <TableHead>Title</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Image</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredBanners.map((b) => (
                                            <TableRow key={b.id} className="hover:bg-muted/40">
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selected.includes(b.id)}
                                                        onCheckedChange={() => toggleSelectOne(b.id)}
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">{b.title}</TableCell>
                                                <TableCell>{b.type}</TableCell>
                                                <TableCell>
                                                    <Badge variant={b.is_active ? "default" : "secondary"}>
                                                        {b.is_active ? "Active" : "Inactive"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {b.image ? (
                                                        <img
                                                            src={b.image}
                                                            alt={b.title}
                                                            className="w-20 h-12 object-cover rounded"
                                                        />
                                                    ) : (
                                                        "-"
                                                    )}
                                                </TableCell>
                                                <TableCell className="space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleEdit(b.id)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-red-600 bg-transparent"
                                                        onClick={() => handleDelete(b)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )
                    ) : (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <div className="text-center">
                                    <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">No banners found</h3>
                                    <p className="text-muted-foreground mb-4">
                                        {searchTerm
                                            ? "Try adjusting your search terms"
                                            : "Get started by adding your first banner"}
                                    </p>
                                    <Button onClick={handleCreate}>
                                        <Plus className="h-4 w-4 mr-2" /> Add Banner
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <Pagination meta={banners.meta} links={banners.links} />
                </div>

                {/* Delete Dialog */}
                <AlertDialog open={!!deleteBanner} onOpenChange={() => setDeleteBanner(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete the banner "{deleteBanner?.title}".
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
