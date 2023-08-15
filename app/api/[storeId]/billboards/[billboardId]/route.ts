import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

interface PatchParams {
  params: { billboardId: string; storeId: string };
}

export async function GET(req: Request, { params }: PatchParams) {
  try {
    const { billboardId } = params;

    if (!billboardId) {
      // Not store id on the url
      return new NextResponse('Billboard id is required', { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: { id: billboardId }
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: PatchParams) {
  try {
    const { userId } = auth();
    const { label, imageUrl } = await req.json();
    const { billboardId, storeId } = params;

    if (!userId) {
      // user not logged in
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!label) {
      return new NextResponse('Label is required', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('Image URL is required', { status: 400 });
    }

    if (!billboardId) {
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

    const billboard = await prismadb.billboard.updateMany({
      where: { id: billboardId },
      data: { label, imageUrl }
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: PatchParams) {
  try {
    const { userId } = auth();
    const { storeId, billboardId } = params;

    if (!userId) {
      // user not logged in
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!billboardId) {
      // Not store id on the url
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

    const billboard = await prismadb.billboard.deleteMany({
      where: { id: billboardId }
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
