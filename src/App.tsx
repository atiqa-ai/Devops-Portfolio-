import { useEffect, useState } from "react";
import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import SkillsSection from "./components/SkillsSection";
import {
  CertificationsSection, ContactSection, ExperienceSection,
  ProjectsSection,
} from "./components/HomeSections";
import ProjectsPage from "./pages/Projects";
import ResumePage from "./pages/Resume";
import CertificatePage from "./pages/Certificate";
import { ThemeProvider } from "./theme";

/** Soft cursor glow — driven by the active theme accent. */
function Spotlight() {
  const [pos, setPos] = useState({ x: -600, y: -600 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 hidden md:block"
      style={{ background: `radial-gradient(520px circle at ${pos.x}px ${pos.y}px, var(--acc-wash), transparent 68%)` }} />
  );
}

function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

function Home() {
  return (
    <main>
      <Hero />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <CertificationsSection />
      <ContactSection />
    </main>
  );
}

/** Document routes hide the site header (and footer) so nothing competes with the document. */
function Chrome() {
  const { pathname } = useLocation();
  const isDocument = pathname.startsWith("/resume") || pathname.startsWith("/certificate");

  return (
    <div className="relative min-h-screen bg-ink">
      {!isDocument && <Spotlight />}
      <ScrollManager />
      {!isDocument && <Nav />}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/certificate/:id" element={<CertificatePage />} />
          <Route path="/experience" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {!isDocument && <Footer />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Chrome />
      </HashRouter>
    </ThemeProvider>
  );
}
