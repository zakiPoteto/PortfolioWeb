import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "zakiPoteto | Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const icon = await readFile(join(process.cwd(), "src/app/icon.png"));
  const iconSrc = `data:image/png;base64,${icon.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 160px 0 96px",
          background: "linear-gradient(135deg, #020617 0%, #1e1b4b 100%)",
          color: "#f1f5f9",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700 }}>zakiPoteto</div>
          <div style={{ fontSize: 40, marginTop: 24, color: "#94a3b8" }}>
            Portfolio
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={iconSrc}
          width={320}
          height={320}
          alt=""
          style={{ borderRadius: 160, border: "6px solid #6366f1" }}
        />
      </div>
    ),
    { ...size },
  );
}
