import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import ProgramPage from "@/components/templates/ProgramPage";

export const metadata: Metadata = pageMeta({ title: "Advanced AI & Leadership Program", description: "A 12-week advanced AI program led by senior engineers and industry experts, for experienced professionals, technical leaders and C-suite executives.", path: "/programs/advanced-ai-leadership" });

export default function PremiumPage() {
  return <ProgramPage id="premium" />;
}
