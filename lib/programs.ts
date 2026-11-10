import type { IconName } from "@/components/Icon";
import type { QA } from "@/components/ui/Accordion";

export type ProgramKey = "recorded" | "regular" | "premium";

type Program = {
  key: ProgramKey;
  num: string;
  name: string;
  short: string;            // audience line (tabs, menus)
  title: [string, string];  // [plain, gradient]
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

export const roles = ["AI Engineer", "Machine Learning Engineer", "ML Scientist", "Generative AI Engineer", "MLOps Engineer", "Applied AI Engineer"];

/** All programme content in one place. Every programme page renders from this. */
export const programs: Record<ProgramKey, Program> = {
  recorded: {
    key: "recorded",
    num: "01",
    name: "Recorded Programme",
    short: "K12 & college students",
    title: ["Learn AI at your", "own pace."],
    lead: "Affordable, flexible, self-paced AI learning for K12 and college students who are new to AI.",
    art: "recorded",
    facts: [
      { icon: "user", title: "K12 & college", sub: "New to AI" },
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
    faqCats: [{ key: "program", label: "Programme" }, { key: "access", label: "Access" }],
    faq: [
      { q: "Who is the Recorded Programme for?", cats: ["program"], a: "K12 and college students who are new to AI." },
      { q: "How long is it?", cats: ["program"], a: "12 weeks, delivered as recorded lessons so you can learn at your own pace." },
      { q: "What will I have at the end?", cats: ["program"], a: "Foundational AI skills, real projects, and a portfolio built with guided exercises." },
      { q: "How do I access the lessons?", cats: ["access"], a: "Online, through our learning platform." },
    ],
    packages: ["numpy", "pandas", "scikitlearn", "plotly"],
    tools: ["python", "jupyter", "googlecolab", "streamlit", "claude", "googlegemini"],
    skills: { core: ["12 Weeks", "Self-paced"], chips: ["Fundamentals", "Hands-on projects", "A portfolio", "K12 & college", "Online", "English & Tamil"], lead: "Build foundational AI skills and real projects alongside your studies, at a pace that suits you." },
  },
  regular: {
    key: "regular",
    num: "02",
    name: "Regular Programme",
    short: "Beginners & career switchers (L1 & L2)",
    title: ["Build a strong foundation in", "GenAI and Agentic AI."],
    lead: "A 12-week, hands-on programme in GenAI and Agentic AI for beginners and career switchers.",
    art: "regular",
    facts: [
      { icon: "user", title: "Beginners & career switchers", sub: "L1 & L2" },
      { icon: "clock", title: "12 Weeks", sub: "Guided learning" },
      { icon: "laptop", title: "Live + hands-on", sub: "Online / Offline" },
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
    faqCats: [{ key: "program", label: "Programme" }, { key: "eligibility", label: "Eligibility" }, { key: "curriculum", label: "Curriculum" }],
    faq: [
      { q: "Who should join the Regular Programme?", cats: ["program", "eligibility"], a: "Beginners and career switchers who want real GenAI and Agentic AI skills and practical projects." },
      { q: "Is it suitable for complete beginners?", cats: ["eligibility"], a: "Yes. It is built for beginners and career switchers (L1 & L2) and starts with a strong foundation before moving to projects." },
      { q: "How long is the programme?", cats: ["program"], a: "12 weeks of guided, hands-on learning with live sessions, projects and mentorship." },
      { q: "Is it online or offline?", cats: ["program"], a: "Both. Talk to our team to find the batch that suits you." },
      { q: "Which tools will I use?", cats: ["curriculum"], a: "Packages: LangChain, LangGraph, CrewAI, Hugging Face, pandas and NumPy. Tools: Python, Ollama, Claude, Gemini, n8n, FastAPI, Docker and GitHub." },
      { q: "What will I build?", cats: ["curriculum"], a: "Real-world projects and a portfolio, from fundamentals to portfolio-ready work." },
    ],
    packages: ["langchain", "langgraph", "crewai", "huggingface", "pandas", "numpy"],
    tools: ["python", "ollama", "claude", "googlegemini", "n8n", "fastapi", "docker", "github"],
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
      { icon: "trend", title: "Advanced", sub: "L3+" },
      { icon: "briefcase", title: "C-Suite", sub: "Leadership" },
      { icon: "clock", title: "12 Weeks", sub: "Programme" },
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
    faqCats: [{ key: "program", label: "Programme" }],
    faq: [
      { q: "Who is the Premium Programme for?", cats: ["program"], a: "Advanced learners (L3+) and the C-Suite." },
      { q: "Who leads the sessions?", cats: ["program"], a: "Industry experts and board-level leaders." },
      { q: "How long is it?", cats: ["program"], a: "12 weeks." },
      { q: "How do I join?", cats: ["program"], a: "Talk to our team and we will connect you within 24 to 48 hours." },
    ],
    packages: ["pytorch", "huggingface", "langgraph", "crewai", "keras", "opencv"],
    tools: ["python", "claude", "mistralai", "ollama", "gradio", "docker", "github"],
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
