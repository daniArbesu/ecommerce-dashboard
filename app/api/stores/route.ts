import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!userId) {
      // user not logged in
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      // Not name field on the body
      return new NextResponse('Name is required', { status: 400 });
    }

    const store = await prismadb.store.create({ data: { name, userId } });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
