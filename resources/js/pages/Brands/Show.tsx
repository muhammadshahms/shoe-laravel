"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AppLayout from "@/layouts/app-layout"

interface Props {
    brand: {
        name: string
        description?: string
        website?: string
        position?: number
        is_active: boolean
        logo_url: string
    }
}

export default function Show({ brand }: Props) {
    return (
        <AppLayout>
            <Card>
                <CardHeader>
                    <CardTitle>{brand.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <img src={brand.logo_url} alt={brand.name} className="w-32 mb-4" />
                    <p><strong>Description:</strong> {brand.description}</p>
                    <p><strong>Website:</strong> {brand.website}</p>
                    <p><strong>Position:</strong> {brand.position}</p>
                    <p><strong>Status:</strong> {brand.is_active ? "Active" : "Inactive"}</p>
                </CardContent>
            </Card>
        </AppLayout>
    )
}
