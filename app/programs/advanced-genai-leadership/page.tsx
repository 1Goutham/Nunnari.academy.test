import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import ProgramPage from "@/components/templates/ProgramPage";

export const metadata: Metadata = pageMeta({ title: "Advanced GenAI & Leadership Program", description: "An 8-week advanced GenAI program led by senior engineers and industry experts, for experienced professionals, technical leaders and C-suite executives.", path: "/programs/advanced-genai-leadership" });

export default function PremiumPage() {
  return <ProgramPage id="premium" />;
}
