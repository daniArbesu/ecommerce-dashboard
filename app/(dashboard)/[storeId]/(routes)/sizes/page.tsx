import prismadb from '@/lib/prismadb';
import SizeClient from './components/SizeClient';
import type { SizeColumn } from './components/Columns';
import { format } from 'date-fns';

interface Props {
  params: {
    storeId: string;
  };
}

const SizesPage = async ({ params }: Props) => {
  const { storeId } = params;
  const sizes = await prismadb.size.findMany({
    where: {
      storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedSizes: SizeColumn[] = sizes.map(({ id, name, value, createdAt }) => ({
    id,
    name,
    value,
    createdAt: format(createdAt, 'MMMM do, yyyy')
  }));

  return (
    <main className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </main>
  );
};

export default SizesPage;
