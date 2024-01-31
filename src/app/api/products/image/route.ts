import { NextRequest, NextResponse } from "next/server";

import { s3, bucketParams } from "../../../../../lib/aws";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import {
  getSignedUrl,
  S3RequestPresigner,
} from "@aws-sdk/s3-request-presigner";

export async function POST(req: NextRequest, res: any) {
  const { imgUrl }: { imgUrl: string } = await req.json();
  bucketParams.Key = imgUrl;
  console.log("imageURL", bucketParams.Key);
  try {
    const command = new GetObjectCommand(bucketParams);

    const url = await getSignedUrl(s3, command);
    console.log("RealURL", url);

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving object:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
