import prismadb from '@/lib/prismadb';
import CategoryForm from './components/CategoryForm';

interface Props {
  params: {
    categoryId: string;
    storeId: string;
  };
}

const CategoryPage = async ({ params }: Props) => {
  const { categoryId, storeId } = params;
  // if the param is "new" it's not gonna find the billboard and therefore we show a new form
  const category = await prismadb.category.findUnique({ where: { id: categoryId } });

  const billboards = await prismadb.billboard.findMany({ where: { storeId } });
  return (
    <main className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </main>
  );
};

export default CategoryPage;
