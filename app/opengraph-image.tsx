import { ImageResponse } from "next/og";
import { BUSINESS } from "@/lib/seo/business";

export const alt = "Vertex & Co. — NYC Software Development, AI Automation & Growth Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ width: "44px", height: "8px", borderRadius: "4px", background: "#5B8CFF" }} />
          <div style={{ width: "44px", height: "8px", borderRadius: "4px", background: "#D4FF3F" }} />
          <div style={{ width: "44px", height: "8px", borderRadius: "4px", background: "#FF6A3D" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 600, color: "#F5F5F2" }}>
            Vertex<span style={{ color: "#D4FF3F" }}>&amp;</span>Co.
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#A7A9B4", maxWidth: "900px" }}>
            {BUSINESS.tagline}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#6C6E78", letterSpacing: "0.05em" }}>
          NEW YORK CITY · SOFTWARE · AI AUTOMATION · GROWTH
        </div>
      </div>
    ),
    { ...size },
  );
}
