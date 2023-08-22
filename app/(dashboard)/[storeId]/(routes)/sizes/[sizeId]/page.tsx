import prismadb from '@/lib/prismadb';
import SizeForm from './components/SizeForm';

interface Props {
  params: {
    sizeId: string;
  };
}

const SizePage = async ({ params }: Props) => {
  // if the param is "new" it's not gonna find the billboard and therefore we show a new form
  const size = await prismadb.size.findUnique({ where: { id: params.sizeId } });
  return (
    <main className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </main>
  );
};

export default SizePage;
