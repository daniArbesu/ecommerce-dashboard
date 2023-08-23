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
    const { name, price, categoryId, colorId, sizeId, images, isFeatured, isArchived } =
      await req.json();
    const { storeId } = params;

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

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived,
        storeId,
        images: { createMany: { data: [...images.map((image: { url: string }) => image)] } }
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(req: Request, { params }: POSTParams) {
  try {
    const { storeId } = params;
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') ?? undefined;
    const colorId = searchParams.get('colorId') ?? undefined;
    const sizeId = searchParams.get('sizeId') ?? undefined;
    const isFeatured = searchParams.get('isFeatured');

    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
