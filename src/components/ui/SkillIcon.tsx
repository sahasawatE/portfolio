import type { ReactNode, SVGProps } from "react";
import {
  Brain,
  Checklist,
  Flag,
  Folder,
  Gear,
  Heart,
  LightBulb,
} from "react-ios-icons";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const glyphs: Record<string, ReactNode> = {
  Figma: (
    <>
      <path d="M8.5 2H12v7H8.5a3.5 3.5 0 1 1 0-7z" />
      <path d="M12 2h3.5A3.5 3.5 0 1 1 12 5.5V2z" />
      <path d="M12 9h3.5a3.5 3.5 0 1 1 0 7H12V9z" />
      <path d="M8.5 9H12v7H8.5a3.5 3.5 0 1 1 0-7z" />
      <path d="M8.5 16H12v3.5A3.5 3.5 0 1 1 8.5 16z" />
    </>
  ),
  Git: (
    <>
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <circle cx="6" cy="18" r="2.2" />
      <path d="M6 8.2v7.6" />
      <path d="M8.2 18h5.3A4.5 4.5 0 0 0 18 13.5V8.2" />
    </>
  ),
  "React.js": (
    <>
      <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
    </>
  ),
  "Next.js": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 16V8l8 8V8" />
    </>
  ),
  "Vue.js": (
    <>
      <path d="M3 5h5.5L12 11.5 15.5 5H21L12 21z" />
      <path d="M8.5 5L12 11.5 15.5 5" />
    </>
  ),
  "Nuxt.js": (
    <>
      <path d="M2 18h20L13.5 5.5 10 11 7.5 7.5z" />
      <path d="M10 11l3.5-5.5" />
    </>
  ),
  JavaScript: (
    <>
      <path d="M8 4c-2.2 1-3.2 2.6-3.2 8s1 7 3.2 8" />
      <path d="M16 4c2.2 1 3.2 2.6 3.2 8s-1 7-3.2 8" />
    </>
  ),
  TypeScript: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M8.5 13.5h7M12 13.5V18" />
    </>
  ),
  Flutter: (
    <>
      <path d="M6 12l8-8 4 4-6 6z" />
      <path d="M12 14l4 4-4 4-2-2" />
      <path d="M14 16l-4-4" />
    </>
  ),
  Playwright: (
    <>
      <rect x="3" y="4.5" width="12" height="10" rx="1.6" />
      <rect x="9" y="9.5" width="12" height="10" rx="1.6" />
    </>
  ),
  Cypress: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.6 2.6L16.5 9" />
    </>
  ),
  SQL: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="1.6" />
      <path d="M3.5 10h17M3.5 15h17M10 5v14" />
    </>
  ),
  Dart: (
    <>
      <path d="M12 3l8 8-8 10L4 11z" />
      <path d="M12 3v18" />
    </>
  ),
  Vitest: (
    <>
      <path d="M9 3h6" />
      <path d="M10 3v5.5L5.6 18.2A2.2 2.2 0 0 0 7.5 21.5h9a2.2 2.2 0 0 0 1.9-3.3L14 8.5V3" />
    </>
  ),
  TurboRepo: (
    <>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
      <path d="M13 8.5l-4 5h3.2L11 17.5l4-5h-3.2z" />
    </>
  ),
};

const iosGlyphs: Record<string, (className?: string) => ReactNode> = {
  Creativity: (className) => (
    <LightBulb aria-hidden="true" className={className} />
  ),
  "Collaboration and Teamwork": (className) => (
    <Heart aria-hidden="true" className={className} />
  ),
  "Complex Decision Making": (className) => (
    <Brain aria-hidden="true" className={className} />
  ),
  Leadership: (className) => <Flag aria-hidden="true" className={className} />,
  "Time Management": (className) => (
    <Checklist aria-hidden="true" className={className} />
  ),
  "Create and Design database": (className) => (
    <Folder aria-hidden="true" className={className} />
  ),
  "Object Oriented Program": (className) => (
    <Gear aria-hidden="true" className={className} />
  ),
};

type SkillIconProps = SVGProps<SVGSVGElement> & {
  name: string;
};

export function SkillIcon({ name, className, ...props }: SkillIconProps) {
  const iosGlyph = iosGlyphs[name];
  if (iosGlyph) return iosGlyph(className);

  const glyph = glyphs[name];
  if (!glyph) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...stroke}
      {...props}
    >
      {glyph}
    </svg>
  );
}
