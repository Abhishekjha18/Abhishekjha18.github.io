import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Abhishek Jha — AI/ML researcher. Verify. Remember. Compress.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f1ea",
          color: "#15130f",
          padding: "64px 72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#625c51", fontFamily: "monospace" }}>
          <div style={{ width: 14, height: 14, borderRadius: 14, background: "#5b2bd6" }} />
          Abhishek Jha · AI/ML research · IIIT Delhi
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 150, lineHeight: 0.98, letterSpacing: -4 }}>
          <div>Verify. Remember.</div>
          <div style={{ color: "#5b2bd6", fontStyle: "italic" }}>Compress.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#625c51", fontFamily: "monospace" }}>
          <div>4 papers in 2026 · AIR 2 &amp; AIR 3 · Amazon Applied Scientist (PPO)</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
