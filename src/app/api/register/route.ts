import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { NextApiRequest } from "next";

export async function POST(request: NextRequest) {
  const res = await request.json();

  res.password = bcrypt.hashSync(res.password, 10);

  const new_user = await prisma.user.create({
    data: res,
  });

  return NextResponse.json({ now: Date.now() });
}
