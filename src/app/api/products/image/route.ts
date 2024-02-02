import { NextRequest, NextResponse } from "next/server";
import { s3, Bucket } from "../../../../../lib/aws";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Readable } from "stream";

export async function GET(req: NextRequest, res: any) {
  const imgUrl: string | null = req.nextUrl.searchParams.get("imgUrl");
  try {
    const command = new GetObjectCommand({
      Bucket: Bucket,
      Key: imgUrl!,
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

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const params = {
      Bucket,
      Key: file.name,
      Body: buffer,
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);

    const getCommand = new GetObjectCommand({
      Bucket: Bucket,
      Key: file.name,
    });

    const url = await getSignedUrl(s3, getCommand);

    return NextResponse.json({ signedUrl: url }, { status: 200 });
  } catch (error) {}
  return NextResponse.json("hold");
}
