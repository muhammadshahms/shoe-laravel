import React from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';

export default function Index({ attribute, options }) {
  const handleDelete = (id) => {
    if (confirm('Delete this option?')) {
      router.delete(route('attributes.options.destroy', [attribute.id, id]));
    }
  };

  return (
    <AppLayout title={`Options for ${attribute.name}`}>
      <div className='p-4'>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Options for {attribute.name}</h1>
          <Link href={route('attributes.options.create', attribute.id)}>
            <Button>Add Option</Button>
          </Link>
        </div>

        <div className="bg-white rounded shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2">Label</th>
                <th className="text-left p-2">Value</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {options.map(opt => (
                <tr key={opt.id} className="border-t">
                  <td className="p-2">{opt.label}</td>
                  <td className="p-2">{opt.value}</td>
                  <td className="p-2 space-x-2">
                    <Link href={route('attributes.options.edit', [attribute.id, opt.id])}>
                      <Button variant="outline">Edit</Button>
                    </Link>
                    <Button variant="destructive" onClick={() => handleDelete(opt.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
