const config = {
  mongodb_uri: process.env.MONGODB_URI!,
  jwt_secret: process.env.JWT_SECRET!,
  cloudflare_bucket_name: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
  cloudflare_r2_endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  cloudflare_r2_access_key: process.env.CLOUDFLARE_R2_ACCESS_KEY,
  cloudflare_r2_secret_key: process.env.CLOUDFLARE_R2_SECRET_KEY,
  cloudflare_r2_public_url: process.env.CLOUDFLARE_R2_PUBLIC_URL,
};

export default config;