import { useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';

interface Category {
    id: number;
    name: string;
}

interface Props {
    category: {
        id: number;
        name: string;
        description: string;
        parent_id: string | null;
        position: number | null;
        is_active: boolean;
        slug: string;
    };
    parents: Category[];
}

export default function Edit({ category, parents }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
        description: category.description,
        parent_id: category.parent_id !== null ? String(category.parent_id) : 'null',
        position: category.position ?? '',
        is_active: category.is_active,
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('categories.update', category.slug));
    };

    return (

        <AppLayout>
            <form onSubmit={handleSubmit} className="space-y-4 p-4">
                <div className='space-y-2'>
                    <Label>Name</Label>
                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                </div>

                <div className='space-y-2'>
                    <Label>Description</Label>
                    <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} />
                </div>

                <div className='space-y-2'>
                    <Label>Parent Category</Label>
                    <Select
                        value={data.parent_id}
                        onValueChange={(value) => setData('parent_id', value === 'null' ? null : value)}
                    >
                        <SelectTrigger>
                            <SelectValue
                                placeholder="Select parent category"
                                defaultValue={
                                    parents.find((p) => String(p.id) === data.parent_id)?.name ?? 'None'
                                }
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="null">None</SelectItem>
                            {parents.map((cat) => (
                                <SelectItem key={cat.id} value={String(cat.id)}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>


                </div>

                <div className='space-y-2'>
                    <Label>Position</Label>
                    <Input type="number" value={data.position} onChange={(e) => setData('position', e.target.value)} />
                </div>

                <div className="flex items-center space-x-2">
                    <Switch checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
                    <Label>Active</Label>
                </div>

                <Button type="submit" disabled={processing}>
                    Update
                </Button>
            </form>
        </AppLayout>
    );
}
