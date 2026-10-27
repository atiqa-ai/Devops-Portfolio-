import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, BadgeCheck, Check, FileText, Send } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { SectionHeading, SkillMark, Reveal } from "./ui";
import { certifications, education, experience, profile, projects } from "../data/resume";
import { certificates as certificateDocs } from "../data/certificates";
import CertificateModal from "./CertificateModal";
import { cn } from "../utils/cn";

/* ============================================================ */
/*  PROJECTS — featured + "See all projects"                    */
/* ============================================================ */
export function ProjectTile({ p, i }: { p: (typeof projects)[number]; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={cn("card-wine card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl p-6", i % 3 === 1 && "card-wine-tint")}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity group-hover:opacity-100"
        style={{ background: "linear-gradient(90deg, transparent, var(--acc), transparent)" }} />
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="project-domain rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em]">
          {p.domain}
        </span>
        <span className="project-index font-mono text-[9px] tracking-[0.14em]">{String(i + 1).padStart(2, "0")}</span>
      </div>
      <h3 className="project-title font-display text-[16px] font-semibold leading-snug">{p.title}</h3>
      <p className="project-copy mt-2.5 flex-1 text-[12.5px] leading-relaxed">{p.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[rgba(233,245,219,0.22)] pt-4">
        {p.tags.map((t) => (
          <span key={t.name} className="project-tag inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.06em]">
            <SkillMark skill={t} className="h-3 w-3" />
            {t.name}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const featured = projects.slice(0, 4);
  return (
    <section id="projects" className="section-shell relative scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="02"
          label="Projects"
          title={<>Everything I've <span className="text-grad">built.</span></>}
          copy={`The first four of ${projects.length} projects, in resume order. Open the full catalogue below to browse every project and its stack.`}
          accent="pink"
        />
        <div className="mt-11 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((p, i) => <ProjectTile key={p.id} p={p} i={i} />)}
        </div>

        <div className="mt-9 flex flex-col items-center gap-3 border-t border-[rgba(40,61,59,0.16)] pt-8">
          <Link to="/projects"
            className="btn-acc inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[13px] font-semibold">
            See All Projects <ArrowRight size={15} />
          </Link>
          <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-subtle">
            Showing 4 of {projects.length} · full catalogue &amp; stack detail
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  EXPERIENCE                                                   */
/* ============================================================ */
export function ExperienceSection() {
  return (
    <section id="experience" className="section-band relative scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="03"
          label="Experience"
          title={<>Professional <span className="text-grad">experience.</span></>}
          copy="Cloud infrastructure, DevOps delivery, automation and applied machine learning — roles and responsibilities exactly as listed on my resume."
          className="[&_p]:text-[#dbeade]"
          action={
            <Link to="/resume" className="btn-ghost inline-flex items-center gap-2 rounded-full px-5 py-3 text-[13px] font-semibold">
              View resume <ArrowRight size={15} />
            </Link>
          }
        />

        <div className="relative mt-11">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#a4133c] via-[#89b0ae] to-transparent" />
          <div className="space-y-4">
            {experience.map((job, i) => (
              <Reveal key={job.company + job.period} delay={i * 0.04}>
                <div className="relative pl-8">
                  <span className="absolute left-0 top-6 grid h-4 w-4 place-items-center rounded-full border border-[var(--acc-line)] bg-[#283d3b]">
                    <span className={cn("h-1.5 w-1.5 rounded-full", job.accent === "cyan" ? "bg-[#a4133c]" : "bg-[#e9f5db]")} />
                  </span>
                  <div className={cn("exp-card p-5 md:p-6", i % 2 === 0 ? "" : "exp-card-solid")}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="exp-role font-display text-[16px] font-bold text-[#f7fdf4] md:text-[17.5px]">{job.role}</h3>
                        <p className="mt-1 text-[12.5px]">
                          <span className="exp-company text-[#e9f5db] font-semibold">{job.company}</span>
                          <span className="exp-location text-[#d5e7e2]"> · {job.location}</span>
                        </p>
                      </div>
                      <span className="exp-meta exp-period rounded-full px-3 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-[#f4fbf0]">
                        {job.period}
                      </span>
                    </div>
                    <ul className="mt-3.5 space-y-2">
                      {job.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#89b0ae]" />
                          <span className="exp-point text-[12.5px] leading-relaxed text-[#eef7e8] md:text-[13px]">{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[rgba(137,176,174,0.22)] pt-3.5">
                      {job.stack.map((slug) => (
                        <span key={slug} className="grid h-7 w-7 place-items-center rounded-lg border border-[rgba(233,245,219,0.28)] bg-[rgba(233,245,219,0.12)] text-[#f4fbf0]" title={slug}>
                          <BrandLogo slug={slug} className="h-3.5 w-3.5 text-[#f4fbf0]" />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between gap-4">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#c2d8d2]">{experience.length} roles · 2025 – present</p>
          <Link to="/resume" className="acc-text inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] hover:underline">
            Resume detail <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  CERTIFICATIONS                                               */
/* ============================================================ */
export function CertificationsSection() {
  const [openCert, setOpenCert] = useState<string | null>(null);
  const activeCert = certificateDocs.find((c) => c.id === openCert) ?? null;

  return (
    <section id="certifications" className="section-shell relative scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="04"
          label="Certifications"
          title={<>Certified &amp; <span className="text-grad">accountable.</span></>}
          copy="AWS Cloud Practitioner Essentials and Python for Beginners — open either certificate to view the document right here in a card."
          accent="pink"
        />
        <div className="mt-11 grid gap-4 md:grid-cols-2">
          {certifications.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <div className="card card-lift group relative block overflow-hidden rounded-2xl p-6 md:p-7">
                <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#e9f5db] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10" />
                <div className="relative flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[rgba(137,176,174,0.6)] bg-[rgba(137,176,174,0.18)]">
                    <BrandLogo slug={c.slug} className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-subtle">{c.issuer}</span>
                      <span className="text-white/15">·</span>
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-subtle">{c.year}</span>
                      <span className="acc-text ml-auto inline-flex items-center gap-1 rounded-full border border-[var(--acc-line)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em]">
                        <BadgeCheck size={9} /> Certified
                      </span>
                    </div>
                    <h3 className="font-display text-[16.5px] font-semibold leading-snug text-paper md:text-[18px]">{c.name}</h3>
                    <p className="mt-1 text-[11.5px] text-muted">{c.detail}</p>
                    <button
                      type="button"
                      onClick={() => setOpenCert(c.certificateId)}
                      className="group/btn mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-[#a4133c] px-3.5 py-2 text-[11.5px] font-semibold text-[#e9f5db] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#590d22]"
                      aria-label={`View ${c.name} certificate`}
                    >
                      <FileText size={12} />
                      View certificate
                      <ArrowUpRight size={12} className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* education strip */}
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {education.map((e) => (
            <div key={e.school} className="rounded-2xl border border-[rgba(40,61,59,0.2)] bg-white/[0.03] p-5">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-subtle">{e.period}</p>
              <h4 className="mt-2 text-[13.5px] font-semibold leading-snug text-paper">{e.school}</h4>
              <p className="mt-1 text-[12px] italic text-muted">{e.degree}</p>
            </div>
          ))}
        </div>
      </div>

      <CertificateModal cert={activeCert} onClose={() => setOpenCert(null)} />
    </section>
  );
}

/* ============================================================ */
/*  CONTACT — no address, no phone                              */
/* ============================================================ */
export function ContactSection() {
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const input = "w-full rounded-xl border border-[rgba(40,61,59,0.2)] bg-white/[0.035] px-4 py-3 text-[13.5px] text-paper placeholder:text-subtle outline-none transition-colors focus:border-[var(--acc-line)]";

  return (
    <section id="contact" className="section-band relative scroll-mt-20 border-t border-[rgba(40,61,59,0.14)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="05"
          label="Contact"
          title={<>Let's build something <span className="text-grad">reliable.</span></>}
          copy="Open to Cloud & DevOps engineering roles and collaboration. The fastest route is email or LinkedIn."
        />

        <div className="mt-11 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          {/* form */}
          <div className="card rounded-2xl p-6 md:p-8">
            {sent ? (
              <div className="flex min-h-[19rem] flex-col items-start justify-center gap-4">
                <span className="acc-wash acc-text grid h-12 w-12 place-items-center rounded-xl border border-[var(--acc-line)]"><Check size={20} /></span>
                <h3 className="font-display text-xl font-semibold text-paper">Message ready</h3>
                <p className="max-w-sm text-[13px] leading-relaxed text-muted">
                  This is a demo form — nothing leaves the browser. Send the details directly to{" "}
                  <a href={`mailto:${profile.email}`} className="acc-text underline underline-offset-4">{profile.email}</a>.
                </p>
                <button onClick={() => setSent(false)} className="btn-ghost rounded-full px-5 py-2.5 text-[12.5px] font-semibold">Write another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3.5">
                <div className="mb-1 flex items-center gap-2">
                  <span className="acc-text"><Send size={13} /></span>
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-subtle">Send a message</p>
                </div>
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <input required aria-label="Your name" autoComplete="name" placeholder="Your name" className={input} />
                  <input required type="email" aria-label="Email address" autoComplete="email" placeholder="Email address" className={input} />
                </div>
                <input aria-label="Subject" placeholder="Subject" className={input} />
                <textarea required rows={5} aria-label="Message" placeholder="Tell me about the role, project or question…" className={cn(input, "resize-none")} />
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button type="submit" className="btn-acc inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold">
                    Send message <Send size={14} />
                  </button>
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-subtle">Reply within 48 hours</p>
                </div>
              </form>
            )}
          </div>

          {/* channels */}
          <div className="space-y-3">
            <a href={`mailto:${profile.email}`}
              className="card group flex items-center gap-4 rounded-2xl p-5">
              <span className="acc-wash acc-text grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--acc-line)]"><MailIcon /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-subtle">Email</span>
                <span className="block truncate text-[13px] font-semibold text-paper">{profile.email}</span>
              </span>
              <ArrowUpRight size={15} className="text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="card group flex items-center gap-4 rounded-2xl p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/12 bg-white/[0.04] text-paper"><LinkedInIcon /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-subtle">LinkedIn</span>
                <span className="block truncate text-[13px] font-semibold text-paper">{profile.linkedinLabel}</span>
              </span>
              <ArrowUpRight size={15} className="text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper" />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="card group flex items-center gap-4 rounded-2xl p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/12 bg-white/[0.04] text-paper"><GitHubIcon /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-subtle">GitHub</span>
                <span className="block truncate text-[13px] font-semibold text-paper">{profile.githubLabel}</span>
              </span>
              <ArrowUpRight size={15} className="text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper" />
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}

/* small inline icons */
function MailIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5" /><path d="m3.5 7 8.5 6L20.5 7" /></svg>;
}
export function LinkedInIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className ?? "h-[18px] w-[18px]"}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>;
}
export function GitHubIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className ?? "h-[18px] w-[18px]"}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>;
}
