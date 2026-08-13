import { ImageResponse } from "next/og";
import { BLOG_POSTS } from "@/lib/data/blog-posts";

export const alt = "Vertex & Co. Insights";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#060607",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(91,140,255,0.25), transparent 45%), radial-gradient(circle at 85% 75%, rgba(212,255,63,0.14), transparent 45%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#D4FF3F", letterSpacing: "0.05em" }}>
          {post?.category.toUpperCase() ?? "INSIGHTS"}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 60,
            fontWeight: 600,
            color: "#F5F5F2",
            maxWidth: "1000px",
            lineHeight: 1.15,
          }}
        >
          {post?.title ?? "Vertex & Co. Insights"}
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#A7A9B4" }}>
          Vertex<span style={{ color: "#D4FF3F" }}>&amp;</span>Co. · {post?.author.name ?? "NYC Engineering Team"}
        </div>
      </div>
    ),
    { ...size },
  );
}
