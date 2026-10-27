import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { profile } from "../data/resume";
import { useTheme } from "../theme";
import { scrollToSection } from "../lib/scrollToSection";
import { cn } from "../utils/cn";

const links = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Resume", to: "/resume" },
];


export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { mode, toggleMode } = useTheme();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 28 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const goHomeTop = () => {
    setOpen(false);
    const scrollTop = () =>
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });

    if (pathname === "/") {
      scrollTop();
    } else {
      navigate("/");
      window.setTimeout(scrollTop, 160);
    }
  };

  const goAbout = () => {
    setOpen(false);
    if (pathname === "/") {
      scrollToSection("hero");
    } else {
      navigate("/");
      setTimeout(() => scrollToSection("hero"), 200);
    }
  };

  const goSkills = () => {
    setOpen(false);
    if (pathname === "/") {
      scrollToSection("skills");
    } else {
      navigate("/");
      setTimeout(() => scrollToSection("skills"), 200);
    }
  };

  const goProjects = () => {
    setOpen(false);
    if (pathname === "/") {
      scrollToSection("projects");
    } else {
      navigate("/");
      setTimeout(() => scrollToSection("projects"), 200);
    }
  };

  const goExperience = () => {
    setOpen(false);
    if (pathname === "/") {
      scrollToSection("experience");
    } else {
      navigate("/");
      setTimeout(() => scrollToSection("experience"), 200);
    }
  };

  const goContact = () => {
    setOpen(false);
    if (pathname === "/") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/");
      setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 180);
    }
  };

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="acc-bg fixed inset-x-0 top-0 z-[60] h-[2px] origin-left" />
      <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-400",
        scrolled ? "nav-shell border-b backdrop-blur-xl" : "border-b border-transparent")}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-[72px] md:px-8">
          <button type="button" onClick={goHomeTop} aria-label="Back to top of home page" className="group flex items-center gap-2.5">
            <span className="acc-bg flex h-8 w-8 items-center justify-center rounded-lg font-display text-[12px] font-bold transition-transform group-hover:scale-105">AM</span>
            <span className="nav-brand-text font-display text-[14.5px] font-semibold tracking-tight text-[#590d22] md:text-[15.5px]">
              Atiqa <span className="acc-text">Mushtaq</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const active = pathname === l.to;
              const node = l.to === "/" ? (
                <button
                  key="/"
                  type="button"
                  onClick={goHomeTop}
                  className={cn("relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors",
                    active ? "nav-link-active text-[#a4133c] font-semibold" : "nav-link text-[#590d22] hover:text-[#a4133c]")}
                >
                  Home
                  {active && <motion.span layoutId="nav-dot" className="acc-bg absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full" />}
                </button>
              ) : null;
              const aboutButton = (
                <button
                  key="about"
                  type="button"
                  onClick={goAbout}
                  aria-controls="hero"
                  className="nav-link rounded-full px-4 py-2 text-[13px] font-medium text-[#590d22] transition-colors hover:text-[#a4133c]"
                >
                  About
                </button>
              );
              const skillsButton = (
                <button
                  key="skills"
                  type="button"
                  onClick={goSkills}
                  aria-controls="skills"
                  className="nav-link rounded-full px-4 py-2 text-[13px] font-medium text-[#590d22] transition-colors hover:text-[#a4133c]"
                >
                  Skills
                </button>
              );
              const projectLink = (
                <button
                  key="/projects"
                  type="button"
                  onClick={goProjects}
                  aria-controls="projects"
                  className="nav-link rounded-full px-4 py-2 text-[13px] font-medium text-[#590d22] transition-colors hover:text-[#a4133c]"
                >
                  Projects
                </button>
              );
              if (l.to === "/") {
                return (
                  <span key="home-group" className="flex items-center gap-1">
                    {node}
                    {aboutButton}
                    {skillsButton}
                  </span>
                );
              }
              if (l.to === "/projects") {
                return (
                  <span key="projects-group" className="flex items-center gap-1">
                    {projectLink}
                    <button
                      type="button"
                      onClick={goExperience}
                      className="nav-link rounded-full px-4 py-2 text-[13px] font-medium text-[#590d22] transition-colors hover:text-[#a4133c]"
                    >
                      Experience
                    </button>
                  </span>
                );
              }
              return node;
            })}
            <button onClick={goContact} className="nav-link rounded-full px-4 py-2 text-[13px] font-medium text-[#590d22] transition-colors hover:text-[#a4133c]">
              Contact
            </button>
            <Link
              to="/resume"
              className={cn("relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors",
                pathname === "/resume" ? "nav-link-active text-[#a4133c] font-semibold" : "nav-link text-[#590d22] hover:text-[#a4133c]")}
            >
              Resume
              {pathname === "/resume" && (
                <motion.span layoutId="nav-dot" className="acc-bg absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full" />
              )}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleMode}
              aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
              aria-pressed={mode === "dark"}
              className="nav-mode-btn grid h-9 w-9 place-items-center rounded-full border border-[rgba(89,13,34,0.22)] bg-white/40 text-[#590d22] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#a4133c] hover:text-[#a4133c]"
              title={mode === "light" ? "Dark mode" : "Light mode"}
            >
              {mode === "light" ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            <button onClick={goContact} className="btn-acc hidden rounded-full px-5 py-2 text-[12.5px] font-semibold sm:inline-flex">
              Let's talk
            </button>

            <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="relative z-[60] grid h-9 w-9 place-items-center rounded-full border border-[rgba(89,13,34,0.25)] text-[#590d22] md:hidden">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div className={cn("nav-mobile fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-[rgba(233,245,219,0.98)] backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden",
        open ? "translate-y-0" : "-translate-y-full")}>
        {links.map((l) => (
          <span key={l.to} className="contents">
            {l.to === "/" ? (
              <button type="button" onClick={goHomeTop} className="nav-mobile-link font-display text-3xl font-semibold text-[#590d22] hover:text-[#a4133c]">Home</button>
            ) : l.to === "/projects" || l.to === "/resume" ? null : (
              <Link to={l.to} onClick={() => setOpen(false)} className="nav-mobile-link font-display text-3xl font-semibold text-[#590d22] hover:text-[#a4133c]">{l.label}</Link>
            )}
            {l.to === "/" && (
              <>
                <button type="button" onClick={goAbout} className="nav-mobile-link font-display text-3xl font-semibold text-[#590d22] hover:text-[#a4133c]">
                  About
                </button>
                <button type="button" onClick={goSkills} className="nav-mobile-link font-display text-3xl font-semibold text-[#590d22] hover:text-[#a4133c]">
                  Skills
                </button>
              </>
            )}
            {l.to === "/projects" && (
              <>
                <button type="button" onClick={goProjects} className="nav-mobile-link font-display text-3xl font-semibold text-[#590d22] hover:text-[#a4133c]">
                  Projects
                </button>
                <button type="button" onClick={goExperience} className="nav-mobile-link font-display text-3xl font-semibold text-[#590d22] hover:text-[#a4133c]">
                  Experience
                </button>
              </>
            )}
          </span>
        ))}
        <button onClick={goContact} className="nav-mobile-link font-display text-3xl font-semibold text-[#590d22] hover:text-[#a4133c]">Contact</button>
        <Link
          to="/resume"
          onClick={() => setOpen(false)}
          className="nav-mobile-link font-display text-3xl font-semibold text-[#590d22] hover:text-[#a4133c]"
        >
          Resume
        </Link>
        <button
          type="button"
          onClick={toggleMode}
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(89,13,34,0.25)] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-[#590d22]"
        >
          {mode === "light" ? <Moon size={14} /> : <Sun size={14} />} {mode === "light" ? "Dark" : "Light"} mode
        </button>
        <a href={`mailto:${profile.email}`} className="btn-acc mt-2 rounded-full px-7 py-3 text-sm font-semibold">{profile.email}</a>
      </div>
    </>
  );
}
