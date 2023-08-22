import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

interface PatchParams {
  params: { sizeId: string; storeId: string };
}

export async function GET(req: Request, { params }: PatchParams) {
  try {
    const { sizeId } = params;

    if (!sizeId) {
      // Not store id on the url
      return new NextResponse('Size id is required', { status: 400 });
    }

    const size = await prismadb.size.findUnique({
      where: { id: sizeId }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: PatchParams) {
  try {
    const { userId } = auth();
    const { name, value } = await req.json();
    const { sizeId, storeId } = params;

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

    if (!sizeId) {
      return new NextResponse('Billboard id is required', { status: 400 });
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

    const size = await prismadb.size.updateMany({
      where: { id: sizeId },
      data: { name, value }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: PatchParams) {
  try {
    const { userId } = auth();
    const { storeId, sizeId } = params;

    if (!userId) {
      // user not logged in
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!sizeId) {
      // Not store id on the url
      return new NextResponse('Size id is required', { status: 400 });
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

    const size = await prismadb.size.deleteMany({
      where: { id: sizeId }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
