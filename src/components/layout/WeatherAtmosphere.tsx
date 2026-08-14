import { useMemo, type CSSProperties } from "react";
import { prefersReducedMotion } from "@/lib/liquidGlass";
import type { WeatherTheme } from "@/lib/weather";

type WeatherAtmosphereProps = {
  theme: WeatherTheme;
};

function seeded(i: number, salt: number): number {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function WeatherAtmosphere({ theme }: WeatherAtmosphereProps) {
  const reduced = prefersReducedMotion();
  const { kind, isDay, particle } = theme;

  const drops = useMemo(() => {
    const count = kind === "drizzle" ? 28 : kind === "rain" || kind === "thunder" ? 42 : 0;
    return Array.from({ length: count }, (_, i) => ({
      left: `${seeded(i, 1) * 100}%`,
      delay: `${seeded(i, 2) * 1.4}s`,
      duration: `${0.55 + seeded(i, 3) * 0.7}s`,
      height: `${10 + seeded(i, 4) * 16}px`,
      opacity: 0.25 + seeded(i, 5) * 0.45,
    }));
  }, [kind]);

  const flakes = useMemo(() => {
    if (kind !== "snow") return [];
    return Array.from({ length: 36 }, (_, i) => ({
      left: `${seeded(i, 6) * 100}%`,
      delay: `${seeded(i, 7) * 5}s`,
      duration: `${4.5 + seeded(i, 8) * 5}s`,
      size: `${3 + seeded(i, 9) * 5}px`,
      drift: `${(seeded(i, 10) - 0.5) * 40}px`,
      opacity: 0.35 + seeded(i, 11) * 0.5,
    }));
  }, [kind]);

  const stars = useMemo(() => {
    if (kind !== "clear" || isDay) return [];
    return Array.from({ length: 48 }, (_, i) => ({
      left: `${seeded(i, 12) * 100}%`,
      top: `${seeded(i, 13) * 70}%`,
      delay: `${seeded(i, 14) * 4}s`,
      size: `${1 + seeded(i, 15) * 2}px`,
      opacity: 0.35 + seeded(i, 16) * 0.55,
    }));
  }, [kind, isDay]);

  return (
    <div
      className="weather-atmosphere print:hidden"
      data-kind={kind}
      data-day={isDay ? "1" : "0"}
      aria-hidden="true"
    >
      <div className="weather-wash" />

      {!reduced && kind === "clear" && isDay ? (
        <div className="weather-sun" style={{ color: particle }} />
      ) : null}

      {!reduced && stars.length > 0 ? (
        <div className="weather-stars">
          {stars.map((s, i) => (
            <span
              key={i}
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                opacity: s.opacity,
                animationDelay: s.delay,
                background: particle,
              }}
            />
          ))}
        </div>
      ) : null}

      {!reduced && (kind === "cloudy" || kind === "fog") ? (
        <div className={`weather-haze${kind === "fog" ? " is-fog" : ""}`} />
      ) : null}

      {!reduced && drops.length > 0 ? (
        <div className="weather-rain">
          {drops.map((d, i) => (
            <span
              key={i}
              style={{
                left: d.left,
                height: d.height,
                opacity: d.opacity,
                animationDelay: d.delay,
                animationDuration: d.duration,
                background: `linear-gradient(to bottom, transparent, ${particle})`,
              }}
            />
          ))}
        </div>
      ) : null}

      {!reduced && kind === "thunder" ? <div className="weather-flash" /> : null}

      {!reduced && flakes.length > 0 ? (
        <div className="weather-snow">
          {flakes.map((f, i) => {
            const style = {
              left: f.left,
              width: f.size,
              height: f.size,
              opacity: f.opacity,
              animationDelay: f.delay,
              animationDuration: f.duration,
              background: particle,
              "--drift": f.drift,
            } as CSSProperties;
            return <span key={i} style={style} />;
          })}
        </div>
      ) : null}
    </div>
  );
}
