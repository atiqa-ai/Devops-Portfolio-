import { getIcon } from "../data/brandIcons";
import { cn } from "../utils/cn";

type Props = {
  slug?: string;
  /** Optional explicit mark colour (used by the wine-tinted hero orbit). */
  color?: string;
  className?: string;
  style?: import("react").CSSProperties;
};

/**
 * Renders a real brand mark (Devicon / Simple Icons paths) as inline SVG.
 * Marks inherit the surrounding text colour, so they stay inside the palette.
 * When no official vector exists, a neutral monogram is shown instead of a wrong logo.
 */
export default function BrandLogo({ slug, color, className, style }: Props) {
  const icon = slug ? getIcon(slug) : null;

  if (!icon || !icon.svg) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden
        className={cn("h-5 w-5 shrink-0", className)}>
        <path d="M12 3.2 20.2 8v8L12 20.8 3.8 16V8L12 3.2Z" />
        <circle cx="12" cy="12" r="2.4" />
      </svg>
    );
  }

  return (
    <svg
      viewBox={icon.viewBox}
      role="img"
      aria-label={icon.title}
      className={cn("h-5 w-5 shrink-0", className)}
      style={color ? { ...style, color } : style}
      fill="currentColor"
      preserveAspectRatio="xMidYMid meet"
      dangerouslySetInnerHTML={{ __html: icon.svg }}
    />
  );
}
