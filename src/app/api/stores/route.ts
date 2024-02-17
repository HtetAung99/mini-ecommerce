import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const stores = await prisma.store.findMany({});
    return NextResponse.json(stores, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
