'use client';
import { usePathname, useParams } from 'next/navigation';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId as string}`,
      label: 'Dashboard',
      active: pathname === `/${params.storeId as string}`
    },
    {
      href: `/${params.storeId as string}/billboards`,
      label: 'Billboards',
      active: pathname === `/${params.storeId as string}/billboards`
    },
    {
      href: `/${params.storeId as string}/categories`,
      label: 'Categories',
      active: pathname === `/${params.storeId as string}/categories`
    },
    {
      href: `/${params.storeId as string}/sizes`,
      label: 'Sizes',
      active: pathname === `/${params.storeId as string}/sizes`
    },
    {
      href: `/${params.storeId as string}/colors`,
      label: 'Colors',
      active: pathname === `/${params.storeId as string}/colors`
    },
    {
      href: `/${params.storeId as string}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId as string}/settings`
    }
  ];

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map(({ href, label, active }) => (
        <Link
          href={href}
          key={href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
