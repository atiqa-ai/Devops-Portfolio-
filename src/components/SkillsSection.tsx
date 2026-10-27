import { useCallback, useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, Cloud, Code2, GitBranch, Infinity as InfinityIcon, Network, ShieldCheck, X,
} from "lucide-react";
import { SectionHeading } from "./ui";
import BrandLogo from "./BrandLogo";
import { fieldSkillCount, skillFields } from "../data/skillFields";
import { cn } from "../utils/cn";

const FIELD_ICONS: Record<string, ReactNode> = {
  cloud: <Cloud size={18} />,
  delivery: <GitBranch size={18} />,
  reliability: <ShieldCheck size={18} />,
  networking: <Network size={18} />,
  engineering: <Code2 size={18} />,
};

type Panel = { kind: "field"; id: string } | null;

/** Card shell used by the field skill cards. */
function PentagonFrame({
  children,
  onClose,
  closeLabel,
  className,
}: {
  children: ReactNode;
  onClose: () => void;
  closeLabel: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "skill-card-frame rounded-2xl p-px transition-all duration-300",
        className,
      )}
    >
      <div className="skill-card dark-panel relative overflow-hidden rounded-2xl px-4 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(120deg,rgba(89,13,34,0.5)_0%,rgba(89,13,34,0.2)_45%,rgba(40,61,59,0.45)_100%)]" />
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="skill-card-close absolute right-2.5 top-2.5 z-20 grid h-7 w-7 place-items-center rounded-full sm:h-8 sm:w-8"
        >
          <X size={12} />
        </button>
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const [panel, setPanel] = useState<Panel>(null);
  const [wide, setWide] = useState(false);
  const reduce = useReducedMotion();

  const activeField = panel?.kind === "field" ? skillFields.find((f) => f.id === panel.id) ?? null : null;
  const activeIndex = activeField ? skillFields.indexOf(activeField) : -1;
  const isOpen = panel !== null;

  const close = useCallback(() => setPanel(null), []);

  const step = useCallback(
    (dir: -1 | 1) => {
      if (!activeField) return;
      const next = (activeIndex + dir + skillFields.length) % skillFields.length;
      setPanel({ kind: "field", id: skillFields[next].id });
    },
    [activeField, activeIndex],
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (panel?.kind === "field" && event.key === "ArrowRight") step(1);
      if (panel?.kind === "field" && event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, step, panel]);

  const selectField = (id: string) =>
    setPanel((current) =>
      current?.kind === "field" && current.id === id ? null : { kind: "field", id },
    );

  /* ---------------- orbital cluster ---------------- */
  const orbitCluster = (
    <div
      className={cn(
        "orbit-stage relative mx-auto aspect-square w-full max-w-[26rem] sm:max-w-[31rem] lg:max-w-[34rem]",
      )}
    >
      <div className="soft-glow pointer-events-none absolute inset-[12%] rounded-full blur-2xl" />
      <div className="pointer-events-none absolute inset-[3%] rounded-full border border-white/[0.06]" />
      <div className="pointer-events-none absolute inset-[19%] rounded-full border border-[rgba(164,19,60,0.28)]" />
      <div className="pointer-events-none absolute inset-[32%] rounded-full border border-[rgba(233,245,219,0.2)]" />

      {/* static field arrangement */}
      <div className="pointer-events-none absolute inset-0">
        {skillFields.map((field, i) => {
          const angle = (i / skillFields.length) * Math.PI * 2 - Math.PI / 2;
          const radius = 34;
          const left = 50 + Math.cos(angle) * radius;
          const top = 50 + Math.sin(angle) * radius;
          const selected = panel?.kind === "field" && panel.id === field.id;

          return (
            <div
              key={field.id}
              className="absolute"
              style={{ left: `${left}%`, top: `${top}%`, transform: "translate(-50%, -50%)" }}
            >
              <div className="pointer-events-auto">
                <button
                  type="button"
                  onClick={() => selectField(field.id)}
                  aria-pressed={selected}
                  aria-controls="skill-field-panel"
                  aria-label={`${field.title} — ${selected ? "close" : "show"} skills`}
                  className={cn(
                    "penta-trigger group relative block h-[6.4rem] w-[6.8rem] transition-transform duration-300 focus-visible:outline-none sm:h-[7.5rem] sm:w-[8rem] lg:h-[8.4rem] lg:w-[8.9rem]",
                    selected ? "penta-glow scale-[1.05]" : "penta-glow penta-glow-hover hover:scale-[1.06]",
                  )}
                >
                  {/* edge */}
                  <span className={cn("absolute inset-0 penta-tile", selected ? "penta-wine-edge" : "penta-teal-edge")} />

                  {/* default palette ramp */}
                  {!selected && (
                    <>
                      <span className="penta-default absolute inset-[2px] penta-tile penta-teal" />
                      <span className="penta-hover absolute inset-[2px] penta-tile penta-wine" />
                    </>
                  )}

                  {/* selected fill */}
                  {selected && <span className="absolute inset-[2px] penta-tile penta-wine" />}
                  <span className="relative z-10 flex h-full flex-col items-center justify-center gap-0.5 px-2 text-center">
                    <span aria-hidden className="penta-scrim absolute inset-x-[12%] inset-y-[27%] -z-10 rounded-full blur-[7px]" />
                    <span
                      className={cn(
                        "grid h-6 w-6 place-items-center rounded-full bg-[#e9f5db] text-[#590d22] shadow-[0_2px_8px_rgba(89,13,34,0.3)] transition-colors duration-300 sm:h-8 sm:w-8",
                      )}
                    >
                      {FIELD_ICONS[field.id]}
                    </span>
                    <span
                      className={cn(
                        "penta-label mt-1 text-[9px] font-bold leading-[1.2] transition-colors duration-300 sm:text-[11px]",
                      )}
                    >
                      {field.title}
                    </span>
                    <span
                      className={cn(
                        "penta-count mt-0.5 hidden font-mono text-[8.5px] font-semibold uppercase tracking-[0.08em] transition-colors duration-300 sm:block",
                      )}
                    >
                      {field.skills.length} skills
                    </span>
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* centre hub — static identity mark for the practice */}
      <div
        aria-hidden
        className="dark-panel pointer-events-none absolute left-1/2 top-1/2 z-20 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#89b0ae]/55 sm:h-32 sm:w-32 bg-[rgba(40,61,59,0.72)] backdrop-blur-md shadow-[0_0_60px_-16px_rgba(89,13,34,0.9)] sm:h-28 sm:w-28"
      >
        <span className="flex flex-col items-center text-center">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[rgba(233,245,219,0.14)] text-[#e9f5db] sm:h-9 sm:w-9">
            <InfinityIcon size={22} />
          </span>
          <span className="mt-1 font-display text-[10px] font-bold leading-tight text-paper sm:text-[12.5px]">
            Cloud &amp; DevOps
          </span>
          <span className="mt-0.5 font-mono text-[7.5px] uppercase tracking-[0.1em] text-subtle sm:text-[9px]">
            {fieldSkillCount} tools
          </span>
        </span>
      </div>
    </div>
  );

  return (
    <section id="skills" className="section-skills relative scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="01"
          label="Skills"
          title={<>Skills &amp; <span className="text-grad">capabilities.</span></>}
          copy="Five connected fields around one practice. Select a field pentagon to open its skills beside the diagram; close the card and the structure returns to the centre."
          action={
            <div className="rounded-xl border border-[rgba(40,61,59,0.2)] bg-white/[0.03] px-4 py-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-subtle">Total coverage</p>
              <p className="mt-1 text-[13.5px] font-semibold text-paper">{fieldSkillCount} tools</p>
              <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-subtle">
                {skillFields.length} connected fields
              </p>
            </div>
          }
        />

        {/* ---- open: cluster + card side by side · closed: cluster centred ---- */}
        <div
          className={cn(
            "mt-10 grid items-center gap-8",
            isOpen
              ? "justify-items-center lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:gap-10"
              : "justify-items-center",
          )}
        >
          <div className={cn("w-full", isOpen ? "" : "flex justify-center")}>
            {isOpen ? (
              <div className="rounded-2xl border border-[rgba(40,61,59,0.16)] bg-white/[0.015] p-3 sm:p-5">{orbitCluster}</div>
            ) : (
              orbitCluster
            )}
          </div>

          {/* ---------------- side card ---------------- */}
          <div
            className={cn(
              "relative w-full min-w-0",
              isOpen ? "mx-auto max-w-[27rem] justify-self-center sm:max-w-[30rem] lg:mx-0 lg:max-w-[29rem] lg:justify-self-end xl:max-w-[32rem]" : "max-w-[22rem]",
            )}
            id="skill-field-panel"
            aria-live="polite"
          >
            {isOpen && wide && (
              <span aria-hidden className="absolute top-1/2 -left-10 hidden h-px w-10 items-center bg-[rgba(233,245,219,0.5)] lg:flex">
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#e9f5db]" />
              </span>
            )}

            {panel?.kind === "field" && activeField && (
              <motion.div
                key={activeField.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <PentagonFrame onClose={close} closeLabel="Close skills card">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="skill-card-badge inline-flex items-center gap-1 rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em]">
                      Field {activeField.index}
                    </span>
                    <span className="skill-card-badge inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em]">
                      {activeField.skills.length} skills
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-center font-display text-[17px] font-bold leading-tight text-[#f7fdf4] sm:text-[21px]">
                    {activeField.title}
                  </h3>
                  <p className="mx-auto mt-1.5 max-w-[24rem] text-center text-[11.5px] leading-relaxed text-[#dfece4] sm:text-[12.5px]">
                    {activeField.blurb}
                  </p>

                  <ul className="mx-auto mt-4 grid max-h-[19rem] auto-rows-min grid-cols-2 gap-2 overflow-y-auto pr-1 sm:max-h-[21rem] sm:gap-2.5">
                    {activeField.skills.map((skill, i) => (
                      <motion.li
                        key={skill.name}
                        initial={reduce ? undefined : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.24, delay: reduce ? 0 : 0.03 + i * 0.025, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={reduce ? undefined : { y: -2, scale: 1.02 }}
                        className="skill-chip group flex min-h-[2.9rem] items-center gap-2 rounded-lg px-2.5 py-2 sm:min-h-[3.1rem] sm:px-3"
                      >
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-[rgba(137,176,174,0.3)] bg-[rgba(40,61,59,0.65)] sm:h-8 sm:w-8">
                          <BrandLogo slug={skill.slug} className="skill-chip-logo h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                        </span>
                        <span className="skill-chip-name min-w-0 text-[12px] leading-snug sm:text-[13px]">
                          {skill.name}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-3.5 flex items-center justify-between gap-3 border-t border-[rgba(233,245,219,0.18)] pt-3.5">
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[#cfe0d8]">
                      {activeIndex + 1} / {skillFields.length} fields
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button type="button" onClick={() => step(-1)} aria-label="Previous field"
                        className="skill-card-nav grid h-8 w-8 place-items-center rounded-full">
                        <ArrowRight size={13} className="rotate-180" />
                      </button>
                      <button type="button" onClick={() => step(1)} aria-label="Next field"
                        className="skill-card-nav grid h-8 w-8 place-items-center rounded-full">
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </PentagonFrame>
              </motion.div>
            )}

            {!isOpen && (
              <p className="mt-6 text-center font-mono text-[8.5px] uppercase tracking-[0.14em] text-subtle">
                Select a field to open its skills · close the card to recentre
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
