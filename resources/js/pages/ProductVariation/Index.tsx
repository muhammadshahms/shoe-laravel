import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Variation {
    id: number;
    sku: string;
    price: number;
    quantity: number;
    in_stock: boolean;
    product?: {
        name: string;
    };
}

interface VariationsProp {
    variations: {
        data: Variation[];
    };
}

export default function Index({ variations }: VariationsProp) {
    return (
        <AppLayout>
            <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Product Variations</h1>
                    <Link href={route('product-variations.create')}>
                        <Button>Add Variation</Button>
                    </Link>
                </div>

                <div className="grid gap-4">
                    {variations.data.map((variation: any) => (
                        <Card key={variation.id}>
                            <CardContent className="p-4">
                                <div className="font-semibold">{variation.sku}</div>
                                <div>Price: {variation.price}</div>
                                <div>Quantity: {variation.quantity}</div>
                                <div>In Stock: {variation.in_stock ? 'Yes' : 'No'}</div>
                                <div>Product: {variation.product?.name}</div>
                                <div className="flex space-x-2 mt-2">
                                    <Link href={route('product-variations.edit', variation.id)}>
                                        <Button>Edit</Button>
                                    </Link>
                                    <Link
                                        href={route('product-variations.destroy', variation.id)}
                                        method="delete"
                                        as="button"
                                    >
                                        <Button variant="destructive">Delete</Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
