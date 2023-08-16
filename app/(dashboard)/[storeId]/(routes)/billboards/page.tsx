import prismadb from '@/lib/prismadb';
import BillboardClient from './components/BillboardClient';
import type { BillboardColumn } from './components/Columns';
import { format } from 'date-fns';

interface Props {
  params: {
    storeId: string;
  };
}

const BillboardsPage = async ({ params }: Props) => {
  const { storeId } = params;
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedBillboards: BillboardColumn[] = billboards.map(({ id, label, createdAt }) => ({
    id,
    label,
    createdAt: format(createdAt, 'MMMM do, yyyy')
  }));

  return (
    <main className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </main>
  );
};

export default BillboardsPage;
