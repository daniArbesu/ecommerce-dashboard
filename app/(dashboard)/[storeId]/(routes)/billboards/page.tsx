import BillboardClient from './components/BillboardClient';

const BillboardsPage = () => {
  return (
    <main className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient />
      </div>
    </main>
  );
};

export default BillboardsPage;
