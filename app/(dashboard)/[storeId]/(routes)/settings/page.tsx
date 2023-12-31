import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import SettingsForm from './components/SettingsForm';

interface Props {
  params: {
    storeId: string;
  };
}

const SettingsPage: React.FC<Props> = async ({ params }) => {
  const { userId } = auth();
  const { storeId } = params;

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({ where: { id: storeId, userId } });

  if (!store) {
    redirect('/');
  }

  return (
    <main className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </main>
  );
};

export default SettingsPage;
