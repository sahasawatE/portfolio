import type { ReactNode } from "react";
import { FadeIn } from "./FadeIn";
import { GlassSurface } from "./GlassSurface";

type SectionCardProps = {
  children: ReactNode;
};

export function SectionCard({ children }: SectionCardProps) {
  return (
    <FadeIn>
      <GlassSurface className="glass-panel overflow-hidden rounded-ios">
        {children}
      </GlassSurface>
    </FadeIn>
  );
}
