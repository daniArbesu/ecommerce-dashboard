import prismadb from '@/lib/prismadb';
import ProductClient from './components/ProductClient';
import type { ProductColumn } from './components/Columns';
import { format } from 'date-fns';
import { formatter } from '@/lib/utils';

interface Props {
  params: {
    storeId: string;
  };
}

const ProductsPage = async ({ params }: Props) => {
  const { storeId } = params;
  const products = await prismadb.product.findMany({
    where: {
      storeId
    },
    include: {
      category: true,
      size: true,
      color: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedProducts: ProductColumn[] = products.map(
    ({ id, name, price, category, size, color, isFeatured, isArchived, createdAt }) => ({
      id,
      name,
      isFeatured,
      isArchived,
      price: formatter.format(price.toNumber()),
      category: category.name,
      size: size.name,
      color: color.value,
      createdAt: format(createdAt, 'MMMM do, yyyy')
    })
  );

  return (
    <main className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </main>
  );
};

export default ProductsPage;
