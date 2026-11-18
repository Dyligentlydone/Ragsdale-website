import { S3Client } from "@aws-sdk/client-s3"

const accountId = process.env.R2_ACCOUNT_ID
const accessKeyId = process.env.R2_ACCESS_KEY_ID
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY

export const R2_BUCKET = process.env.R2_BUCKET_NAME

export function r2Configured() {
  return Boolean(accountId && accessKeyId && secretAccessKey && R2_BUCKET)
}

let client: S3Client | undefined

export function getR2Client() {
  if (!r2Configured()) {
    throw new Error("R2 storage is not configured")
  }
  client ??= new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: accessKeyId!, secretAccessKey: secretAccessKey! },
  })
  return client
}
