import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { revalidatePath } from 'next/cache';
import { isAdmin, isAuthenticted } from '../../../../lib/session';

export async function POST(request: NextRequest) {
  const isLogin: boolean = await isAuthenticted();
  const hasPermission: boolean = await isAdmin();

  if (!isLogin)
    return NextResponse.json({
      success: false,
      message: 'authentication failed',
      status: 401,
    });

  if (!hasPermission)
    return NextResponse.json({
      success: false,
      message: 'authorization failed',
      status: 403,
    });

  const res = await request.json();

  const new_category = await prisma.category.create({
    data: res,
  });

  revalidatePath('/admin/categories');
  return NextResponse.json({ revalidated: true, now: Date.now() });
}

type Props = {
  categories: {
    id: number;
    name: string;
  }[];
};

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');

  const category = await prisma.category.findUnique({
    where: { id: Number(id) },
  });

  return NextResponse.json(category);
}
