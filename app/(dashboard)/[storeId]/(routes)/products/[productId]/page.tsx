import prismadb from '@/lib/prismadb';
import ProductForm from './components/ProductForm';

interface Props {
  params: {
    productId: string;
    storeId: string;
  };
}

const ProductPage = async ({ params }: Props) => {
  // if the param is "new" it's not gonna find the billboard and therefore we show a new form
  const product = await prismadb.product.findUnique({
    where: { id: params.productId },
    include: { images: true }
  });
  const categories = await prismadb.category.findMany({ where: { storeId: params.storeId } });
  const sizes = await prismadb.size.findMany({ where: { storeId: params.storeId } });
  const colors = await prismadb.color.findMany({ where: { storeId: params.storeId } });

  return (
    <main className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm initialData={product} categories={categories} sizes={sizes} colors={colors} />
      </div>
    </main>
  );
};

export default ProductPage;
