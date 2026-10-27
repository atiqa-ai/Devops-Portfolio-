import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { getCertificate } from "../data/certificates";
import BrandLogo from "../components/BrandLogo";

/** Full-page certificate document — opened in its own tab from the portfolio. */
export default function CertificatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cert = getCertificate(id);

  useEffect(() => {
    const previous = document.title;
    document.title = `${cert.title} — Certificate | Atiqa Mushtaq`;
    return () => {
      document.title = previous;
    };
  }, [cert.title]);

  return (
    <div className="cert-shell min-h-screen px-3 py-4 md:px-6 md:py-6">
      {/* toolbar */}
      <div className="no-print mx-auto mb-5 flex max-w-[1120px] flex-col gap-3 rounded-2xl border border-[rgba(40,61,59,0.18)] bg-[rgba(255,253,247,0.95)] p-3 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#a4133c] text-[#e9f5db]">
            <BrandLogo slug={cert.slug} className="h-4 w-4" />
          </span>
          <div>
            <p className="font-display text-[13.5px] font-bold text-[#590d22]">{cert.title}</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#7a4450]">
              {cert.issuer} · {cert.completed}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(89,13,34,0.25)] px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#590d22] transition-colors hover:border-[#a4133c] hover:text-[#a4133c]"
          >
            <ArrowLeft size={12} /> Portfolio
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full bg-[#a4133c] px-4 py-2 text-[12px] font-semibold text-[#e9f5db] transition-colors hover:bg-[#590d22]"
          >
            <Download size={13} /> Save as PDF
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            aria-label="Print certificate"
            className="grid h-9 w-9 place-items-center rounded-full border border-[rgba(89,13,34,0.25)] text-[#590d22] transition-colors hover:border-[#a4133c] hover:text-[#a4133c]"
          >
            <Printer size={14} />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-[1120px] px-2 sm:px-4">
        <img
          src={cert.image}
          alt={`${cert.title} certificate awarded to Atiqa Mushtaq by ${cert.issuer}`}
          className="mx-auto block h-auto w-full rounded-lg bg-white shadow-[0_40px_90px_-42px_rgba(0,0,0,0.85)]"
        />
        <div className="no-print mt-4 flex flex-wrap items-center justify-center gap-2">
          <a
            href={cert.image}
            download={cert.fileName}
            className="inline-flex items-center gap-2 rounded-full bg-[#a4133c] px-5 py-2.5 text-[12px] font-semibold text-[#e9f5db] transition-colors hover:bg-[#590d22]"
          >
            <Download size={13} /> Download certificate
          </a>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(89,13,34,0.25)] px-5 py-2.5 text-[12px] font-semibold text-[#590d22] transition-colors hover:border-[#a4133c] hover:text-[#a4133c]"
          >
            <Printer size={13} /> Print
          </button>
        </div>
      </div>

      <p className="no-print mx-auto mt-4 max-w-[1120px] text-center font-mono text-[9px] uppercase tracking-[0.16em] text-[#590d22]/70">
        {cert.issuer} · {cert.credential} · awarded to Atiqa Mushtaq
      </p>

      <div className="no-print mx-auto mt-3 max-w-[1120px] text-center">
        <Link to="/" className="inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-[#590d22] hover:text-[#a4133c]">
          <ArrowLeft size={11} /> Back to portfolio
        </Link>
      </div>
    </div>
  );
}
