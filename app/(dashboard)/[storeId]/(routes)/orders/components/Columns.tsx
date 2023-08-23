'use client';

import type { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface OrderColumn {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
}

export const Columns: Array<ColumnDef<OrderColumn>> = [
  {
    accessorKey: 'products',
    header: 'Products'
  },
  {
    accessorKey: 'phone',
    header: 'Phone'
  },
  {
    accessorKey: 'address',
    header: 'Address'
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total Price'
  },
  {
    accessorKey: 'isPaid',
    header: 'Paid'
  }
];
