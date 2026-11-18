import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Corporate AI training for teams";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "For organisations", title: "Corporate AI training for teams.", line: "Custom learning paths and hands-on workshops. 5,000+ professionals trained." });
}
