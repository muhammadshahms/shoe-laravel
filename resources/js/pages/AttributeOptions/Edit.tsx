import React from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function Edit({ attribute, option }) {
  const { data, setData, put, processing, errors } = useForm({
    label: option.label || '',
    value: option.value || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('attributes.options.update', [attribute.id, option.id]));
  };

  return (
    <AppLayout title={`Edit Option for ${attribute.name}`}>

      <div className='p-4'>
        <h1 className="text-xl font-bold mb-4">Edit Option for {attribute.name}</h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <Label>Label</Label>
            <Input value={data.label} onChange={e => setData('label', e.target.value)} />
            {errors.label && <div className="text-red-500 text-sm">{errors.label}</div>}
          </div>

          <div>
            <Label>Value</Label>
            <Input value={data.value} onChange={e => setData('value', e.target.value)} />
            {errors.value && <div className="text-red-500 text-sm">{errors.value}</div>}
          </div>

          <Button type="submit" disabled={processing}>Update</Button>
        </form>
      </div>
    </AppLayout>
  );
}
