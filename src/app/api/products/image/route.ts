import { NextRequest, NextResponse } from "next/server";

import { s3, Bucket } from "../../../../../lib/aws";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function POST(req: NextRequest, res: any) {
  const { imgUrl }: { imgUrl: string } = await req.json();
  try {
    const command = new GetObjectCommand({
      Bucket: Bucket,
      Key: imgUrl,
    });

    const url = await getSignedUrl(s3, command);

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving object:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
