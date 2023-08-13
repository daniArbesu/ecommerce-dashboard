import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const SetupLayout = async ({ children }: LayoutProps) => {
  const { userId } = auth();

  if (!userId) {
    // if not logged in redirect to sign in page
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({ where: { userId } });

  if (store) {
    // if the user already has a store redirect to the dashboard
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
};

export default SetupLayout;
