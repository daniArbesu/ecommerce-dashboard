import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

interface PatchParams {
  params: { colorId: string; storeId: string };
}

export async function GET(req: Request, { params }: PatchParams) {
  try {
    const { colorId } = params;

    if (!colorId) {
      // Not store id on the url
      return new NextResponse('Color id is required', { status: 400 });
    }

    const color = await prismadb.color.findUnique({
      where: { id: colorId }
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: PatchParams) {
  try {
    const { userId } = auth();
    const { name, value } = await req.json();
    const { colorId, storeId } = params;

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

    if (!colorId) {
      return new NextResponse('Color id is required', { status: 400 });
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

    const color = await prismadb.color.updateMany({
      where: { id: colorId },
      data: { name, value }
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: PatchParams) {
  try {
    const { userId } = auth();
    const { storeId, colorId } = params;

    if (!userId) {
      // user not logged in
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!colorId) {
      // Not store id on the url
      return new NextResponse('Color id is required', { status: 400 });
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

    const color = await prismadb.color.deleteMany({
      where: { id: colorId }
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
