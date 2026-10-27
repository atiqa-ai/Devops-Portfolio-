import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import BrandLogo from "./BrandLogo";
import type { Skill } from "../data/resume";
import { cn } from "../utils/cn";

/* ---------------- section label ---------------- */
export function SectionLabel({ index, label, accent = "cyan", className }: { index: string; label: string; accent?: "cyan" | "pink"; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#590d22]", className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", accent === "cyan" ? "bg-[#a4133c]" : "bg-[#590d22]")} />
      <span className={cn("sec-index", accent === "cyan" ? "text-[#a4133c]" : "text-[#590d22]")}>{index}</span>
      <span className="sec-divider text-[#590d22]/30">/</span>
      <span>{label}</span>
    </div>
  );
}

/* ---------------- section heading ---------------- */
export function SectionHeading({ index, label, title, copy, accent = "cyan", action, className }: {
  index: string; label: string; title: ReactNode; copy?: string; accent?: "cyan" | "pink"; action?: ReactNode; className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        <SectionLabel index={index} label={label} accent={accent} className="mb-5" />
        <h2 className="sec-title font-display text-[clamp(1.9rem,4.6vw,3.2rem)] font-semibold leading-[1.04] tracking-tight text-paper">{title}</h2>
        {copy && <p className="sec-copy mt-4 max-w-xl text-[13.5px] leading-relaxed text-muted md:text-[14.5px]">{copy}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* ---------------- skill mark with graceful fallback ---------------- */
export function SkillMark({ skill, className }: { skill: Skill; className?: string }) {
  if (skill.slug) return <BrandLogo slug={skill.slug} className={className} />;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
      strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 3.2 20.2 8v8L12 20.8 3.8 16V8L12 3.2Z" />
      <path d="M12 8.4 15.6 10.5v4.2L12 16.8 8.4 14.7v-4.2L12 8.4Z" />
    </svg>
  );
}

/* ---------------- reveal wrapper ---------------- */
export function Reveal({ children, className, delay = 0, y = 24 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: reduce ? 0.2 : 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
