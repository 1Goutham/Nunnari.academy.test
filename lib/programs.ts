import type { IconName } from "@/components/Icon";
import type { QA } from "@/components/ui/Accordion";
import { toolIcons } from "./toolIcons";

export type ProgramKey = "recorded" | "regular" | "premium";

type Program = {
  key: ProgramKey;
  slug: string;             // URL: /programs/<slug>
  num: string;
  name: string;
  short: string;            // audience line (tabs, menus)
  title: [string, string];  // two lines: [plain, gradient]
  lead: string;
  art: string;
  facts: { icon: IconName; title: string; sub: string }[];
  forWho: { icon: IconName; title: string; text: string }[];
  outcomes: { icon: IconName; title: string; text: string }[];
  faqCats: { key: string; label: string }[];
  faq: QA[];
  packages: string[];       // libraries (keys of lib/toolIcons)
  tools: string[];          // platforms and models (keys of lib/toolIcons)
  skills: { core: [string, string]; chips: string[]; lead: string };
};

/* ---------- FAQ: the same three sections and the same questions on every programme ---------- */
const FAQ_CATS = [{ key: "program", label: "Program" }, { key: "eligibility", label: "Eligibility" }, { key: "certificate", label: "Certificate" }];

const faqFacts: Record<ProgramKey, { name: string; weeks: number; what: string; who: string; prior: string; mode: string }> = {
  recorded: { name: "GenAI Essentials", weeks: 4, what: "GenAI Essentials is a 4-week, self-paced online AI program from Nunnari Academy for school and college students who are new to AI. Through recorded sessions in English and Tamil, learners build AI fundamentals, complete hands-on projects and finish with a portfolio.", who: "School and college students who are new to AI.", prior: "No. It is built for learners who are completely new to AI.", mode: "Online, as recorded sessions you can follow at your own pace." },
  regular: { name: "AI Engineering", weeks: 4, what: "AI Engineering is a 4-week, instructor-led Generative AI and Agentic AI program from Nunnari Academy for beginners, aspiring professionals and career switchers. Learners practise with industry tools and build real-world projects and a portfolio, online or offline.", who: "Beginners, aspiring professionals and career switchers who want practical, industry-relevant skills in Generative AI and Agentic AI.", prior: "No. It starts with a strong foundation in AI before moving on to building with it.", mode: "Both online and offline. Talk to our team to find the batch that suits you." },
  premium: { name: "Advanced GenAI & Leadership", weeks: 8, what: "Advanced GenAI & Leadership is an 8-week Nunnari Academy program for experienced professionals, technical leaders and C-suite executives. It is led by senior engineers, technology leaders and industry experts, with live sessions online or offline.", who: "Experienced professionals, technical leaders and C-suite executives.", prior: "Yes. It is built for experienced professionals and technical leaders, with sessions led by senior engineers, technology leaders and industry experts.", mode: "Both online and offline. Talk to our team to find the batch that suits you." },
};

const toolNames = (keys: string[]) => keys.map((k) => toolIcons[k]?.title ?? k).join(", ");

function faqFor(key: ProgramKey): QA[] {
  const f = faqFacts[key];
  return [
    { q: `What is ${f.name}?`, cats: ["program"], a: f.what },
    { q: "How long is the program?", cats: ["program"], a: `${f.weeks} weeks.` },
    { q: "Is it online or offline?", cats: ["program"], a: f.mode },
    { q: "Which packages and tools will I use?", cats: ["program"], a: `Packages: ${toolNames(stack[key].packages)}. Tools: ${toolNames(stack[key].tools)}.` },
    { q: "Do I get access to the learning platform?", cats: ["program"], a: "Yes, one year of access to our LMS with all course resources and updates." },
    { q: `Who is ${f.name} for?`, cats: ["eligibility"], a: f.who },
    { q: "Do I need prior experience in AI?", cats: ["eligibility"], a: f.prior },
    { q: "How do I enroll?", cats: ["eligibility"], a: "Click Enroll Now or talk to our team. We reach out within 24 to 48 hours." },
    { q: "Will I get a certificate?", cats: ["certificate"], a: "Yes. You receive a completion certificate from the Nunnari Academy team when you finish the program." },
  ];
}

const stack: Record<ProgramKey, { packages: string[]; tools: string[] }> = {
  recorded: { packages: ["numpy", "pandas", "scikitlearn", "plotly"], tools: ["python", "jupyter", "googlecolab", "streamlit", "claude", "googlegemini"] },
  regular: { packages: ["langchain", "langgraph", "crewai", "huggingface", "pandas", "numpy"], tools: ["python", "ollama", "claude", "googlegemini", "n8n", "fastapi", "docker", "github"] },
  premium: { packages: ["pytorch", "huggingface", "langgraph", "crewai", "keras", "opencv"], tools: ["python", "claude", "mistralai", "ollama", "gradio", "docker", "github"] },
};

export const roles = ["AI Engineer", "Machine Learning Engineer", "ML Scientist", "Generative AI Engineer", "MLOps Engineer", "Applied AI Engineer"];

/** All programme content in one place. Every programme page renders from this. */
export const programs: Record<ProgramKey, Program> = {
  recorded: {
    key: "recorded",
    slug: "genai-essentials",
    num: "01",
    name: "GenAI Essentials",
    short: "School & college students",
    title: ["Build your understanding of AI,", "one step at a time."],
    lead: "Self-paced AI for school and college students, from core ideas to practical uses.",
    art: "recorded",
    facts: [
      { icon: "user", title: "School & college students", sub: "" },
      { icon: "clock", title: "4 Weeks", sub: "Self-paced" },
      { icon: "monitor", title: "Online", sub: "Recorded sessions" },
    ],
    forWho: [
      { icon: "book", title: "School students", text: "Affordable, self-paced sessions that make AI clear for learners who are completely new to it." },
      { icon: "cap", title: "College students", text: "Build foundational AI skills and real projects alongside your studies, at a pace that suits you." },
    ],
    outcomes: [
      { icon: "book", title: "Fundamentals", text: "Understand AI and technology fundamentals, explained clearly in English and Tamil." },
      { icon: "code", title: "Hands-on projects", text: "Apply what you learn through real-world applications and guided exercises." },
      { icon: "folder", title: "A portfolio", text: "Finish with projects you can show, built step by step with guided exercises." },
    ],
    faqCats: FAQ_CATS,
    faq: faqFor("recorded"),
    packages: stack.recorded.packages,
    tools: stack.recorded.tools,
    skills: { core: ["4 Weeks", "GenAI Essentials"], chips: ["Fundamentals", "Hands-on projects", "A portfolio", "School & college students", "Online", "English & Tamil"], lead: "Build foundational AI skills and real projects alongside your studies, at a pace that suits you." },
  },
  regular: {
    key: "regular",
    slug: "ai-engineering",
    num: "02",
    name: "AI Engineering",
    short: "Beginners & career switchers",
    title: ["Move beyond AI fundamentals.", "Learn to build with AI."],
    lead: "Instructor-led Generative and Agentic AI for beginners and career switchers.",
    art: "regular",
    facts: [
      { icon: "user", title: "Beginners & career switchers", sub: "" },
      { icon: "clock", title: "4 Weeks", sub: "Instructor-led" },
      { icon: "monitor", title: "Online / Offline", sub: "Live + hands-on" },
    ],
    forWho: [
      { icon: "cap", title: "Beginners", text: "Start from the basics and build real GenAI and agentic AI projects, with guided support at every step." },
      { icon: "briefcase", title: "Career switchers", text: "Move into GenAI and Agentic AI roles with hands-on projects and a portfolio that shows your skills." },
    ],
    outcomes: [
      { icon: "book", title: "Learn", text: "Build a strong foundation in GenAI and Agentic AI with clear, structured sessions." },
      { icon: "code", title: "Practice", text: "Apply every concept through hands-on exercises with industry tools." },
      { icon: "layers", title: "Build", text: "Create real-world projects and a portfolio that shows your skills." },
      { icon: "rocket", title: "Impact", text: "Gain industry readiness and access to career opportunities." },
    ],
    faqCats: FAQ_CATS,
    faq: faqFor("regular"),
    packages: stack.regular.packages,
    tools: stack.regular.tools,
    skills: { core: ["4 Weeks", "AI Engineering"], chips: roles, lead: "Gain in-demand skills, build a portfolio, and get guidance to start your journey in GenAI and Agentic AI." },
  },
  premium: {
    key: "premium",
    slug: "advanced-genai-leadership",
    num: "03",
    name: "Advanced GenAI & Leadership",
    short: "Experienced professionals & C-Suite",
    title: ["Lead the next wave", "of AI innovation."],
    lead: "Led by senior engineers and experts, for experienced professionals and the C-suite.",
    art: "premium",
    facts: [
      { icon: "user", title: "Experienced professionals", sub: "" },
      { icon: "clock", title: "8 Weeks", sub: "Expert-led" },
      { icon: "monitor", title: "Online / Offline", sub: "Live sessions" },
    ],
    forWho: [
      { icon: "trend", title: "Experienced professionals", text: "Go beyond the basics with senior engineers and industry experts, in a program built for experienced professionals." },
      { icon: "briefcase", title: "C-Suite & leadership", text: "Learn from board-level leaders, in a program designed for technical leaders and C-suite executives." },
    ],
    outcomes: [
      { icon: "award", title: "Expert-led", text: "Sessions are led by industry experts, so you learn from people working in AI." },
      { icon: "crown", title: "Leadership view", text: "Learn alongside board-level leaders in a program built for the C-Suite." },
      { icon: "clock", title: "8 weeks", text: "A structured 8-week program designed for experienced professionals and technical leaders." },
    ],
    faqCats: FAQ_CATS,
    faq: faqFor("premium"),
    packages: stack.premium.packages,
    tools: stack.premium.tools,
    skills: { core: ["8 Weeks", "Advanced GenAI & Leadership"], chips: ["Expert-led", "Leadership view", "C-Suite", "Online / Offline", "Industry experts", "Board-level leaders"], lead: "Go beyond the basics with industry experts and board-level leaders, in a program built for experienced professionals." },
  },
};
export const programList = [programs.recorded, programs.regular, programs.premium];

/** The public URL of a program page. */
export const programPath = (key: ProgramKey) => `/programs/${programs[key].slug}`;

/** One title size for every program: the longest title line sets it (bold line counted a little wider). */
export const TITLE_CH = Math.max(...programList.map((p) => Math.max(p.title[0].length, p.title[1].length * 1.12)));

/** Regular programme extras */


/** AI Engineering programme tracks (from the previous nunnari.academy course library). */
export const tracks: { title: string; tag: string; icon: IconName; desc: string }[] = [
  { title: "Generative & Agentic AI", tag: "AI", icon: "cpu", desc: "Build AI systems that generate content, reason through problems and act autonomously." },
  { title: "Machine Learning & Deep Learning", tag: "ML/DL", icon: "layers", desc: "Learn how models are built to analyse data, recognise patterns and make predictions." },
  { title: "Full Stack Development with AI", tag: "Development", icon: "code", desc: "Develop scalable web applications enhanced with AI for smarter user experiences." },
  { title: "Data Science with AI", tag: "Data", icon: "chart", desc: "Turn raw data into meaningful insights using data science techniques powered by AI." },
  { title: "Data Analytics with AI", tag: "Data", icon: "trend", desc: "Analyse and visualise data to uncover trends and support faster business decisions." },
  { title: "Business Analytics with AI", tag: "Business", icon: "briefcase", desc: "Use data and AI-driven insights to guide strategic decisions and improve outcomes." },
  { title: "Digital Marketing with AI", tag: "Marketing", icon: "rocket", desc: "Use AI to create, optimise and scale campaigns with better targeting and results." },
];

/**
 * Programme brochures (PDF). Put the file in public/brochures/ and set its path here.
 * While a path is empty, "Download Brochure" opens the enquiry form so the team can send it.
 */
export const brochures: Record<ProgramKey, string> = { recorded: "", regular: "", premium: "" };
