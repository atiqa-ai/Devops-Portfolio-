import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Download, Maximize2, Minimize2, Printer, X } from "lucide-react";
import type { Certificate } from "../data/certificates";
import { cn } from "../utils/cn";

/**
 * Certificate viewer card — the actual certificate image, shown in-page
 * (no new tab) at a professional reading size. The site header is hidden
 * while the viewer is open so nothing competes with the document.
 */
export default function CertificateModal({
  cert,
  onClose,
}: {
  cert: Certificate | null;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!cert) return;
    setZoomed(false);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.dataset.docOpen = "true";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      delete document.documentElement.dataset.docOpen;
    };
  }, [cert, onClose]);

  return (
    <>
      {cert && (
        <div
          className="cert-viewer fixed inset-0 z-[120] flex flex-col bg-[#101a19]/92 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-viewer-title"
        >
          {/* top bar — closes / downloads the document */}
          <div className="no-print flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
            <div className="min-w-0">
              <p className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-[#c2d8d2]">
                {cert.credential} · {cert.issuer} · {cert.completed}
              </p>
              <h2 id="certificate-viewer-title" className="mt-0.5 truncate font-display text-[14.5px] font-bold text-[#e9f5db]">
                {cert.title}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={cert.image}
                download={cert.fileName}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#a4133c] px-3.5 py-2 text-[11.5px] font-semibold text-[#e9f5db] transition-colors hover:bg-[#590d22]"
              >
                <Download size={12} /> Download certificate
              </a>
              <button
                type="button"
                onClick={() => window.print()}
                aria-label="Print certificate"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-[#e9f5db] transition-colors hover:border-[#a4133c] hover:bg-white/10"
              >
                <Printer size={14} />
              </button>
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                aria-label={zoomed ? "Fit certificate to screen" : "Zoom certificate"}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-[#e9f5db] transition-colors hover:border-[#a4133c] hover:bg-white/10"
              >
                {zoomed ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close certificate"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#e9f5db] transition-colors hover:border-[#a4133c] hover:bg-[#a4133c]"
              >
                <X size={13} /> Close
              </button>
            </div>
          </div>

          {/* document */}
          <div className="flex-1 overflow-auto p-3 sm:p-6">
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className={cn("mx-auto", zoomed ? "max-w-none" : "max-w-[1080px]")}
            >
              <img
                src={cert.image}
                alt={`${cert.title} certificate awarded to Atiqa Mushtaq by ${cert.issuer}`}
                className={cn(
                  "mx-auto block h-auto rounded-lg bg-white shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]",
                  zoomed ? "w-full" : "max-h-[calc(100vh-11rem)] w-auto max-w-full object-contain",
                )}
              />
            </motion.div>
          </div>

          {/* bottom note */}
          <div className="no-print flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-4 py-2.5 sm:px-6">
            <p className="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-[#c2d8d2]">
              <Check size={10} /> Awarded to Atiqa Mushtaq
            </p>
            <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-[#9dbab7]">
              {cert.slug === "python" ? "Certificate code 9205022 · " : ""}Esc to close
            </p>
          </div>
        </div>
      )}
    </>
  );
}
