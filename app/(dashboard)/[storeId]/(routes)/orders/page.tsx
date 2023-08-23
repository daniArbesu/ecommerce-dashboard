import prismadb from '@/lib/prismadb';
import OrderClient from './components/OrderClient';
import type { OrderColumn } from './components/Columns';
import { format } from 'date-fns';
import { formatter } from '@/lib/utils';

interface Props {
  params: {
    storeId: string;
  };
}

const OrdersPage = async ({ params }: Props) => {
  const { storeId } = params;
  const orders = await prismadb.order.findMany({
    where: {
      storeId
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedOrders: OrderColumn[] = orders.map(
    ({ id, phone, address, orderItems, isPaid, createdAt }) => ({
      id,
      phone,
      address,
      products: orderItems.map((orderItem) => orderItem.product.name).join(', '),
      isPaid,
      totalPrice: formatter.format(
        orderItems.reduce((total, item) => {
          return total + Number(item.product.price);
        }, 0)
      ),
      createdAt: format(createdAt, 'MMMM do, yyyy')
    })
  );

  return (
    <main className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </main>
  );
};

export default OrdersPage;
