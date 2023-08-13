import prismadb from '@/lib/prismadb';

interface DashboardProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardProps> = async ({ params }) => {
  const { storeId } = params;

  const store = await prismadb.store.findFirst({ where: { id: storeId } });

  return <div>Active Store: {store?.name}</div>;
};

export default DashboardPage;
