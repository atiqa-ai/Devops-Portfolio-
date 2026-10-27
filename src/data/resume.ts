/* ============================================================
   Atiqa Mushtaq — content source of truth
   Focus: Cloud & DevOps Engineering
   ============================================================ */

export const profile = {
  name: "Atiqa Mushtaq",
  title: "Cloud & DevOps Engineer",
  focus: ["Cloud Engineering", "DevOps", "Automation"],
  email: "catiqa23@gmail.com",
  location: "Vehari, Pakistan",
  linkedin: "https://linkedin.com/in/atiqa-mushtaq",
  linkedinLabel: "linkedin.com/in/atiqa-mushtaq",
  github: "https://github.com/atiqa-ai",
  githubLabel: "github.com/atiqa-ai",
};

export const summary =
  "Computer Science student with hands-on experience across Cloud Computing and DevOps. Proven ability to build and deploy containerized applications, design CI/CD pipelines, implement monitoring stacks and automate infrastructure tooling. Passionate about clean code, system reliability and continuous learning.";

export const summaryTail = "Seeking opportunities to contribute as a Cloud & DevOps engineer.";


/* ------------------------------------------------------------ */
/*  SKILLS — every listed skill, with real brand marks           */
/* ------------------------------------------------------------ */
/** Shared shape for a named skill/tool with an optional brand mark. */
export type Skill = { name: string; slug?: string; color?: string };

/* Skills content now lives in `src/data/skillFields.ts`
   (four connected capability fields). */

export const topDevOps = [
  { name: "AWS", slug: "aws", color: "#FF9900" },
  { name: "Docker", slug: "docker", color: "#2496ED" },
  { name: "GitHub Actions", slug: "githubactions", color: "#E8E8E8" },
  { name: "Prometheus", slug: "prometheus", color: "#E6522C" },
  { name: "Grafana", slug: "grafana", color: "#F46800" },
  { name: "Nginx", slug: "nginx", color: "#009639" },
  { name: "Linux", slug: "linux", color: "#FCC624" },
  { name: "Bash", slug: "gnubash", color: "#4EAA25" },
];

/* ------------------------------------------------------------ */
/*  EXPERIENCE                                                   */
/* ------------------------------------------------------------ */
export type Job = {
  role: string;
  company: string;
  location: string;
  period: string;
  accent: "cyan" | "pink";
  points: string[];
  stack: string[];
};

export const experience: Job[] = [
  {
    role: "DevOps Engineer",
    company: "Springer's Capital Investments LLC",
    location: "Remote",
    period: "August 2026 – Present",
    accent: "cyan",
    points: [
      "Supporting CI/CD pipeline configuration, application deployment, system performance monitoring, and basic cloud infrastructure management.",
      "Maintaining version control workflows and assisting the team with reliable deployment practices in a remote environment.",
      "Built an open port scanning tool using Bash scripting on Ubuntu to scan multiple IPs and identify mapped/running services.",
      "Deployed local LLMs (Gemma 4B and Qwen) using llama.cpp, handling model selection and production-style local inference setup.",
    ],
    stack: ["githubactions", "gnubash", "kalilinux", "git"],
  },
  {
    role: "Cloud Computing Engineer",
    company: "CloudOps24",
    location: "Lahore",
    period: "May 2026 – August 2026",
    accent: "pink",
    points: [
      "Gained practical experience in cloud infrastructure, server administration, virtualization, networking, and VoIP technologies (Proxmox, Isatabl, Asterisk, FreePBX).",
      "Assisted the technical team on IT infrastructure and cloud modernization projects.",
      "Led the \"Soul of Lahore\" project: containerized a Node.js cinematic website using Docker, implemented full CI/CD pipelines, and set up production monitoring with Prometheus, Grafana, and Loki.",
    ],
    stack: ["proxmox", "docker", "prometheus", "grafana", "asterisk"],
  },
  {
    role: "Python Developer",
    company: "YungDev",
    location: "Remote",
    period: "October 2025 – November 2025",
    accent: "cyan",
    points: [
      "Applied object-oriented programming principles, modular code structure, and error handling to create maintainable and scalable applications.",
      "Collaborated on testing, debugging, and refining both systems to ensure reliability and smooth user experience.",
      "Designed and developed Student Record Management System and Library Record Management in Python, implementing full CRUD operations, data validation, and file-based storage for efficient student information handling.",
    ],
    stack: ["python", "mysql", "git"],
  },
  {
    role: "Python Developer",
    company: "Rhombix Technologies",
    location: "Remote",
    period: "November 2025 – January 2026",
    accent: "pink",
    points: [
      "Developed multiple Python applications focused on automation, API integration, and real-time systems.",
      "Built a real-time Google Geolocation Tracker and an AI-powered voice assistant (web search, page opening, image handling) achieving 95% and 90% accuracy respectively.",
      "Created interactive applications including a Hangman game and a Puzzle game.",
    ],
    stack: ["python", "gnubash", "git"],
  },
  {
    role: "Machine Learning Engineer",
    company: "Arch Technologies",
    location: "Remote",
    period: "November 2025 – December 2025",
    accent: "cyan",
    points: [
      "Completed an intensive 8-week Machine Learning program focused on supervised learning and classification.",
      "Developed an Email Spam Classifier using SVM, TF-IDF, and Decision Tree.",
      "Built MNIST digit classification and California Housing Price Prediction models using Logistic Regression, Decision Tree, SVM, and Linear Regression.",
      "Implemented text spam detection using Naive Bayes.",
    ],
    stack: ["python", "scikitlearn"],
  },
];

/* ------------------------------------------------------------ */
/*  PROJECTS — one flat catalogue, filterable by domain           */
/* ------------------------------------------------------------ */
export type Domain = "Cloud & DevOps" | "Python" | "Machine Learning";
export type Project = {
  id: string;
  title: string;
  description: string;
  domain: Domain;
  accent: "cyan" | "pink";
  tags: Skill[];
  highlights: string[];
};

export const projects: Project[] = [
  {
    id: "soul-of-lahore",
    title: "Soul of Lahore – Cinematic Web Application",
    description:
      "Fully containerized Node.js website with Docker, automated CI/CD pipelines, and a complete observability stack (Prometheus + Grafana + Loki).",
    domain: "Cloud & DevOps",
    accent: "cyan",
    tags: [
      { name: "Node.js", slug: "nodedotjs", color: "#5FA04E" },
      { name: "Docker", slug: "docker", color: "#2496ED" },
      { name: "Prometheus", slug: "prometheus", color: "#E6522C" },
      { name: "Grafana", slug: "grafana", color: "#F46800" },
      { name: "Loki" },
    ],
    highlights: ["Containerised delivery", "Full CI/CD", "Production monitoring"],
  },
  {
    id: "cloud-native-cicd",
    title: "Cloud-Native CI/CD & Observability Platform",
    description:
      "End-to-end pipeline with GitHub Actions, Docker, Nomad, and AWS; integrated Prometheus, Grafana, and Loki for monitoring and logging.",
    domain: "Cloud & DevOps",
    accent: "pink",
    tags: [
      { name: "GitHub Actions", slug: "githubactions", color: "#E8E8E8" },
      { name: "Docker", slug: "docker", color: "#2496ED" },
      { name: "Nomad", slug: "nomad", color: "#00CA8E" },
      { name: "AWS", slug: "aws", color: "#FF9900" },
      { name: "Grafana", slug: "grafana", color: "#F46800" },
      { name: "Loki" },
    ],
    highlights: ["Pipeline automation", "Cloud scheduling", "Log aggregation"],
  },
  {
    id: "secure-aws",
    title: "Secure AWS Infrastructure Automation",
    description:
      "Automated secure deployments using GitHub Actions, Docker, VPC, IAM, and security controls.",
    domain: "Cloud & DevOps",
    accent: "cyan",
    tags: [
      { name: "GitHub Actions", slug: "githubactions", color: "#E8E8E8" },
      { name: "Docker", slug: "docker", color: "#2496ED" },
      { name: "VPC", slug: "aws", color: "#FF9900" },
      { name: "IAM", slug: "aws", color: "#FF9900" },
    ],
    highlights: ["Network isolation", "Least-privilege IAM", "Automated releases"],
  },
  {
    id: "voice-assistant",
    title: "Voice AI Assistant",
    description:
      "Built a voice-controlled AI assistant in Python that performs web searches, opens websites, and executes image-related commands using speech recognition and speech-to-text (STT).",
    domain: "Python",
    accent: "pink",
    tags: [
      { name: "Python", slug: "python", color: "#3776AB" },
      { name: "Speech Recognition", slug: "python", color: "#3776AB" },
      { name: "STT", slug: "python", color: "#3776AB" },
    ],
    highlights: ["Voice commands", "Web automation", "Image handling"],
  },
  {
    id: "geolocation",
    title: "Real-Time Python Geolocation Tracker",
    description:
      "Developed a real-time geolocation tracking system that fetches and displays live location data using Python and external APIs.",
    domain: "Python",
    accent: "cyan",
    tags: [
      { name: "Python", slug: "python", color: "#3776AB" },
      { name: "External APIs" },
    ],
    highlights: ["Live location", "API integration", "Real-time display"],
  },
  {
    id: "record-management",
    title: "Student Record Management System & Library Record Management System",
    description:
      "Created complete student record management system with CRUD operations, and file-based storage & library management system for tracking books, issuing/returning, and searching records.",
    domain: "Python",
    accent: "pink",
    tags: [
      { name: "Python", slug: "python", color: "#3776AB" },
      { name: "CRUD", slug: "mysql", color: "#4479A1" },
      { name: "File-based Storage", slug: "gnubash", color: "#4EAA25" },
    ],
    highlights: ["Full CRUD", "Issue / return flow", "Searchable records"],
  },
  {
    id: "games",
    title: "Hangman Game & Puzzle Game",
    description:
      "Implemented classic Hangman and puzzle games in Python with interactive gameplay, score tracking, and clean user interface.",
    domain: "Python",
    accent: "cyan",
    tags: [
      { name: "Python", slug: "python", color: "#3776AB" },
      { name: "Game Logic", slug: "python", color: "#3776AB" },
    ],
    highlights: ["Score tracking", "Interactive UI"],
  },
  {
    id: "password-generator",
    title: "Random Password Generator",
    description:
      "Build a random password generator using characters, nmbors, special characters and random module.",
    domain: "Python",
    accent: "pink",
    tags: [
      { name: "Python", slug: "python", color: "#3776AB" },
      { name: "random module", slug: "python", color: "#3776AB" },
    ],
    highlights: ["Character sets", "Randomised output"],
  },
  {
    id: "email-spam",
    title: "Email Spam Classifier",
    description:
      "Build a Streamlit web application for email spam classification using SVM, TF-IDF vectorization, and Decision Tree models.",
    domain: "Machine Learning",
    accent: "cyan",
    tags: [
      { name: "Streamlit", slug: "streamlit", color: "#FF4B4B" },
      { name: "SVM", slug: "scikitlearn", color: "#F7931E" },
      { name: "TF-IDF", slug: "python", color: "#3776AB" },
      { name: "Decision Tree", slug: "scikitlearn", color: "#F7931E" },
    ],
    highlights: ["Web app UI", "Text vectorisation", "Model comparison"],
  },
  {
    id: "text-spam",
    title: "Text Spam Detection",
    description:
      "Developed a text spam detection system using Naive Bayes classifier for accurate identification of spam messages.",
    domain: "Machine Learning",
    accent: "pink",
    tags: [
      { name: "Naive Bayes", slug: "scikitlearn", color: "#F7931E" },
      { name: "Python", slug: "python", color: "#3776AB" },
    ],
    highlights: ["Text classification", "Spam filtering"],
  },
  {
    id: "mnist",
    title: "MNIST Digit Classifier",
    description:
      "Trained a Logistic Regression model to classify handwritten digits from the MNIST dataset with solid accuracy.",
    domain: "Machine Learning",
    accent: "cyan",
    tags: [
      { name: "Logistic Regression", slug: "scikitlearn", color: "#F7931E" },
      { name: "MNIST" },
    ],
    highlights: ["Image classification", "Accuracy evaluation"],
  },
  {
    id: "california-housing",
    title: "California Housing Price Prediction",
    description:
      "Implemented and compared Decision Tree, SVM, and Linear Regression models to predict California housing prices.",
    domain: "Machine Learning",
    accent: "pink",
    tags: [
      { name: "Decision Tree", slug: "scikitlearn", color: "#F7931E" },
      { name: "SVM", slug: "scikitlearn", color: "#F7931E" },
      { name: "Linear Regression" },
    ],
    highlights: ["Regression models", "Model comparison"],
  },
];

export const domains: Domain[] = ["Cloud & DevOps", "Python", "Machine Learning"];

/* ------------------------------------------------------------ */
/*  EDUCATION & CERTIFICATIONS                                   */
/* ------------------------------------------------------------ */
export const education = [
  {
    school: "University of Education, Lahore",
    degree: "Bachelor of Science in Computer Science",
    period: "Aug 2023 – Present",
  },
  {
    school: "Government Post Graduate College for Girls, Vehari",
    degree: "Intermediate",
    period: "2021 – 2023",
  },
  {
    school: "Government Girls High School, Vehari",
    degree: "Matric",
    period: "2019 – 2021",
  },
];

export const certifications = [
  {
    name: "AWS Cloud Practitioner Essentials",
    issuer: "AWS Training & Certification",
    year: "2026",
    slug: "aws",
    color: "#FF9900",
    certificateId: "aws-cloud-practitioner",
    detail: "Completion Certificate · September 27, 2026",
  },
  {
    name: "Python for Beginners",
    issuer: "Simplilearn SkillUp",
    year: "2025",
    slug: "python",
    color: "#3776AB",
    certificateId: "python-beginners",
    detail: "Certificate code 9205022 · 21st October 2025",
  },
];

export const languages = [
  { name: "Urdu", level: "Native Proficiency", code: "UR" },
  { name: "English", level: "Professional Working Proficiency", code: "EN" },
];

/* ------------------------------------------------------------ */
/*  PRINCIPLES                                                   */
/* ------------------------------------------------------------ */
