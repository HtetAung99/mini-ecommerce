import { NextRequest, NextResponse } from "next/server";

import { s3, Bucket } from "../../../../../lib/aws";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Readable } from "stream";
import { NextApiRequest, NextApiResponse } from "next";

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
    const file = req.body;
    console.log("====================================");
    console.log(file);
    console.log("====================================");
    const reader = file!.getReader();
    let chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      length += value.length;
    }
    //   const blob = new Blob(chunks, { type: "application/octet-stream" });
    //   const clientUrl = await createPresignedUrlWithClient({
    //     Bucket,
    //     key: file!.name || '',
    //   });
    //   const response = await chunkUpload(clientUrl, chunks);
    //   console.log("server post", response);
    //   return NextResponse.json({ signedUrl: response }, { status: 200 });
  } catch (error) {
    //   return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json("hold");
}

const createPresignedUrlWithClient = ({
  Bucket,
  key,
}: {
  Bucket: string;
  key: string;
}) => {
  const command = new PutObjectCommand({ Bucket, Key: key });
  return getSignedUrl(s3, command, { expiresIn: 3600 });
};

const chunkUpload = (url: string, data: any) => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Length": new Blob([data]).size.toString() },
      body: data,
    });

    let responseBody = "";
    const reader = new Readable();
    const readableStream = reader.read();

    readableStream.push(res.body);
    readableStream.on("data", (chunk: any) => {
      responseBody += chunk;
    });
    readableStream.on("end", () => {
      resolve(responseBody);
    });
  });
};
