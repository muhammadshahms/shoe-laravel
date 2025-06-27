import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // For conditional styling
import { router } from '@inertiajs/react';

interface Props {
  meta: {
    current_page: number;
    last_page: number;
  };
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

export default function Pagination({ meta, links }: Props) {
  if (!links || links.length <= 3) return null; // Skip if pagination isn't needed

  const goTo = (url: string | null) => {
    if (url) {
      router.visit(url, {
        preserveScroll: true,
        preserveState: true,
      });
    }
  };

  return (
    <div className="flex justify-center mt-4 space-x-2">
      {links.map((link, i) => {
        const label = link.label.replace('&laquo;', '«').replace('&raquo;', '»');

        return (
          <Button
            key={i}
            variant={link.active ? 'default' : 'outline'}
            size="sm"
            disabled={!link.url}
            onClick={() => goTo(link.url)}
            className={cn({ 'bg-primary text-white': link.active })}
          >
            <span dangerouslySetInnerHTML={{ __html: label }} />
          </Button>
        );
      })}
    </div>
  );
}
