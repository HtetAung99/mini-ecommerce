import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
const s3 = new S3Client({ region: "us-west-1" });

const bucketParams = {
  Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME as string,
  Key: "",
};

export { bucketParams, s3 };
