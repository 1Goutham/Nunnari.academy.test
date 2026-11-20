import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import ProgramPage from "@/components/templates/ProgramPage";

export const metadata: Metadata = pageMeta({ title: "GenAI Course for School & College Students", description: "GenAI Essentials is a 4-week, self-paced online AI course for school and college students, taught in English and Tamil, with hands-on projects.", path: "/programs/genai-essentials" });

export default function RecordedPage() {
  return <ProgramPage id="recorded" />;
}
