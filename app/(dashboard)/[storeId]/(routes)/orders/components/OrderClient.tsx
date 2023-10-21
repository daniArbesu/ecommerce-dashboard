'use client';
import Heading from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';
import { Columns, type OrderColumn } from './Columns';
import { DataTable } from '@/components/ui/DataTable';

interface Props {
  data: OrderColumn[];
}

const OrderClient: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Heading title={`Orders (${data.length})`} description="Manage orders for your store" />
      <Separator />
      <DataTable columns={Columns} data={data} searchKey="products" />
    </>
  );
};

export default OrderClient;
