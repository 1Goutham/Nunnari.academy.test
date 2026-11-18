import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Nunnari Academy: AI courses in English and Tamil";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Nunnari Academy · School of AI", title: "Your School of AI for the Skills of Tomorrow.", line: "Practical, hands-on AI programs in English and Tamil." });
}
