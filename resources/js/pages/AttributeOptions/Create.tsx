import React from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function Create({ attribute }) {
  const { data, setData, post, processing, errors } = useForm({
    label: '',
    value: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('attributes.options.store', attribute.id));
  };

  return (
    <AppLayout title={`Add Option for ${attribute.name}`}>
      <div className='p-4'>
        <h1 className="text-xl font-bold mb-4">Add Option for {attribute.name}</h1>
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

          <Button type="submit" disabled={processing}>Save</Button>
        </form>
      </div>
    </AppLayout>
  );
}
