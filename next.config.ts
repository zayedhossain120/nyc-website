import type { NextConfig } from "next";

const r2Host = process.env.CLOUDFLARE_R2_PUBLIC_URL?.replace(
  /^https?:\/\//,
  "",
).replace(/\/$/, "");

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [];

if (r2Host) {
  remotePatterns.push(
    { protocol: "http", hostname: r2Host },
    { protocol: "https", hostname: r2Host },
  );
}

// Legacy media host used by content written against the Pennom storage layer.
remotePatterns.push(
  { protocol: "http", hostname: "media.pennom.com" },
  { protocol: "https", hostname: "media.pennom.com" },
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
