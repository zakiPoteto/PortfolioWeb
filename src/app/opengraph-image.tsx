import { ImageResponse } from "next/og";

export const alt = "zakiPoteto | Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "linear-gradient(135deg, #020617 0%, #1e1b4b 100%)",
          color: "#f1f5f9",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700 }}>zakiPoteto</div>
        <div style={{ fontSize: 40, marginTop: 24, color: "#94a3b8" }}>
          Portfolio
        </div>
      </div>
    ),
    { ...size },
  );
}
