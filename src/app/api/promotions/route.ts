import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("promotionId");
  const promotion = await prisma.promotion.findUnique({
    where: { id: Number(id) },
  });

  return NextResponse.json(promotion);
}
