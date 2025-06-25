import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Pencil, Trash2, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  children?: Category[];
}

interface Props {
  categories: Category[];
}

const buildTree = (categories: Category[]): Category[] => {
  const map = new Map<number, Category>();
  const roots: Category[] = [];

  categories.forEach(cat => map.set(cat.id, { ...cat, children: [] }));

  categories.forEach(cat => {
    if (cat.parent_id) {
      const parent = map.get(cat.parent_id);
      parent?.children?.push(map.get(cat.id)!);
    } else {
      roots.push(map.get(cat.id)!);
    }
  });

  return roots;
};

const TreeNode = ({ node }: { node: Category }) => {
  const [expanded, setExpanded] = useState(false);

  const handleEdit = () => router.visit(route('categories.edit', node.slug));
  const handleDelete = () => {
    if (confirm(`Delete category "${node.name}"?`)) {
      router.delete(route('categories.destroy', node.slug));
    }
  };

  return (

    <div className="ml-4 border-l pl-4 mt-2">
      <Card className="flex justify-between items-center p-3 shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setExpanded(!expanded)}>
          {node.children?.length ? (
            expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
          ) : (
            <span className="w-4 h-4" />
          )}
          <span className="font-medium text-gray-800">{node.name}</span>
        </div>
        <div className="flex gap-1">
          <Button size="icon" variant="ghost" onClick={handleEdit}>
            <Pencil className="w-4 h-4 text-blue-500" />
          </Button>
          <Button size="icon" variant="ghost" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </Card>

      {expanded && node.children?.map(child => <TreeNode key={child.id} node={child} />)}
    </div>
  );
};

export default function CategoryTree({ categories }: Props) {
  const tree = buildTree(categories);

  return (
    <AppLayout>
      <div className="p-6  bg-white shadow rounded space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Category Tree</h2>
        {tree.length ? (
          tree.map(root => <TreeNode key={root.id} node={root} />)
        ) : (
          <p className="text-gray-500">No categories found</p>
        )}
      </div>
    </AppLayout>
  );
}
