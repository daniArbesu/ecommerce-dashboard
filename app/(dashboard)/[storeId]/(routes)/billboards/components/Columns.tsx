'use client';

import type { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface BillboardColumn {
  id: string;
  label: string;
  createdAt: string;
}

export const Columns: Array<ColumnDef<BillboardColumn>> = [
  {
    accessorKey: 'label',
    header: 'Label'
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  }
];
