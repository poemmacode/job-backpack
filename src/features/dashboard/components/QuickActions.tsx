import Link from 'next/link';
import { Button } from '@/components/Button';

const actions = [
  {
    label: 'Add Job',
    href: '/dashboard/jobs/new',
    variant: 'primary' as const,
  },
  {
    label: 'View Jobs',
    href: '/dashboard/jobs',
    variant: 'secondary' as const,
  },
  {
    label: 'Applications',
    href: '/dashboard/applications',
    variant: 'secondary' as const,
  },
  {
    label: 'Kanban',
    href: '/dashboard/kanban',
    variant: 'secondary' as const,
  },
  {
    label: 'Recruiters',
    href: '/dashboard/recruiters',
    variant: 'secondary' as const,
  },
];

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-medium text-gray-600 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {actions.map((action) => (
          <Link key={action.href} href={action.href}>
            <Button variant={action.variant} size="sm" className="w-full">
              {action.label}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
