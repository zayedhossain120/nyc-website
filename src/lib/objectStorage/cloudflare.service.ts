import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as path from "path";
import { lookup } from "mime-types";
import config from "@/config";

class CloudflareService {
  private client: S3Client | null = null;
  private readonly bucketName = config.cloudflare_bucket_name;
  private readonly publicBaseUrl = config.cloudflare_r2_public_url;

  private get s3(): S3Client {
    if (this.client) return this.client;

    if (
      !config.cloudflare_r2_endpoint ||
      !config.cloudflare_r2_access_key ||
      !config.cloudflare_r2_secret_key ||
      !config.cloudflare_r2_public_url
    ) {
      throw new Error("Please setup Cloudflare R2 credentials and public URL!");
    }

    this.client = new S3Client({
      endpoint: config.cloudflare_r2_endpoint,
      credentials: {
        accessKeyId: config.cloudflare_r2_access_key,
        secretAccessKey: config.cloudflare_r2_secret_key,
      },
      region: "auto",
    });

    return this.client;
  }

  async getUploadUrl(
    fileKey: string
  ): Promise<{ fileName: string; uploadUrl: string }> {
    const fileExt = path.extname(fileKey);
    const fileName =
      fileKey.replace(fileExt, "").toLowerCase().split(" ").join("-") +
      Date.now() +
      fileExt;
    const contentType = lookup(fileExt) || "application/octet-stream";

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 3600 });

    return {
      fileName,
      uploadUrl,
    };
  }

  getDownloadUrl(fileKey: string): string {
    return fileKey ? `${this.publicBaseUrl}/${fileKey}` : "";
  }

  async deleteFile(fileKey: string): Promise<void> {
    if (!fileKey) return;

    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
    });

    await this.s3.send(command);
  }
}

export const cloudflareService = new CloudflareService();