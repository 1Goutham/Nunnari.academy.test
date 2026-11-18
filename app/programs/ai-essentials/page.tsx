import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import ProgramPage from "@/components/templates/ProgramPage";

export const metadata: Metadata = pageMeta({ title: "AI Course for School & College Students", description: "AI Essentials is a 12-week, self-paced online AI course for school and college students, taught in English and Tamil, with hands-on projects.", path: "/programs/ai-essentials" });

export default function RecordedPage() {
  return <ProgramPage id="recorded" />;
}
