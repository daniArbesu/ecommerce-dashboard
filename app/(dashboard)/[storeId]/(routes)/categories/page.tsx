import prismadb from '@/lib/prismadb';
import CategoryClient from './components/CategoryClient';
import type { CategoryColumn } from './components/Columns';
import { format } from 'date-fns';

interface Props {
  params: {
    storeId: string;
  };
}

const CategoriesPage = async ({ params }: Props) => {
  const { storeId } = params;
  const categories = await prismadb.category.findMany({
    where: {
      storeId
    },
    include: {
      billboard: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedCategories: CategoryColumn[] = categories.map(
    ({ id, name, billboard, createdAt }) => ({
      id,
      name,
      billboardLabel: billboard.label,
      createdAt: format(createdAt, 'MMMM do, yyyy')
    })
  );

  return (
    <main className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </main>
  );
};

export default CategoriesPage;
