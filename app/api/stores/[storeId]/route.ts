import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

interface PatchParams {
  params: { storeId: string };
}

export async function PATCH(req: Request, { params }: PatchParams) {
  try {
    const { userId } = auth();
    const { name } = await req.json();
    const { storeId } = params;

    if (!userId) {
      // user not logged in
      return new NextResponse('Unauthorized', { status: 401 });
    }
    if (!name) {
      // Not name field on the body
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!storeId) {
      // Not store id on the url
      return new NextResponse('Store id is required', { status: 400 });
    }

    const store = await prismadb.store.updateMany({
      where: { id: storeId, userId },
      data: { name }
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: PatchParams) {
  try {
    const { userId } = auth();
    const { storeId } = params;

    if (!userId) {
      // user not logged in
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!storeId) {
      // Not store id on the url
      return new NextResponse('Store id is required', { status: 400 });
    }

    const store = await prismadb.store.deleteMany({
      where: { id: storeId, userId }
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
