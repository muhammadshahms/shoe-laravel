import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    parent_id: number | null;
    position: number | null;
    is_active: boolean;
    parent?: Category | null;
}

interface Props {
    categories: Category[];
}

export default function Index({ categories }: Props) {
    const handleDelete = (slug: string) => {
        if (confirm('Are you sure you want to delete this category?')) {
            router.delete(route('categories.destroy', slug));
        }
    };

    return (
        <AppLayout>
            <div className="p-4 space-y-4">
                {/* Header with search and create */}
                <div className="flex justify-between items-center gap-4">
                    <Input
                        type="text"
                        placeholder="Search categories..."
                        className="max-w-sm"
                    />
                    <Link href={route('categories.create')}>
                        <Button>Add Category</Button>
                    </Link>
                </div>

                {/* Table */}
                <Card className="overflow-auto max-h-[calc(100vh-200px)] border rounded-xl">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted">
                                <TableHead className="px-2">#</TableHead>
                                <TableHead className="px-2">Name</TableHead>
                                <TableHead className="px-2">Parent</TableHead>
                                <TableHead className="px-2">Position</TableHead>
                                <TableHead className="px-2">Status</TableHead>
                                <TableHead className="text-right px-2 w-32">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-200">
                            {categories.map((category, index) => (
                                <TableRow
                                    key={category.id}
                                    className="hover:bg-muted/40"
                                >
                                    <TableCell className="px-2 font-medium">{index + 1}</TableCell>
                                    <TableCell className="px-2">{category.name}</TableCell>
                                    <TableCell className="px-2">{category.parent?.name ?? '—'}</TableCell>
                                    <TableCell className="px-2">{category.position ?? '—'}</TableCell>
                                    <TableCell className="px-2">
                                        {category.is_active ? (
                                            <span className="text-green-600">Active</span>
                                        ) : (
                                            <span className="text-red-600">Inactive</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right px-2 w-32 space-x-2">
                                        <Link href={route('categories.edit', category.slug)}>
                                            <Button size="sm" variant="outline">Edit</Button>
                                        </Link>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(category.slug)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AppLayout>
    );
}
