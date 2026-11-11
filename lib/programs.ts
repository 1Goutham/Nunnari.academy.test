import type { IconName } from "@/components/Icon";
import type { QA } from "@/components/ui/Accordion";
import { toolIcons } from "./toolIcons";

export type ProgramKey = "recorded" | "regular" | "premium";

type Program = {
  key: ProgramKey;
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
const FAQ_CATS = [{ key: "program", label: "Programme" }, { key: "eligibility", label: "Eligibility" }, { key: "certificate", label: "Certificate" }];

const faqFacts: Record<ProgramKey, { name: string; who: string; prior: string; mode: string }> = {
  recorded: { name: "Self-paced Programme", who: "K12 and college students who are new to AI.", prior: "No. It is built for learners who are completely new to AI.", mode: "Online, as recorded lessons you can follow at your own pace." },
  regular: { name: "Regular Programme", who: "Beginners and career switchers (L1 & L2) who want real GenAI and Agentic AI skills and practical projects.", prior: "No. It is built for beginners and career switchers and starts with a strong foundation before moving to projects.", mode: "Both online and offline. Talk to our team to find the batch that suits you." },
  premium: { name: "Premium Programme", who: "Advanced learners (L3+) and the C-Suite.", prior: "Yes. It is built for advanced learners (L3+) and leadership teams, with sessions led by industry experts and board-level leaders.", mode: "Both online and offline. Talk to our team to find the batch that suits you." },
};

const toolNames = (keys: string[]) => keys.map((k) => toolIcons[k]?.title ?? k).join(", ");

function faqFor(key: ProgramKey): QA[] {
  const f = faqFacts[key];
  return [
    { q: "How long is the programme?", cats: ["program"], a: "12 weeks." },
    { q: "Is it online or offline?", cats: ["program"], a: f.mode },
    { q: "Which packages and tools will I use?", cats: ["program"], a: `Packages: ${toolNames(stack[key].packages)}. Tools: ${toolNames(stack[key].tools)}.` },
    { q: "Do I get access to the learning platform?", cats: ["program"], a: "Yes, one year of access to our LMS with all course resources and updates." },
    { q: `Who is the ${f.name} for?`, cats: ["eligibility"], a: f.who },
    { q: "Do I need prior experience in AI?", cats: ["eligibility"], a: f.prior },
    { q: "How do I enroll?", cats: ["eligibility"], a: "Click Enroll Now or talk to our team. We reach out within 24 to 48 hours." },
    { q: "Will I get a certificate?", cats: ["certificate"], a: "Yes. You receive a completion certificate from the Nunnari Academy team when you finish the programme." },
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
    num: "01",
    name: "Self-paced Programme",
    short: "K12 & college students",
    title: ["Learn AI at your", "own pace."],
    lead: "Affordable, flexible, self-paced AI learning for K12 and college students who are new to AI.",
    art: "recorded",
    facts: [
      { icon: "user", title: "K12 & college students", sub: "New to AI" },
      { icon: "clock", title: "12 Weeks", sub: "Self-paced" },
      { icon: "monitor", title: "Online", sub: "Recorded lessons" },
    ],
    forWho: [
      { icon: "book", title: "K12 students", text: "Affordable, self-paced lessons that make AI clear for learners who are completely new to it." },
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
    skills: { core: ["12 Weeks", "Self-paced"], chips: ["Fundamentals", "Hands-on projects", "A portfolio", "K12 & college students", "Online", "English & Tamil"], lead: "Build foundational AI skills and real projects alongside your studies, at a pace that suits you." },
  },
  regular: {
    key: "regular",
    num: "02",
    name: "Regular Programme",
    short: "Beginners & career switchers (L1 & L2)",
    title: ["Build a strong foundation", "in GenAI and Agentic AI."],
    lead: "A 12-week, hands-on programme in GenAI and Agentic AI for beginners and career switchers.",
    art: "regular",
    facts: [
      { icon: "user", title: "Beginners & career switchers", sub: "L1 & L2" },
      { icon: "clock", title: "12 Weeks", sub: "Guided learning" },
      { icon: "monitor", title: "Online / Offline", sub: "Live + hands-on" },
    ],
    forWho: [
      { icon: "cap", title: "Beginners", text: "Start from the basics and build real GenAI and agentic AI projects, with guided support at every step." },
      { icon: "briefcase", title: "Career switchers", text: "Move into GenAI and Agentic AI roles with hands-on projects and a portfolio that shows your skills." },
    ],
    outcomes: [
      { icon: "book", title: "Learn", text: "Build a strong foundation in GenAI and Agentic AI with clear, structured lessons." },
      { icon: "code", title: "Practice", text: "Apply every concept through hands-on exercises with industry tools." },
      { icon: "layers", title: "Build", text: "Create real-world projects and a portfolio that shows your skills." },
      { icon: "rocket", title: "Impact", text: "Gain industry readiness and access to career opportunities." },
    ],
    faqCats: FAQ_CATS,
    faq: faqFor("regular"),
    packages: stack.regular.packages,
    tools: stack.regular.tools,
    skills: { core: ["₹8.5 LPA", "Average salary"], chips: roles, lead: "Gain in-demand skills, build a portfolio, and get guidance to start your journey in GenAI and Agentic AI." },
  },
  premium: {
    key: "premium",
    num: "03",
    name: "Premium Programme",
    short: "Advanced (L3+) & C-Suite",
    title: ["Learn from", "industry leaders."],
    lead: "Led by industry experts and board-level leaders, for advanced learners (L3+) and the C-Suite.",
    art: "premium",
    facts: [
      { icon: "user", title: "Advanced & C-Suite", sub: "L3+ & leadership" },
      { icon: "clock", title: "12 Weeks", sub: "Expert-led" },
      { icon: "monitor", title: "Online / Offline", sub: "Live sessions" },
    ],
    forWho: [
      { icon: "trend", title: "Advanced learners (L3+)", text: "Go beyond the basics with industry experts, in a programme built for advanced learners." },
      { icon: "briefcase", title: "C-Suite & leadership", text: "Learn from board-level leaders, in a programme designed for leadership teams." },
    ],
    outcomes: [
      { icon: "award", title: "Expert-led", text: "Sessions are led by industry experts, so you learn from people working in AI." },
      { icon: "crown", title: "Leadership view", text: "Learn alongside board-level leaders in a programme built for the C-Suite." },
      { icon: "clock", title: "12 weeks", text: "A structured 12-week programme designed for advanced learners and leadership teams." },
    ],
    faqCats: FAQ_CATS,
    faq: faqFor("premium"),
    packages: stack.premium.packages,
    tools: stack.premium.tools,
    skills: { core: ["L3+", "Advanced"], chips: ["Expert-led", "Leadership view", "C-Suite", "12 weeks", "Industry experts", "Board-level leaders"], lead: "Go beyond the basics with industry experts and board-level leaders, in a programme built for advanced learners." },
  },
};
export const programList = [programs.recorded, programs.regular, programs.premium];

/** Regular programme extras */


/** 12-week Regular programme tracks (from the previous nunnari.academy course library). */
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
