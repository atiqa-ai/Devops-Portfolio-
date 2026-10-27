import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, FileText, Printer, Check } from "lucide-react";

/**
 * Resume page — the two-page CV exactly as supplied, shown as printable A4
 * sheets. "Download PDF" opens the browser's print dialog, where the sheets
 * are already paginated for A4 (Save as PDF).
 */

const contact = {
  role: "DevOps Engineer Intern | Cloud & Automation | Python & ML",
  email: "catiqa23@gmail.com",
  mobile: "+92 3170491577",
  address: "91 lvb, Vehari",
  linkedin: "linkedin.com/in/atiqa-mushtaq",
  linkedinHref: "https://linkedin.com/in/atiqa-mushtaq",
  github: "github.com/atiqa-ai",
  githubHref: "https://github.com/atiqa-ai",
};

const skills = [
  {
    label: "Cloud & Infrastructure",
    value:
      "AWS (EC2, EKS, ECS, S3, VPC, IAM, CloudFront, Route 53, RDS), Azure (basics), Virtualization, Server Administration",
  },
  { label: "DevOps & CI/CD", value: "Docker, GitHub Actions, CI/CD Pipelines, YAML, GitOps" },
  { label: "Observability & Monitoring", value: "Prometheus, Grafana, Loki, Promtail, AWS CloudWatch" },
  { label: "Programming & Scripting", value: "Python, Bash, C/C++, JavaScript (Node.js)" },
  {
    label: "Machine Learning & AI",
    value:
      "Scikit-learn, Logistic Regression, Decision Tree, SVM, Naive Bayes, TF-IDF, Supervised Learning, OpenAI API, LangChain, Hugging Face, n8n, Grok API",
  },
  { label: "Web & Automation", value: "Dockerized Web Applications, Voice Assistants, Geolocation Tracking, API Integration" },
  {
    label: "Networking & Security",
    value: "VPC, Nginx, Load Balancers, IAM, Secrets Management, Docker Scout (vulnerability scanning)",
  },
  {
    label: "Databases & Tools",
    value: "MySQL, PostgreSQL, MongoDB, Git & GitHub, Linux (Ubuntu, Kali), Jira, Microsoft Office",
  },
];

const experience = [
  {
    role: "DevOps Engineer Intern",
    company: "Springer Capital Investments LLC",
    place: "Remote",
    period: "August 2026 – Present",
    points: [
      "Supporting CI/CD pipeline configuration, application deployment, system performance monitoring, and basic cloud infrastructure management.",
      "Maintaining version control workflows and assisting the team with reliable deployment practices in a remote environment.",
      "Built an open port scanning tool using Bash scripting on Ubuntu to scan multiple IPs and identify mapped/running services.",
      "Deployed local LLMs (Gemma 4B and Qwen) using llama.cpp, handling model selection and production-style local inference setup.",
    ],
  },
  {
    role: "ICT & Cloud Computing Intern",
    company: "CloudOps24",
    place: "Lahore",
    period: "May 2026 – August 2026",
    points: [
      "Gained practical experience in cloud infrastructure, server administration, virtualization, networking, and VoIP technologies (Proxmox, Isatabl, Asterisk, FreePBX).",
      "Assisted the technical team on IT infrastructure and cloud modernization projects.",
      'Led the "Soul of Lahore" project: containerized a Node.js cinematic website using Docker, implemented full CI/CD pipelines, and set up production monitoring with Prometheus, Grafana, and Loki.',
    ],
  },
  {
    role: "Python Intern",
    company: "YungDev Interns",
    place: "Remote",
    period: "October 2025 – November 2025",
    points: [
      "Applied object-oriented programming principles, modular code structure, and error handling to create maintainable and scalable applications.",
      "Collaborated on testing, debugging, and refining both systems to ensure reliability and smooth user experience.",
      "Designed and developed Student Record Management System and Library Record Management in Python, implementing full CRUD operations, data validation, and file-based storage for efficient student information handling.",
    ],
  },
  {
    role: "Python Developer Intern",
    company: "Rhombix Technologies",
    place: "Remote",
    period: "November 2025 – January 2026",
    points: [
      "Developed multiple Python applications focused on automation, API integration, and real-time systems.",
      "Built a real-time Google Geolocation Tracker and an AI-powered voice assistant (web search, page opening, image handling) achieving 95% and 90% accuracy respectively.",
      "Created interactive applications including a Hangman game and a Puzzle game.",
    ],
  },
];

const experiencePage2 = [
  {
    role: "Machine Learning Intern",
    company: "Arch Technologies",
    place: "Remote",
    period: "November 2025 – December 2025",
    points: [
      "Completed an intensive 8-week Machine Learning internship focused on supervised learning and classification.",
      "Developed an Email Spam Classifier using SVM, TF-IDF, and Decision Tree.",
      "Built MNIST digit classification and California Housing Price Prediction models using Logistic Regression, Decision Tree, SVM, and Linear Regression.",
      "Implemented text spam detection using Naive Bayes.",
    ],
  },
];

const projects = [
  {
    group: "Cloud & DevOps Projects",
    items: [
      {
        title: "Soul of Lahore – Cinematic Web Application",
        desc: "Fully containerized Node.js website with Docker, automated CI/CD pipelines, and a complete observability stack (Prometheus + Grafana + Loki).",
      },
      {
        title: "Cloud-Native CI/CD & Observability Platform",
        desc: "End-to-end pipeline with GitHub Actions, Docker, Nomad, and AWS; integrated Prometheus, Grafana, and Loki for monitoring and logging.",
      },
      {
        title: "Secure AWS Infrastructure Automation",
        desc: "Automated secure deployments using GitHub Actions, Docker, VPC, IAM, and security controls.",
      },
    ],
  },
  {
    group: "Python Projects",
    items: [
      {
        title: "Voice AI Assistant",
        desc: "Built a voice-controlled AI assistant in Python that performs web searches, opens websites, and executes image-related commands using speech recognition and speech-to-text (STT).",
      },
      {
        title: "Real-time Python Geolocation Tracker",
        desc: "Developed a real-time geolocation tracking system that fetches and displays live location data using Python and external APIs.",
      },
      {
        title: "Student Record Management System & Library Record Management System",
        desc: "Created complete student record management system with CRUD operations, and file-based storage & library management system for tracking books, issuing/returning, and searching records.",
      },
      {
        title: "Hangman Game & Puzzle Game",
        desc: "Implemented classic Hangman and puzzle games in Python with interactive gameplay, score tracking, and clean user interface.",
      },
      {
        title: "Random Password generator",
        desc: "Build a random password generator using characters, nmbors, special characters and random module.",
      },
    ],
  },
  {
    group: "Machine Learning Projects",
    items: [
      {
        title: "Email Spam Classifier",
        desc: "Built a Streamlit web application for email spam classification using SVM, TF-IDF vectorization, and Decision Tree models.",
      },
      {
        title: "Text Spam Detection",
        desc: "Developed a text spam detection system using Naive Bayes classifier for accurate identification of spam messages.",
      },
      {
        title: "MNIST Digit Classifier",
        desc: "Trained a Logistic Regression model to classify handwritten digits from the MNIST dataset with solid accuracy.",
      },
      {
        title: "California Housing Price Prediction",
        desc: "Implemented and compared Decision Tree, SVM, and Linear Regression models to predict California housing prices.",
      },
    ],
  },
];

const education = [
  { school: "University of Education, Lahore", degree: "Bachelor of Science in Computer Science | CGPA: 3.84/4.0", period: "Aug 2023 – Present" },
  { school: "Government Post Graduate College for Girls, Vehari", degree: "Intermediate", period: "2021 – 2023" },
  { school: "Government Girls High School, Vehari", degree: "Matric", period: "2019 – 2021" },
];

const certifications = ["AWS Cloud Practitioner Essentials — AWS Training & Certification | 2026", "Python for Beginners — Simplilearn SkillUp | 2025"];
const languages = ["Urdu — Native Proficiency", "English — Professional Working Proficiency"];

function SheetHead() {
  return (
    <header>
      <h1 className="resume-name">Atiqa Mushtaq</h1>
      <p className="resume-role">{contact.role}</p>
      <p className="resume-contact">
        Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
        {" | "}Mobile: {contact.mobile}
        {" | "}Address: {contact.address}
      </p>
      <p className="resume-contact">
        LinkedIn:{" "}
        <a href={contact.linkedinHref} target="_blank" rel="noreferrer">
          {contact.linkedin}
        </a>
        {" | "}GitHub:{" "}
        <a href={contact.githubHref} target="_blank" rel="noreferrer">
          {contact.github}
        </a>
      </p>
    </header>
  );
}

export default function Resume() {
  const [printed, setPrinted] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Atiqa Mushtaq — Resume";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const download = () => {
    setPrinted(true);
    window.setTimeout(() => {
      window.print();
      window.setTimeout(() => setPrinted(false), 1200);
    }, 120);
  };

  return (
    <div className="resume-shell relative min-h-screen px-0 pb-14 pt-20 sm:pt-24">
      {/* toolbar — fixed to the top-right corner, stays put while the resume scrolls */}
      <div className="no-print fixed right-3 top-3 z-40 sm:right-5 sm:top-4">
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-[rgba(40,61,59,0.22)] bg-[rgba(255,253,247,0.94)] p-1.5 shadow-[0_16px_38px_-26px_rgba(40,61,59,0.8)] backdrop-blur sm:gap-2 sm:p-2">
            <span
              className="hidden h-8 w-8 shrink-0 place-items-center rounded-full bg-[#a4133c] text-[#e9f5db] sm:grid"
              title="Atiqa Mushtaq — Resume"
            >
              <FileText size={14} />
            </span>
            <button
              type="button"
              onClick={download}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#a4133c] px-3.5 py-2 text-[11.5px] font-semibold text-[#e9f5db] transition-colors hover:bg-[#590d22]"
              aria-label="Download resume as PDF"
            >
              {printed ? <Check size={12} /> : <Download size={12} />}
              <span className="hidden sm:inline">{printed ? "Opening print…" : "Download PDF"}</span>
              <span className="sm:hidden">PDF</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              aria-label="Print resume"
              className="grid h-8 w-8 place-items-center rounded-full border border-[rgba(89,13,34,0.22)] text-[#590d22] transition-colors hover:border-[#a4133c] hover:text-[#a4133c]"
            >
              <Printer size={13} />
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(89,13,34,0.22)] px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#590d22] transition-colors hover:border-[#a4133c] hover:text-[#a4133c]"
            >
              <ArrowLeft size={12} /> <span className="hidden sm:inline">Back</span>
            </Link>
          </div>
        </div>
      </div>

      {/* sheets */}
      <div className="resume-doc mx-auto flex w-full max-w-[210mm] flex-col items-center gap-8 px-3 sm:px-0">
        {/* ---------------- page 1 ---------------- */}
        <article className="resume-sheet" aria-label="Resume page 1">
          <SheetHead />

          <h2 className="resume-section">Professional Summary</h2>
          <p className="resume-kv">
            Computer Science student (CGPA 3.84/4.0) with hands-on internship experience across Cloud Computing, DevOps,
            Python development, and Machine Learning. Proven ability to build and deploy containerized applications,
            design CI/CD pipelines, implement monitoring stacks, develop automation tools and create supervised ML models.
            Passionate about clean code, system reliability, and continuous learning. Seeking opportunities to
            contribute as a full-stack technologist in junior engineer roles.
          </p>

          <h2 className="resume-section">Skills Summary</h2>
          {skills.map((s) => (
            <p key={s.label} className="resume-kv">
              <b>{s.label}:</b> {s.value}
            </p>
          ))}

          <h2 className="resume-section">Experience</h2>
          {experience.map((job) => (
            <div key={job.role + job.company} className="resume-entry">
              <div className="resume-entry-head">
                <p className="resume-entry-title">{job.role}</p>
                <p className="resume-entry-date">{job.period}</p>
              </div>
              <p className="resume-entry-org">
                {job.company} | <span>{job.place}</span>
              </p>
              <ul className="resume-list">
                {job.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </article>

        {/* ---------------- page 2 ---------------- */}
        <article className="resume-sheet" aria-label="Resume page 2">
          {experiencePage2.map((job) => (
            <div key={job.role + job.company} className="resume-entry">
              <div className="resume-entry-head">
                <p className="resume-entry-title">{job.role}</p>
                <p className="resume-entry-date">{job.period}</p>
              </div>
              <p className="resume-entry-org">
                {job.company} | <span>{job.place}</span>
              </p>
              <ul className="resume-list">
                {job.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}

          <h2 className="resume-section">Projects</h2>
          {projects.map((group) => (
            <div key={group.group} className="mb-2">
              <p className="resume-kv">
                <b>{group.group}</b>
              </p>
              <ul className="resume-list">
                {group.items.map((item) => (
                  <li key={item.title}>
                    <b>{item.title}</b> – {item.desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <h2 className="resume-section">Education</h2>
          {education.map((ed) => (
            <div key={ed.school} className="resume-bullet">
              <span>
                <strong>{ed.school}</strong>
                <br />
                <em>{ed.degree}</em>
              </span>
              <span className="resume-entry-date">{ed.period}</span>
            </div>
          ))}

          <h2 className="resume-section">Certifications</h2>
          <ul className="resume-list">
            {certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>

          <h2 className="resume-section">Languages</h2>
          <ul className="resume-list">
            {languages.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}
