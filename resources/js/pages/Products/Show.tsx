import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Props } from '@/validations/product-schema';

export default function Show({ product, brands, categories, main_image_url, gallery_urls }: Props) {
    console.log({ product, main_image_url, gallery_urls });

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
                        {main_image_url ? (
                            <img
                                src={main_image_url}
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
                        {gallery_urls && gallery_urls.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">Gallery</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {gallery_urls.map((url, i) => (
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
