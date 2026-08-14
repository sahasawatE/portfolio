import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { useLiteMode } from "@/lib/perf";
import "lenis/dist/lenis.css";

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lite = useLiteMode();

  if (lite) return children;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.18,
        duration: 0.8,
        smoothWheel: true,
        anchors: true,
        prevent: (node) => node.closest("[data-lenis-prevent]") != null,
      }}
    >
      {children}
    </ReactLenis>
  );
}
