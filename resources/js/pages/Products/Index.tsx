import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import Pagination from '@/components/pagination';
interface Props {
    products: {
        data: Product[];
        meta: {
            current_page: number;
            last_page: number;
        };
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
}

export default function Index({ products }) {
    const [selected, setSelected] = useState([]);

    const toggleSelectAll = () => {
        if (selected.length === products.data.length) {
            setSelected([]);
        } else {
            setSelected(products.data.map(p => p.id));
        }
    };

    const toggleSelectOne = (id) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
        );
    };

    const isAllSelected = products.data.length > 0 && selected.length === products.data.length;

    const handleDelete = (slug) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        router.delete(`/dashboard/products/${slug}`, {
            onSuccess: () => toast.success('Product deleted successfully'),
            onError: () => toast.error('Failed to delete product'),
        });
    };


    return (
        <AppLayout>
            <div className="p-4 space-y-4">
                <div className="flex justify-between items-center gap-4">
                    {/* Search input */}
                    <Input
                        type="text"
                        placeholder="Search products..."
                        className="max-w-sm"
                    // Optional: add onChange or value binding
                    />

                    <Link href="/dashboard/products/create">
                        <Button>Add Product</Button>
                    </Link>
                </div>


                <Card className="overflow-auto max-h-[calc(100vh-200px)] border rounded-xl">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted">
                                <TableHead className="w-10 px-2">
                                    <Checkbox
                                        checked={isAllSelected}
                                        onCheckedChange={toggleSelectAll}
                                        aria-label="Select all"
                                    />
                                </TableHead>
                                <TableHead className="w-10 px-2">#</TableHead>
                                <TableHead className="px-2">Name</TableHead>
                                <TableHead className="px-2">Price</TableHead>
                                <TableHead className="px-2">Brand</TableHead>
                                <TableHead className="px-2">Category</TableHead>
                                <TableHead className="px-2">Stock</TableHead>
                                <TableHead className="px-2 w-24">Status</TableHead>
                                <TableHead className="text-right px-2 w-28">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-200">
                            {products.data.map((product, index) => (
                                <TableRow
                                    key={product?.slug}
                                    className="first:rounded-t-md last:rounded-b-md hover:bg-muted/40"
                                >
                                    <TableCell className="w-10 px-2">
                                        <Checkbox
                                            checked={selected.includes(product?.slug)}
                                            onCheckedChange={() => toggleSelectOne(product?.slug)}
                                            aria-label={`Select product ${product.name}`}
                                        />
                                    </TableCell>
                                    <TableCell className="w-10 px-2 font-medium">{index + 1}</TableCell>
                                    <TableCell className="px-2">{product.name}</TableCell>
                                    <TableCell className="px-2">{product.price}</TableCell>
                                    <TableCell className="px-2">{product.brand?.name || '—'}</TableCell>
                                    <TableCell className="px-2">
                                        {product.categories_list || '—'}
                                    </TableCell>
                                    <TableCell className="px-2">{product.quantity}</TableCell>

                                    <TableCell className="px-2 w-24">
                                        {product.is_active ? (
                                            <span className="text-green-600">Active</span>
                                        ) : (
                                            <span className="text-red-600">Inactive</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right px-2 w-28 space-x-2">
                                        <Link href={`/dashboard/products/${product?.slug}/edit`}>
                                            <Button size="sm" variant="outline">Edit</Button>
                                        </Link>
                                        {/* create delete functionality here */}
                                        <Button size="sm" variant="destructive" onClick={() => handleDelete(product?.slug)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Pagination meta={products.meta} links={products.links} />
                </Card>
            </div>
        </AppLayout>
    );
}
