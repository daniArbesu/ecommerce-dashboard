import prismadb from '@/lib/prismadb';
import BillboardForm from './components/BillboardForm';

interface Props {
  params: {
    billboardId: string;
  };
}

const BillboardPage = async ({ params }: Props) => {
  // if the param is "new" it's not gonna find the billboard and therefore we show a new form
  const billboard = await prismadb.billboard.findUnique({ where: { id: params.billboardId } });
  return (
    <main className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </main>
  );
};

export default BillboardPage;
