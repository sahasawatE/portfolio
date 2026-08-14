import { useRef, type CSSProperties } from "react";
import { useLenis } from "lenis/react";
import { prefersReducedMotion } from "@/lib/liquidGlass";
import type { WeatherTheme } from "@/lib/weather";

type PageOrbsProps = {
  theme: WeatherTheme;
};

export function PageOrbs({ theme }: PageOrbsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLenis((lenis) => {
    const node = ref.current;
    if (!node) return;
    const scroll = prefersReducedMotion() ? 0 : lenis.scroll;
    node.style.setProperty("--scroll", String(scroll));
  });

  const orbStyle = {
    "--orb-1": theme.orbs[0],
    "--orb-2": theme.orbs[1],
    "--orb-3": theme.orbs[2],
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className="page-orbs print:hidden"
      aria-hidden="true"
      style={orbStyle}
    >
      <span />
      <span />
      <span />
    </div>
  );
}
