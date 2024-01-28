import AWS from "aws-sdk";

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const bucketParams = { Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME, Key: "" };

export { bucketParams, s3 };
