import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { getCurrentUser, isAuthenticted } from "../../../../../lib/session";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest) {
  const isLogin: boolean = await isAuthenticted();

  if (!isLogin) redirect("/admin/categories/?message=authFailed");
  const formData: any = await request.json();

  const { userId, isDefault, ...data } = formData;
  try {
    const defaultAddress = await prisma.address.findFirst({
      where: { userId, default: true },
    });

    // if not, set this address as default
    if (!defaultAddress) {
      await prisma.address.create({
        data: { userId, ...data, default: true },
      });
    } else {
      if (isDefault) {
        await prisma.address.update({
          where: { id: defaultAddress.id },
          data: { default: false },
        });
      }
      await prisma.address.create({
        data: { userId, ...data, default: isDefault },
      });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ success: false, error: e });
  }
}
