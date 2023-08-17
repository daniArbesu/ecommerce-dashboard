'use client';

import type { ColumnDef } from '@tanstack/react-table';
import CellAction from './CellAction';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface CategoryColumn {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
}

export const Columns: Array<ColumnDef<CategoryColumn>> = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'billboard',
    header: 'Billboard',
    cell: ({ row }) => row.original.billboardLabel
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> }
];
