import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { GitHubIcon, LinkedInIcon } from "./HomeSections";
import { profile, topDevOps } from "../data/resume";

export default function Footer() {
  const navigate = useNavigate();

  const goContact = () => {
    navigate("/");
    setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 180);
  };

  const goHomeTop = () => {
    navigate("/");
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 160);
  };

  const goSkills = () => {
    navigate("/");
    setTimeout(() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
  };

  const goExperience = () => {
    navigate("/");
    setTimeout(() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
  };

  return (
    <footer className="footer-surface relative border-t border-[rgba(137,176,174,0.18)]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-[radial-gradient(70%_100%_at_50%_100%,rgba(89,13,34,0.35),transparent_70%)]" />
      <div className="mx-auto max-w-6xl px-5 pb-8 pt-14 md:px-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-white/[0.07] pb-8">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-subtle">Runs on</span>
          {topDevOps.map((t) => (
            <div key={t.name} title={t.name} className="text-subtle transition-colors hover:text-paper">
              <BrandLogo slug={t.slug} className="h-4 w-4" />
            </div>
          ))}
        </div>

        <div className="grid gap-9 py-11 md:grid-cols-12">
          <div className="space-y-4 md:col-span-5">
            <Link to="/" className="flex w-max items-center gap-2.5">
              <span className="acc-bg flex h-9 w-9 items-center justify-center rounded-lg font-display text-[12px] font-bold">AM</span>
              <span className="font-display text-[17px] font-semibold text-paper">Atiqa <span className="acc-text">Mushtaq</span></span>
            </Link>
            <p className="max-w-xs text-[12.5px] leading-relaxed text-subtle">
              Cloud &amp; DevOps engineer building automated, observable delivery systems.
              Remote-friendly · open to Cloud &amp; DevOps roles.
            </p>
            <div className="flex gap-2">
              {[
                { href: profile.linkedin, label: "LinkedIn", icon: <LinkedInIcon /> },
                { href: profile.github, label: "GitHub", icon: <GitHubIcon /> },
                { href: `mailto:${profile.email}`, label: "Email", icon: <MailMark /> },
              ].map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-white/[0.035] text-muted transition-all hover:-translate-y-0.5 hover:border-[var(--acc-line)] hover:text-paper">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3 md:col-span-3">
            <h4 className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-subtle">Explore</h4>
            {[
              { label: "Home", to: "/" },
              { label: "Projects", to: "/projects" },
              { label: "Resume", to: "/resume" },
            ].map((l, i) =>
              l.to === "/" ? (
                <button key="home" onClick={goHomeTop} className="group flex w-max items-center gap-2 text-[13px] text-paper/80 transition-colors hover:text-paper">
                  <span className="font-mono text-[9px] text-white/25 group-hover:text-paper">0{i + 1}</span>
                  Home
                </button>
              ) : (
                <Link key={l.to} to={l.to} className="group flex w-max items-center gap-2 text-[13px] text-paper/80 transition-colors hover:text-paper">
                  <span className="font-mono text-[9px] text-white/25 group-hover:text-paper">0{i + 1}</span>
                  {l.label}
                </Link>
              )
            )}
            <button
              onClick={goSkills}
              className="group flex w-max items-center gap-2 text-[13px] text-paper/80 transition-colors hover:text-paper"
            >
              <span className="font-mono text-[9px] text-white/25 group-hover:text-paper">02</span>
              Skills
            </button>
            <button
              onClick={goExperience}
              className="group flex w-max items-center gap-2 text-[13px] text-paper/80 transition-colors hover:text-paper"
            >
              <span className="font-mono text-[9px] text-white/25 group-hover:text-paper">03</span>
              Experience
            </button>
            <button onClick={goContact} className="group flex w-max items-center gap-2 text-[13px] text-paper/80 transition-colors hover:text-paper">
              <span className="font-mono text-[9px] text-white/25 group-hover:text-paper">04</span>
              Contact
            </button>
          </div>

          <div className="space-y-3 md:col-span-4">
            <h4 className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-subtle">Get in touch</h4>
            <a href={`mailto:${profile.email}`} className="group flex w-max items-center gap-2 text-[13px] text-paper transition-colors hover:text-cyan-soft">
              {profile.email}
              <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="block w-max text-[12.5px] text-muted transition-colors hover:text-paper">
              {profile.linkedinLabel}
            </a>
            <div className="card max-w-xs rounded-xl p-4">
              <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-subtle">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute h-full w-full rounded-full bg-[#89b0ae] opacity-70 [animation:pulse-ring_2.4s_ease-out_infinite]" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-[#89b0ae]" />
                </span>
                Available
              </p>
              <p className="mt-2 text-[11.5px] leading-relaxed text-muted">Open to Cloud &amp; DevOps engineering roles.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/[0.07] pt-6 font-mono text-[9.5px] uppercase tracking-[0.16em] text-subtle sm:flex-row">
          <span>© 2026 Atiqa Mushtaq · Cloud &amp; DevOps</span>
          <span className="flex items-center gap-2">
            <span className="acc-text">●</span> Light / dark mode · same palette
          </span>
        </div>
      </div>
    </footer>
  );
}

function MailMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[16px] w-[16px]">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 7 8.5 6L20.5 7" />
    </svg>
  );
}
