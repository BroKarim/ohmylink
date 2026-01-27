import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function uploadToS3(file: Buffer, fileName: string, contentType: string): Promise<string> {
  const bucket = process.env.AWS_S3_BUCKET || "";
  const key = `uploads/${Date.now()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: file,
    ContentType: contentType,
  });

  await s3Client.send(command);

  return `https://${bucket}.s3.${process.env.AWS_REGION || "us-east-1"}.amazonaws.com/${key}`;
}

export async function uploadBase64ToS3(base64: string, fileName: string): Promise<string> {
  const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 string");
  }

  const contentType = matches[1];
  const data = matches[2];
  const buffer = Buffer.from(data, "base64");

  return uploadToS3(buffer, fileName, contentType);
}
