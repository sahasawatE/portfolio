import {
  useEffect,
  useId,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  getLiquidGlassMaps,
  isChromiumSvgBackdropSupported,
  prefersReducedMotion,
  type LiquidGlassMaps,
} from "@/lib/liquidGlass";

type GlassSurfaceProps = {
  children: ReactNode;
  className?: string;
  radius?: number | "auto";
  followPointer?: boolean;
  blur?: number;
  specularOpacity?: number;
  specularSaturation?: number;
  refraction?: number;
  progressiveBlur?: number;
};

function LiquidGlassFilter({
  id,
  maps,
  blur,
  specularOpacity,
  specularSaturation,
  refraction,
  progressiveBlur,
}: {
  id: string;
  maps: LiquidGlassMaps;
  blur: number;
  specularOpacity: number;
  specularSaturation: number;
  refraction: number;
  progressiveBlur: number;
}) {
  const useProgressive = progressiveBlur > 0;
  const heavyBlur = blur * (1 + 2 * progressiveBlur);

  return (
    <svg
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        position: "fixed",
        width: 0,
        height: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <filter
        id={id}
        x={0}
        y={0}
        width={maps.width}
        height={maps.height}
        filterUnits="userSpaceOnUse"
        primitiveUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feImage
          href={maps.displacement}
          xlinkHref={maps.displacement}
          preserveAspectRatio="none"
          x={0}
          y={0}
          width={maps.width}
          height={maps.height}
          result="displacement_map"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="displacement_map"
          scale={maps.scale * refraction}
          xChannelSelector="R"
          yChannelSelector="G"
          result="refracted"
        />
        <feGaussianBlur
          in="refracted"
          stdDeviation={blur}
          result={useProgressive ? "soft" : "blurred"}
        />
        <feImage
          href={maps.specular}
          xlinkHref={maps.specular}
          preserveAspectRatio="none"
          x={0}
          y={0}
          width={maps.width}
          height={maps.height}
          result="specular_raw"
        />
        {useProgressive ? (
          <>
            <feGaussianBlur
              in="refracted"
              stdDeviation={heavyBlur}
              result="heavy"
            />
            <feComposite
              in="heavy"
              in2="specular_raw"
              operator="in"
              result="edgeFrost"
            />
            <feBlend in="soft" in2="edgeFrost" mode="normal" result="blurred" />
          </>
        ) : null}
        <feColorMatrix
          in="refracted"
          type="saturate"
          values={String(specularSaturation)}
          result="saturated"
        />
        <feComposite
          in="saturated"
          in2="specular_raw"
          operator="in"
          result="rim_color"
        />
        <feColorMatrix
          in="rim_color"
          type="matrix"
          values={`1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 ${specularOpacity} 0`}
          result="specular"
        />
        <feBlend in="blurred" in2="specular" mode="screen" />
      </filter>
    </svg>
  );
}

export function GlassSurface({
  children,
  className,
  blur = 1,
  specularOpacity = 0.4,
  specularSaturation = 6,
  refraction = 1,
  progressiveBlur = 0,
}: GlassSurfaceProps) {
  const rawId = useId();
  const filterId = `lg-${rawId.replace(/:/g, "")}`;
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const [maps, setMaps] = useState<LiquidGlassMaps | null>(null);
  const [filterReady, setFilterReady] = useState(false);

  useEffect(() => {
    if (!node) return;
    if (!isChromiumSvgBackdropSupported()) return;

    let timer = 0;
    let generation = 0;
    let cancelled = false;

    const rebuild = () => {
      if (prefersReducedMotion()) {
        setMaps(null);
        return;
      }
      const gen = ++generation;
      const rect = node.getBoundingClientRect();
      const radius = Number.parseFloat(
        getComputedStyle(node).borderTopLeftRadius,
      );
      void getLiquidGlassMaps({
        width: rect.width,
        height: rect.height,
        radius: Number.isFinite(radius) ? radius : 0,
      }).then((next) => {
        if (!cancelled && gen === generation) setMaps(next);
      });
    };

    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(rebuild, 80);
    };

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    motion.addEventListener("change", rebuild);

    const observer = new ResizeObserver(schedule);
    observer.observe(node);
    rebuild();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      motion.removeEventListener("change", rebuild);
      observer.disconnect();
    };
  }, [node]);

  useEffect(() => {
    if (!maps) {
      setFilterReady(false);
      return;
    }
    const frame = requestAnimationFrame(() => setFilterReady(true));
    return () => cancelAnimationFrame(frame);
  }, [maps]);

  const active = maps != null && filterReady;
  const backdropStyle: CSSProperties | undefined = active
    ? {
        backdropFilter: `url(#${filterId})`,
        WebkitBackdropFilter: `url(#${filterId})`,
      }
    : undefined;

  return (
    <div ref={setNode} className={className}>
      <div aria-hidden className="glass-backdrop" style={backdropStyle} />
      {maps
        ? createPortal(
            <LiquidGlassFilter
              id={filterId}
              maps={maps}
              blur={blur}
              specularOpacity={specularOpacity}
              specularSaturation={specularSaturation}
              refraction={refraction}
              progressiveBlur={progressiveBlur}
            />,
            document.body,
          )
        : null}
      <div className="glass-content">{children}</div>
    </div>
  );
}
