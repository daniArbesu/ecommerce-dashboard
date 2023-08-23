import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

interface PatchParams {
  params: { productId: string; storeId: string };
}

export async function GET(req: Request, { params }: PatchParams) {
  try {
    const { productId } = params;

    if (!productId) {
      // Not store id on the url
      return new NextResponse('Product id is required', { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: { id: productId },
      include: { images: true, category: true, size: true, color: true }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: PatchParams) {
  try {
    const { userId } = auth();
    const { name, price, categoryId, colorId, sizeId, images, isFeatured, isArchived } =
      await req.json();
    const { productId, storeId } = params;

    if (!userId) {
      // user not logged in
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (!images || !images.length) {
      return new NextResponse('Images are required', { status: 400 });
    }

    if (!price) {
      return new NextResponse('Price is required', { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse('Category Id is required', { status: 400 });
    }

    if (!colorId) {
      return new NextResponse('Color Id is required', { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse('Size Id is required', { status: 400 });
    }

    if (!productId) {
      return new NextResponse('Product id is required', { status: 400 });
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

    await prismadb.product.update({
      where: { id: productId },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived,
        storeId,
        images: { deleteMany: {} }
      }
    });

    const product = await prismadb.product.update({
      where: {
        id: productId
      },
      data: { images: { createMany: { data: [...images.map((image: { url: string }) => image)] } } }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: PatchParams) {
  try {
    const { userId } = auth();
    const { storeId, productId } = params;

    if (!userId) {
      // user not logged in
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!productId) {
      // Not store id on the url
      return new NextResponse('Product id is required', { status: 400 });
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

    const product = await prismadb.product.deleteMany({
      where: { id: productId }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
