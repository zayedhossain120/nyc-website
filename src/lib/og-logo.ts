import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Wordmark as a data URI, for use inside next/og ImageResponse. */
export async function getLogoDataUri(): Promise<string> {
  const file = await readFile(join(process.cwd(), "public", "logo", "logo-wordmark.png"));
  return `data:image/png;base64,${file.toString("base64")}`;
}

/** Wordmark aspect ratio (width / height), so OG layouts can size it precisely. */
export const LOGO_ASPECT_RATIO = 1200 / 205;
