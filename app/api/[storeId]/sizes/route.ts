import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

interface POSTParams {
  params: {
    storeId: string;
  };
}

export async function POST(req: Request, { params }: POSTParams) {
  try {
    const { userId } = auth();
    const { name, value } = await req.json();
    const { storeId } = params;

    if (!userId) {
      // user not logged in
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!value) {
      return new NextResponse('Value is required', { status: 400 });
    }

    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    });

    if (!storeByUserId) {
      // Check if the storeid and the userid match
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const size = await prismadb.size.create({ data: { name, value, storeId } });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZES_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(req: Request, { params }: POSTParams) {
  try {
    const { storeId } = params;

    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const sizes = await prismadb.size.findMany({ where: { storeId } });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log('[SIZES_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
