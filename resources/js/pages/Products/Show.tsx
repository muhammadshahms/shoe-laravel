import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Props } from '@/validations/product-schema';

export default function Show({ product, brands, categories, mainImageUrl, galleryUrls }: Props) {
    console.log({ product, mainImageUrl, galleryUrls });

    return (
        <AppLayout >
            <div className="max-w-4xl mx-auto py-8 space-y-6">
                {/* Product Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>{product?.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Brand: {product?.name || 'N/A'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Categories:{" "}
                            {categories?.length > 0
                                ? categories.map((cat: any) => cat.name).join(', ')
                                : 'N/A'}
                        </p>
                    </CardHeader>

                    <CardContent>
                        {mainImageUrl ? (
                            <img
                                src={mainImageUrl}
                                alt={product?.name || 'Product image'}
                                className="w-full h-auto rounded-md shadow"
                            />
                        ) : (
                            <p className="text-sm text-muted-foreground">No main image available.</p>
                        )}

                        {/* Product Description */}
                        {product?.description && (
                            <div className="mt-4 prose max-w-none">
                                <p>{product.description}</p>
                            </div>
                        )}

                        {/* Gallery */}
                        {galleryUrls && galleryUrls.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">Gallery</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {galleryUrls.map((url, i) => (
                                        <img
                                            key={i}
                                            src={url}
                                            alt={`Gallery image ${i + 1}`}
                                            className="w-full h-auto rounded-md border"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Back Button */}
                        <div className="mt-6">
                            <Button onClick={() => window.history.back()}>
                                Go Back
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
