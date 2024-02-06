import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { isAdmin, isAuthenticted } from "../../../../lib/session";
import { defaultVariantData } from "../../../../prisma/dataPopulation/product_seeding";
import { NextApiResponseServerIo } from "@/app/types";

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

export async function PUT(
  request: NextRequest,
  response: NextApiResponseServerIo,
) {
  // const res = await request.json();
  response.socket.server?.io?.emit("message", "lee pl pop");
  return NextResponse.json({ msg: "done" }, { status: 200 });

  // try {
  //   const updated_product = await prisma.product.update({
  //     where: { id: res.id },
  //     data: res,
  //   });
  // } catch (e) {
  //   console.error(e);
  // } finally {
  //   // io.emit("product-updated");
  //   response.socket.server.io.emit("product-updated", "product-updated");
  //   console.log("product-updated message sent");
  // }

  // revalidatePath("/");
  // return NextResponse.json({ revalidated: true, now: Date.now() });
}
