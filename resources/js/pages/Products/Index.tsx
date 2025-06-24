import React from 'react';
import { Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';

export default function Index({ products }) {
    return (
        <AppLayout>
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <Link href="/products/create">
                        <Button >Add Product</Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.data.map((product) => (
                        <Card key={product.id}>
                            <CardContent className="p-4 space-y-2">
                                <h2 className="font-semibold text-lg">{product.name}</h2>
                                <p className="text-sm">Price: ${product.price}</p>
                                <p className="text-sm">Brand: {product.brand?.name || '—'}</p>
                                <Link href={`/products/${product.id}/edit`}>
                                    <Button size="sm">Edit</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}