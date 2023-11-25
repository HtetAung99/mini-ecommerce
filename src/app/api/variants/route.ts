import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { VariantWithProductAndAttributeValues } from "@/app/types";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  const variant: VariantWithProductAndAttributeValues | null =
    await prisma.variant.findUnique({
      where: { id: Number(id) },
      include: {
        product: true,
        attributeValues: {
          include: {
            attribute: true,
          },
        },
      },
    });

  return NextResponse.json(variant);
}
