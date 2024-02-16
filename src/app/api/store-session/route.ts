import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest, res: NextResponse) {
  const { defaultStore } = await req.json();
  const cookieStore = cookies();
  cookieStore.set("defaultStore", JSON.stringify(defaultStore));
  return NextResponse.json({ defaultStore }, { status: 200 });
}
