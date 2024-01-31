import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
const s3 = new S3Client({ region: "us-west-1" });

const Bucket = process.env.NEXT_PUBLIC_BUCKET_NAME as string;

export { Bucket, s3 };
