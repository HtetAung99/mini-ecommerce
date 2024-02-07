import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { isAdmin, isAuthenticted } from "../../../../lib/session";
import { defaultVariantData } from "../../../../prisma/dataPopulation/product_seeding";
import { io } from "socket.io-client";

const socket = new (io as any)("http://localhost:4000");

export async function POST(request: NextRequest) {
  const res = await request.json();

  const isLogin: boolean = await isAuthenticted();
  const hasPermission: boolean = await isAdmin();

  if (!isLogin)
    return NextResponse.json({
      success: false,
      message: "authentication failed",
      status: 401,
    });

  if (!hasPermission)
    return NextResponse.json({
      success: false,
      message: "authorization failed",
      status: 403,
    });

  try {
    const new_product = await prisma.product.create({
      data: { ...res, variants: defaultVariantData },
    });
  } catch (e) {
    console.error(e);
  }

  revalidatePath("/admin/products");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");

  if (!q) {
    return NextResponse.json({
      products: [],
    });
  }

  const products = await prisma.product.findMany({
    where: { title: { contains: q, mode: "insensitive" } },
    select: { id: true, title: true },
    take: 5,
  });

  return NextResponse.json({
    products,
  });
}

export async function PUT(request: NextRequest) {
  const res = await request.json();
  try {
    const updated_product = await prisma.product.update({
      where: { id: res.id },
      data: res,
    });

    socket.emit("admin", updated_product, () => {
      console.log("admin event emitted socket is now disconnected");
      socket.disconnect();
    });
  } catch (e) {
    console.error(e);
  }

  revalidatePath("/");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
