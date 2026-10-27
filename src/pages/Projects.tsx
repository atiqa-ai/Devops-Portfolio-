import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Search } from "lucide-react";
import { SectionHeading } from "../components/ui";
import { ProjectTile } from "../components/HomeSections";
import BrandLogo from "../components/BrandLogo";
import { projects, domains, topDevOps, profile, type Domain } from "../data/resume";
import { cn } from "../utils/cn";

type Filter = "All" | Domain;
const filters: Filter[] = ["All", ...domains];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(
    () =>
      projects.filter((p) => {
        const domainOk = filter === "All" || p.domain === filter;
        const q = query.trim().toLowerCase();
        const queryOk =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.name.toLowerCase().includes(q));
        return domainOk && queryOk;
      }),
    [filter, query]
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: projects.length };
    domains.forEach((d) => (map[d] = projects.filter((p) => p.domain === d).length));
    return map;
  }, []);

  return (
    <div>
      {/* header */}
      <section className="section-shell relative overflow-hidden pb-14 pt-28 md:pb-16 md:pt-36">
        <div className="soft-glow pointer-events-none absolute -right-20 -top-24 h-[26rem] w-[26rem]" />
        <div className="tile-grid pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-6xl px-5 md:px-8">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle transition-colors hover:text-paper">
            <ArrowLeft size={12} /> Back home
          </Link>
          <SectionHeading
            index="02"
            label="All projects"
            title={<>Everything I've <span className="text-grad">built.</span></>}
            copy={`All ${projects.length} projects from my resume in one catalogue — cloud automation, Python applications and machine-learning models. Filter by domain or search by technology.`}
            action={
              <div className="flex flex-wrap items-center gap-3">
                <a href={profile.github} target="_blank" rel="noopener noreferrer"
                  className="btn-ghost inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em]">
                  GitHub profile <ArrowUpRight size={13} />
                </a>
                <div className="rounded-xl border border-[rgba(40,61,59,0.2)] bg-white/[0.03] px-4 py-2.5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-subtle">Projects</p>
                  <p className="mt-0.5 font-display text-xl font-semibold acc-text">{String(projects.length).padStart(2, "0")}</p>
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* controls + grid */}
      <section className="section-band relative border-y border-[rgba(40,61,59,0.14)] py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  className={cn("inline-flex items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition-all",
                    filter === f
                      ? "border-[var(--acc-line)] acc-wash acc-text"
                      : "border-white/12 bg-white/[0.02] text-muted hover:border-white/25 hover:text-paper")}>
                  {f}
                  <span className={cn("text-[9px]", filter === f ? "opacity-80" : "text-subtle")}>{String(counts[f]).padStart(2, "0")}</span>
                </button>
              ))}
            </div>

            <label className="flex w-full items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2.5 lg:w-72">
              <Search size={14} className="text-subtle" />
              <input value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects or tools…"
                className="w-full bg-transparent text-[12.5px] text-paper placeholder:text-subtle outline-none" />
            </label>
          </div>

          <div className="mt-4 flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.16em] text-subtle">
            <span>{visible.length} project{visible.length === 1 ? "" : "s"}{filter !== "All" && ` · ${filter}`}</span>
            <span>Search by project or technology</span>
          </div>

          <motion.div layout className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((p, i) => (
                <motion.div key={p.id} layout
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                  <ProjectTile p={p} i={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {visible.length === 0 && (
            <div className="mt-10 rounded-2xl border border-[rgba(40,61,59,0.2)] bg-white/[0.03] p-10 text-center">
              <p className="text-[13.5px] text-muted">
                No projects match <span className="text-paper">“{query}”</span>{filter !== "All" && <> in <span className="text-paper">{filter}</span></>}.
              </p>
              <button onClick={() => { setQuery(""); setFilter("All"); }} className="btn-ghost mt-4 rounded-full px-5 py-2.5 text-[12.5px] font-semibold">
                Reset filters
              </button>
            </div>
          )}

          {/* stacks used */}
          <div className="mt-12 rounded-2xl border border-[rgba(40,61,59,0.2)] bg-white/[0.025] p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-subtle">Across all projects</p>
                <h2 className="mt-1.5 font-display text-[17px] font-semibold text-paper">Stack used in delivery</h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {topDevOps.map((t) => (
                  <span key={t.name} title={t.name}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-[rgba(40,61,59,0.2)] bg-white/[0.04] transition-all hover:-translate-y-0.5 hover:border-[var(--acc-line)]">
                    <BrandLogo slug={t.slug} className="h-4 w-4" />
                  </span>
                ))}
                <span className="tag-olive grid h-9 place-items-center rounded-lg px-2.5 font-mono text-[9px] uppercase tracking-[0.1em]">
                  + more
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[rgba(40,61,59,0.18)] bg-white/[0.03] p-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-display text-[16px] font-semibold text-paper">Want the implementation details?</h3>
              <p className="mt-1.5 max-w-md text-[12.5px] leading-relaxed text-muted">
                Happy to walk through any pipeline, monitoring stack or model evaluation end-to-end.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                window.location.hash = "#/";
                window.setTimeout(() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth", block: "start" }), 220);
              }}
              className="btn-acc inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-[12.5px] font-semibold"
            >
              View experience <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
