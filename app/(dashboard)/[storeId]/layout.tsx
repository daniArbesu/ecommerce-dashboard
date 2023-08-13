import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
  params: { storeId: string };
}

const DahsboardLayout = async ({ children, params }: LayoutProps) => {
  const { userId } = auth();
  const { storeId } = params;

  if (!userId) {
    // if not logged in redirect to sign in page
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({ where: { id: storeId, userId } });

  if (!store) {
    // if the user made up the store return to homepage
    redirect('/');
  }

  return (
    <>
      <div>Navbar</div>
      {children}
    </>
  );
};

export default DahsboardLayout;
