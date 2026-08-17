'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface SidebarProps {
  user?: {
    email?: string;
  } | null;
}

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const MAIN_NAV: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Jobs', href: '/dashboard/jobs', icon: '💼' },
  { label: 'Applications', href: '/dashboard/applications', icon: '📋' },
  { label: 'Kanban', href: '/dashboard/kanban', icon: '📌' },
];

const TOOLS_NAV: NavItem[] = [
  { label: 'Search Profiles', href: '/dashboard/search-profiles', icon: '🎯' },
];

const MANAGEMENT_NAV: NavItem[] = [
  { label: 'Recruiters', href: '/dashboard/recruiters', icon: '👥' },
  { label: 'Activity', href: '/dashboard/activity', icon: '📈' },
  { label: 'Analytics', href: '/dashboard/analytics', icon: '📉' },
];

const BOTTOM_NAV: NavItem[] = [
  { label: 'Profile', href: '/dashboard/profile', icon: '⚙️' },
];

function NavSection({
  items,
  title,
  pathname,
  collapsed,
}: {
  items: NavItem[];
  title?: string;
  pathname: string;
  collapsed: boolean;
}) {
  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <div className="mb-6">
      {title && (
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
          {collapsed ? '·' : title}
        </h3>
      )}
      <div className="space-y-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive(item.href)
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
            title={collapsed ? item.label : undefined}
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Sidebar(_props: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden lg:flex flex-col fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      <div className="flex-1 overflow-y-auto py-4">
        <NavSection items={MAIN_NAV} pathname={pathname} collapsed={collapsed} />
        <NavSection items={TOOLS_NAV} title="Tools" pathname={pathname} collapsed={collapsed} />
        <NavSection
          items={MANAGEMENT_NAV}
          title="Management"
          pathname={pathname}
          collapsed={collapsed}
        />
      </div>

      <div className="border-t border-gray-200 p-4">
        <NavSection items={BOTTOM_NAV} pathname={pathname} collapsed={collapsed} />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <span>{collapsed ? '→' : '←'}</span>
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
