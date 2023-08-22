'use client';

import type { ColumnDef } from '@tanstack/react-table';
import CellAction from './CellAction';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface SizeColumn {
  id: string;
  name: string;
  value: string;
  createdAt: string;
}

export const Columns: Array<ColumnDef<SizeColumn>> = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'value',
    header: 'Value'
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> }
];
