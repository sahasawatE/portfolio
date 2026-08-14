import { useRef } from "react";
import { useLenis } from "lenis/react";
import { prefersReducedMotion } from "@/lib/liquidGlass";

export function PageOrbs() {
  const ref = useRef<HTMLDivElement>(null);

  useLenis((lenis) => {
    const node = ref.current;
    if (!node) return;
    const scroll = prefersReducedMotion() ? 0 : lenis.scroll;
    node.style.setProperty("--scroll", String(scroll));
  });

  return (
    <div ref={ref} className="page-orbs print:hidden" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}
