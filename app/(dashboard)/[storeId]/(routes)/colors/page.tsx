import prismadb from '@/lib/prismadb';
import ColorClient from './components/ColorClient';
import type { ColorColumn } from './components/Columns';
import { format } from 'date-fns';

interface Props {
  params: {
    storeId: string;
  };
}

const ColorsPage = async ({ params }: Props) => {
  const { storeId } = params;
  const colors = await prismadb.color.findMany({
    where: {
      storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedColors: ColorColumn[] = colors.map(({ id, name, value, createdAt }) => ({
    id,
    name,
    value,
    createdAt: format(createdAt, 'MMMM do, yyyy')
  }));

  return (
    <main className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </main>
  );
};

export default ColorsPage;
