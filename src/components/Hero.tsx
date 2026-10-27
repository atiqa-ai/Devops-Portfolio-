import { Fragment } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { profile, summary } from "../data/resume";
import BrandLogo from "./BrandLogo";

/**
 * Hero: split layout with the "AM" monogram and orbiting brand marks,
 * rendered through the shared portfolio palette tokens.
 */
/** Orbit marks — all tinted with the deep-wine ramp (#590D22) in light and dark shades. */
const WINE_SHADES = ["#7a2440", "#590d22", "#9a4257", "#45101f", "#8a2b45", "#6b1a2f", "#a8556a", "#4e0d1e"];

const orbit = [
  "aws",
  "docker",
  "githubactions",
  "prometheus",
  "grafana",
  "nginx",
  "python",
  "scikitlearn",
].map((slug, i) => ({ slug, tint: WINE_SHADES[i % WINE_SHADES.length] }));

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="hero" className="section-shell relative scroll-mt-20 overflow-hidden pt-24 md:pt-28">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="tile-grid pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 md:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6 lg:pb-20">
        {/* ---------------- copy ---------------- */}
        <div className="relative z-10 order-2 space-y-6 lg:order-1">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-2">
            <span className="acc-bg inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
              <Sparkles size={11} /> {profile.title}
            </span>
            {profile.focus.map((f) => (
              <span key={f} className="hero-focus-chip rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em]">
                {f}
              </span>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-subtle">Hi, I'm</p>
            <h1 className="mt-2 font-display text-[clamp(2.75rem,8vw,5rem)] font-bold leading-[0.95] tracking-tight text-paper">
              Atiqa <span className="text-grad">Mushtaq</span>
            </h1>
            {/* Tagline: reveals left → right on page load */}
            <div className="relative mt-4 w-full max-w-xl">
              <motion.p
                initial={reduce ? { opacity: 0 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: reduce ? 0 : 0.3 }}
                className="tagline-wipe relative inline-block font-display text-[clamp(1.05rem,2.3vw,1.45rem)] font-semibold leading-snug acc-text"
              >
                {"I engineer reliable, automated cloud infrastructure.".split(" ").map((word, i, all) => (
                  <Fragment key={`${word}-${i}`}>
                    <motion.span
                      initial={reduce ? undefined : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: reduce ? 0 : 0.42,
                        delay: reduce ? 0 : 0.42 + i * 0.085,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                    {i < all.length - 1 ? " " : null}
                  </Fragment>
                ))}
              </motion.p>

              {/* accent rule draws in behind the line */}
              <motion.span
                aria-hidden
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  duration: reduce ? 0.2 : 1,
                  delay: reduce ? 0 : 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-2 block h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-[#590d22] via-[#a4133c] to-transparent"
              />
            </div>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.16 }}
            className="max-w-xl text-[14.5px] leading-relaxed text-muted md:text-[15.5px]">
            {summary}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.24 }}
            className="flex flex-wrap items-center gap-2.5">
            <a href={`mailto:${profile.email}`}
              className="hero-chip inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[12.5px] transition-colors hover:border-[var(--acc-line)]">
              <Mail size={13} className="acc-text" /> {profile.email}
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 }}
            className="flex flex-wrap gap-3 pt-1">
            <Link to="/projects" className="btn-acc inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold">
              Explore projects <ArrowRight size={15} />
            </Link>
            <button
              type="button"
              onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold"
            >
              Experience
            </button>
            <a href={profile.github} target="_blank" rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold">
              GitHub
            </a>
          </motion.div>
        </div>

        {/* ---------------- orbiting stack (equal spacing) ---------------- */}
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 flex items-center justify-center lg:order-2">
          <div className="orbit-stage relative grid aspect-square w-full max-w-[21rem] place-items-center sm:max-w-[25rem] lg:max-w-[27rem]">
            <div className="soft-glow absolute inset-[8%] rounded-full blur-2xl" />

            {/* orbit guide rings */}
            <div className="pointer-events-none absolute inset-0 rounded-full border border-white/[0.06]" />
            <div className="pointer-events-none absolute inset-[13%] rounded-full border border-[rgba(164,19,60,0.28)]" />
            <div className="pointer-events-none absolute inset-[27%] rounded-full border border-[rgba(233,245,219,0.22)]" />

            {/* rotating ring — every mark sits at the same radius, 45° apart */}
            <div className="orbit-ring pointer-events-none absolute inset-0">
              {orbit.map((l, i) => {
                const angle = (i / orbit.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 41;
                const left = 50 + Math.cos(angle) * radius;
                const top = 50 + Math.sin(angle) * radius;
                return (
                  <div
                    key={l.slug}
                    className="absolute"
                    style={{ left: `${left}%`, top: `${top}%`, transform: "translate(-50%, -50%)" }}
                  >
                    <div className="orbit-item pointer-events-auto">
                      <div
                        className="grid h-10 w-10 place-items-center rounded-xl border border-[rgba(89,13,34,0.45)] bg-[linear-gradient(155deg,rgba(233,245,219,0.92)_0%,rgba(137,176,174,0.55)_58%,rgba(40,61,59,0.85)_100%)] shadow-[0_10px_24px_-14px_rgba(89,13,34,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(164,19,60,0.6)] hover:shadow-[0_14px_28px_-14px_rgba(164,19,60,0.75)] sm:h-12 sm:w-12"
                        title={l.slug}
                      >
                        <BrandLogo slug={l.slug} className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: l.tint }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* centre monogram */}
            <div className="dark-panel relative z-20 grid h-24 w-24 place-items-center rounded-3xl border border-[rgba(233,245,219,0.35)] bg-[#283d3b] bg-[linear-gradient(155deg,#283D3B_0%,#45635A_52%,#E9F5DB_100%)] shadow-[0_0_60px_-12px_rgba(40,61,59,0.9)] sm:h-32 sm:w-32">
              <div className="text-center">
                <span className="monogram-title block font-display text-3xl font-bold tracking-tight sm:text-4xl">AM</span>
                <span className="monogram-sub mt-1 block font-mono text-[8px] uppercase tracking-[0.22em] sm:text-[9px]">
                  cloud · devops
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
