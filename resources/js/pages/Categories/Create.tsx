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
    parents: Category[];
}

export default function Create({ parents }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        parent_id: '',
        position: '',
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('categories.store'));
    };

    return (
        <AppLayout>

            <h2 className="text-2xl font-bold">Create Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label>Name</Label>
                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                    <Label>Description</Label>
                    <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} />
                </div>

                <div>
                    <Label>Parent Category</Label>
                    <Select value={data.parent_id} onValueChange={(value) => setData('parent_id', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select parent category" />
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

                <div>
                    <Label>Position</Label>
                    <Input type="number" value={data.position} onChange={(e) => setData('position', e.target.value)} />
                </div>

                <div className="flex items-center space-x-2">
                    <Switch checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
                    <Label>Active</Label>
                </div>

                <Button type="submit" disabled={processing}>
                    Save
                </Button>
            </form>

        </AppLayout>
    );
}
