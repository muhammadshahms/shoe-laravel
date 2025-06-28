import React from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';

export default function Index({ attributes }) {
  const handleDelete = (id) => {
    if (confirm('Are you sure to delete this attribute?')) {
      router.delete(route('attributes.destroy', id));
    }
  };

  return (
    <AppLayout title="Attributes">
      <div className='p-4'>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Attributes</h1>
          <Link href={route('attributes.create')}>
            <Button>Add Attribute</Button>
          </Link>
        </div>

        <div className="bg-white rounded shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Code</th>
                <th className="text-left p-2">Options Count</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attributes.map(attr => (
                <tr key={attr.id} className="border-t">
                  <td className="p-2">{attr.name}</td>
                  <td className="p-2">{attr.code}</td>
                  <td className="p-2">{attr.options_count}</td>
                  <td className="p-2 space-x-2">
                    <Link href={route('attributes.options.index', attr.id)}>
                      <Button variant="outline">Options</Button>
                    </Link>
                    <Link href={route('attributes.edit', attr.id)}>
                      <Button variant="outline">Edit</Button>
                    </Link>
                    <Button variant="destructive" onClick={() => handleDelete(attr.id)}>
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
