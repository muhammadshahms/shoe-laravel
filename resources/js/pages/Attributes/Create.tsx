import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { BreadcrumbItem } from '@/types';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    type: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('attributes.store'));
  };
  const { breadcrumbs: rawBreadcrumbs } = usePage().props;

  const breadcrumbs = (rawBreadcrumbs ?? []) as BreadcrumbItem[];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className='p-4'>
        <h1 className="text-xl font-bold mb-4">Create Attribute</h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <Label>Name</Label>
            <Input value={data.name} onChange={e => setData('name', e.target.value)} />
            {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
          </div>
          <div>
            <Label>Type</Label>
            <select
              value={data.type}
              onChange={(e) => setData('type', e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="">Select Type</option>
              <option value="text">Text</option>
              <option value="select">Select</option>
              <option value="color">Color</option>
            </select>
            {errors.type && <div className="text-red-500 text-sm">{errors.type}</div>}
          </div>
          <Button type="submit" disabled={processing}>Save</Button>
        </form>
      </div >
    </AppLayout>

  );
}
