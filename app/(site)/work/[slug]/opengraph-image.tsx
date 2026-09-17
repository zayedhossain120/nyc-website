import { ImageResponse } from "next/og";
import { CASE_STUDIES } from "@/lib/data/case-studies";

export const alt = "Vertex & Co. Case Study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((item) => item.slug === slug);

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
        <div style={{ display: "flex", fontSize: 28, color: "#5B8CFF", letterSpacing: "0.05em" }}>
          {(study?.industry ?? "CASE STUDY").toUpperCase()}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 600, color: "#F5F5F2" }}>
            {study?.client ?? "Vertex & Co. Case Study"}
          </div>
          {study?.metric && (
            <div
              style={{
                display: "flex",
                fontSize: 32,
                color: "#D4FF3F",
                border: "2px solid rgba(212,255,63,0.4)",
                borderRadius: "999px",
                padding: "10px 28px",
                width: "fit-content",
              }}
            >
              {study.metric}
            </div>
          )}
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#A7A9B4" }}>
          Vertex<span style={{ color: "#D4FF3F" }}>&amp;</span>Co.
        </div>
      </div>
    ),
    { ...size },
  );
}
