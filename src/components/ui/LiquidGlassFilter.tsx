import type { LiquidGlassMaps } from "@/lib/liquidGlass";

export type LiquidGlassFilterProps = {
  id: string;
  maps: LiquidGlassMaps;
  blur: number;
  specularOpacity: number;
  specularSaturation: number;
  refraction: number;
  progressiveBlur: number;
};

export function LiquidGlassFilter({
  id,
  maps,
  blur,
  specularOpacity,
  specularSaturation,
  refraction,
  progressiveBlur,
}: LiquidGlassFilterProps) {
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
