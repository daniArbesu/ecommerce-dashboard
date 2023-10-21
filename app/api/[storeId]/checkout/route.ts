import type Stripe from 'stripe';
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { stripe } from '@/lib/stripe';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

interface POSTParams {
  params: {
    storeId: string;
  };
}

// Options request before the post in order to avoid CORS problems
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request, { params }: POSTParams) {
  const { productIds } = await req.json();

  if (!productIds || productIds.length === 0) {
    return new NextResponse('Products ids are required', { status: 400 });
  }

  const products = await prismadb.product.findMany({
    where: {
      id: { in: productIds }
    }
  });

  console.log(products);

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product) => {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: 'USD',
        product_data: { name: product.name },
        unit_amount: product.price.toNumber() * 100
      }
    });
  });

  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId
            }
          }
        }))
      }
    }
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true
    },
    success_url: `${process.env.FRONTEND_STORE_URL as string}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL as string}/cart?canceled=1`,
    metadata: {
      orderId: order.id
    }
  });

  return NextResponse.json({ url: session.url }, { headers: corsHeaders });
}
