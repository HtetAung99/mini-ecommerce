import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { VariantWithProductAndAttributeValues } from "@/app/types";
import { isAdmin } from "../../../../lib/session";

export async function GET(request: NextRequest) {
  try {
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
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  const isAuthorized = await isAdmin();

  if (!isAuthorized) {
    return NextResponse.json({ message: "authFailed" }, { status: 403 });
  }

  try {
    await prisma.variant.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
