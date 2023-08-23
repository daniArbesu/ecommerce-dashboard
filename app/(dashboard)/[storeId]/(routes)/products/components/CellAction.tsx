'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { type BillboardColumn } from './Columns';
import { Button } from '@/components/ui/button';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import AlertModal from '@/components/modals/AlertModal';

interface Props {
  data: BillboardColumn;
}

const CellAction: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    void navigator.clipboard.writeText(id);
    toast.success('Billboard Id copied to the clipboard');
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId as string}/billboards/${data.id}`);
      router.refresh();
      toast.success('Billboard deleted.');
    } catch (error) {
      toast.error('Make sure you removed all categories using this billboard first.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              onCopy(data.id);
            }}
          >
            <Copy className="mr-2 w-4 h-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(`/${params.storeId as string}/billboards/${data.id}`);
            }}
          >
            <Edit className="mr-2 w-4 h-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="mr-2 w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
