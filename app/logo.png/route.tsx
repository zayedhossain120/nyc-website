import { ImageResponse } from "next/og";

export const contentType = "image/png";
export const size = { width: 512, height: 512 };

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#060607",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 120, fontWeight: 600, color: "#F5F5F2" }}>
          V<span style={{ color: "#D4FF3F" }}>&amp;</span>Co.
        </div>
      </div>
    ),
    { ...size },
  );
}
