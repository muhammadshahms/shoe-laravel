"use client";

import { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { Search, Grid, List, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import AppLayout from "@/layouts/app-layout";
import Pagination from "@/components/pagination";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { BreadcrumbItem } from "@/types";

interface Order {
    id: number;
    order_number: string;
    status: string;
    grand_total: number;
    item_count: number;
    payment_status: string;
    payment_method: string;
    user?: { name: string; email: string };
}

interface Props {
    orders: { data: Order[]; meta: any; links: any };
}

export default function OrdersPage({ orders }: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "table">("table");
    const [deleteOrder, setDeleteOrder] = useState<Order | null>(null);
    const [selected, setSelected] = useState<number[]>([]);

    const formatPrice = (price: number | string | undefined) => {
        const num = typeof price === "string" ? parseFloat(price) : price;
        return num ? num.toFixed(2) : "0.00";
    };

    const filteredOrders = orders.data?.filter((order) =>
        [order.order_number, order.status, order.payment_status, order.payment_method]
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    ) ?? [];

    const toggleSelectAll = () => {
        if (selected.length === filteredOrders.length) setSelected([]);
        else setSelected(filteredOrders.map((o) => o.id));
    };

    const toggleSelectOne = (id: number) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        );
    };

    const handleDelete = (order: Order) => setDeleteOrder(order);

    const confirmDelete = () => {
        if (deleteOrder) {
            router.delete(route("orders.destroy", deleteOrder.id));
            setDeleteOrder(null);
        }
    };

    const handleBulkDelete = () => {
        if (selected.length === 0) return;
        router.post(route("orders.bulk-delete"), { ids: selected });
        setSelected([]);
    };

    const handleView = (id: number) => {
        router.get(route("orders.show", id));
    };

    const updateOrderField = (id: number, field: string, value: string) => {
        router.put(route("orders.update", id), { [field]: value }, { preserveScroll: true });
    };

    const { breadcrumbs: rawBreadcrumbs } = usePage().props;
    const breadcrumbs = (rawBreadcrumbs ?? []) as BreadcrumbItem[];
    
    const orderStatusOptions = ["pending", "processing", "shipped", "completed", "canceled"];
    const paymentStatusOptions = ["paid", "unpaid", "refunded"];
    

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders" />
            <div className="container mx-auto py-8 px-4">
                <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold">Orders</h1>
                            <p className="text-muted-foreground">Manage customer orders</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {selected.length > 0 && (
                                <Button variant="destructive" onClick={handleBulkDelete}>
                                    Delete Selected ({selected.length})
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Search and View Mode */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search orders..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
                                <Grid className="h-4 w-4" />
                            </Button>
                            <Button variant={viewMode === "table" ? "default" : "outline"} size="sm" onClick={() => setViewMode("table")}>
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Orders Grid or Table */}
                    {filteredOrders.length > 0 ? (
                        viewMode === "table" ? (
                            <>
                                <div className="rounded-md border overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-10">
                                                    <Checkbox
                                                        checked={filteredOrders.length > 0 && selected.length === filteredOrders.length}
                                                        onCheckedChange={toggleSelectAll}
                                                        aria-label="Select all"
                                                    />
                                                </TableHead>
                                                <TableHead>Order #</TableHead>
                                                <TableHead>Customer</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Items</TableHead>
                                                <TableHead>Total</TableHead>
                                                <TableHead>Payment Status</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredOrders.map((order) => (
                                                <TableRow key={order.id} className="hover:bg-muted/40">
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={selected.includes(order.id)}
                                                            onCheckedChange={() => toggleSelectOne(order.id)}
                                                            aria-label={`Select order ${order.order_number}`}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="font-medium">{order.order_number}</TableCell>
                                                    <TableCell>{order.user?.name || "-"}</TableCell>
                                                    <TableCell>
                                                        <Select value={order.status} onValueChange={(v) => updateOrderField(order.id, "status", v)}>
                                                            <SelectTrigger className="w-[130px]">
                                                                <SelectValue placeholder="Select" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {orderStatusOptions.map((status) => (
                                                                    <SelectItem key={status} value={status}>{status}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell>{order.item_count}</TableCell>
                                                    <TableCell>${formatPrice(order.grand_total)}</TableCell>
                                                    <TableCell>
                                                        <Select value={order.payment_status} onValueChange={(v) => updateOrderField(order.id, "payment_status", v)}>
                                                            <SelectTrigger className="w-[110px]">
                                                                <SelectValue placeholder="Select" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {paymentStatusOptions.map((status) => (
                                                                    <SelectItem key={status} value={status}>{status}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell className="space-x-2">
                                                        <Button variant="outline" size="sm" onClick={() => handleView(order.id)}>View</Button>
                                                        <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleDelete(order)}>Delete</Button>
                                                        <a
                                                            href={route("orders.invoice", order.id)}
                                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                                        >
                                                            Download Invoice
                                                        </a>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <Pagination meta={orders.meta} links={orders.links} />
                            </>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredOrders.map((order) => (
                                    <Card key={order.id} className="p-4">
                                        <h3 className="font-bold text-lg">{order.order_number}</h3>
                                        <p>Customer: {order.user?.name || "-"}</p>
                                        <p>Status: {order.status}</p>
                                        <p>Total: ${formatPrice(order.grand_total)}</p>
                                        <div className="mt-4 flex gap-2">
                                            <Button size="sm" onClick={() => handleView(order.id)}>View</Button>
                                            <Button size="sm" variant="destructive" onClick={() => handleDelete(order)}>Delete</Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )
                    ) : (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                                <p className="text-muted-foreground mb-4">
                                    {searchTerm ? "Try adjusting your search terms" : "No orders have been placed yet"}
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Delete Confirmation Dialog */}
                <AlertDialog open={!!deleteOrder} onOpenChange={() => setDeleteOrder(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete order "{deleteOrder?.order_number}".
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
