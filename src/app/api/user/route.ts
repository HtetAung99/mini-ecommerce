import { NextRequest, NextResponse } from "next/server";
import { isAdmin, isAuthenticted, isSuperAdmin } from "../../../../lib/session";
import prisma from "../../../../lib/prisma";
import { Role } from "@prisma/client";
import { log } from "console";

export async function POST(request: NextRequest) {
  const isLogin: boolean = await isAuthenticted();
  const hasPermission: boolean = (await isAdmin()) || (await isSuperAdmin());

  if (!isLogin)
    return NextResponse.json({
      status: 401,
      body: {
        success: false,
        message: "authentication failed",
      },
    });

  if (!hasPermission)
    return NextResponse.json({
      status: 403,
      body: {
        success: false,
        message: "authorization failed",
      },
    });

  const data: any = await request.json();
  const email: string = data.email;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    const new_user = await prisma.user.update({
      where: { id: user.id },
      data: { role: Role.ADMIN },
    });
    return NextResponse.json({
      success: true,
      message: "user's role updated",
      status: 200,
    });
  }

  return NextResponse.json({
    success: false,
    message: "provided user not found!",
    status: 400,
  });
}
