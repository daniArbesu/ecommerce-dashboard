import prismadb from '@/lib/prismadb';
import ColorForm from './components/ColorForm';

interface Props {
  params: {
    colorId: string;
  };
}

const ColorPage = async ({ params }: Props) => {
  // if the param is "new" it's not gonna find the billboard and therefore we show a new form
  const color = await prismadb.color.findUnique({ where: { id: params.colorId } });
  return (
    <main className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </main>
  );
};

export default ColorPage;
