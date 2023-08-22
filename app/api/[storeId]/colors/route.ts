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

    const color = await prismadb.color.create({ data: { name, value, storeId } });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLORS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(req: Request, { params }: POSTParams) {
  try {
    const { storeId } = params;

    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const colors = await prismadb.color.findMany({ where: { storeId } });

    return NextResponse.json(colors);
  } catch (error) {
    console.log('[COLORS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
