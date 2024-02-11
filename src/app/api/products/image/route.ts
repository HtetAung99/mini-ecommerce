import { NextRequest, NextResponse } from "next/server";
import { s3, Bucket } from "../../../../../lib/aws";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

export async function POST(req: NextRequest, response: NextResponse) {
  const data = await req.formData();
  const file: any = data.get("file");
  console.log(file);

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  try {
    const params = {
      Bucket,
      Key: file.name,
      Body: buffer,
    };

    const command = new PutObjectCommand(params);
    const res = await s3.send(command);

    console.log(`${file} uploaded to S3. URL: ${JSON.stringify(res)}`);
  } catch (err) {
    console.error(`Error uploading ${file} to S3:`, err);
    return NextResponse.json(
      { error: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "File is completely uploaded to aws." },
    { status: 200 },
  );
}
