import { useEffect, useMemo, type CSSProperties } from "react";
import { publicUrl } from "@/lib/assets";
import { useLiteMode } from "@/lib/perf";
import type { WeatherTheme } from "@/lib/weather";

const CLOUD_SOLO = {
  src: publicUrl("/media/weather-clouds1.png"),
  width: 1260,
  height: 605,
} as const;

const CLOUD_BANK = {
  src: publicUrl("/media/weather-clouds2.png"),
  width: 1883,
  height: 538,
} as const;

type WeatherAtmosphereProps = {
  theme: WeatherTheme;
};

function seeded(i: number, salt: number): number {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function WeatherAtmosphere({ theme }: WeatherAtmosphereProps) {
  const lite = useLiteMode();
  const { kind, isDay, particle } = theme;

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      root.classList.toggle("weather-paused", document.hidden);
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => {
      document.removeEventListener("visibilitychange", sync);
      root.classList.remove("weather-paused");
    };
  }, []);

  const drops = useMemo(() => {
    if (lite) return [];
    const count = kind === "drizzle" ? 16 : kind === "rain" || kind === "thunder" ? 20 : 0;
    return Array.from({ length: count }, (_, i) => ({
      left: `${seeded(i, 1) * 100}%`,
      delay: `${seeded(i, 2) * 1.4}s`,
      duration: `${0.55 + seeded(i, 3) * 0.7}s`,
      height: `${10 + seeded(i, 4) * 16}px`,
      opacity: 0.25 + seeded(i, 5) * 0.45,
    }));
  }, [kind, lite]);

  const flakes = useMemo(() => {
    if (lite || kind !== "snow") return [];
    return Array.from({ length: 16 }, (_, i) => ({
      left: `${seeded(i, 6) * 100}%`,
      delay: `${seeded(i, 7) * 5}s`,
      duration: `${4.5 + seeded(i, 8) * 5}s`,
      size: `${3 + seeded(i, 9) * 5}px`,
      drift: `${(seeded(i, 10) - 0.5) * 40}px`,
      opacity: 0.35 + seeded(i, 11) * 0.5,
    }));
  }, [kind, lite]);

  const stars = useMemo(() => {
    if (lite || kind !== "clear" || isDay) return [];
    return Array.from({ length: 16 }, (_, i) => ({
      left: `${seeded(i, 12) * 100}%`,
      top: `${seeded(i, 13) * 70}%`,
      delay: `${seeded(i, 14) * 4}s`,
      size: `${1 + seeded(i, 15) * 2}px`,
      opacity: 0.35 + seeded(i, 16) * 0.55,
    }));
  }, [kind, isDay, lite]);

  const clouds = useMemo(() => {
    if (lite || (kind !== "cloudy" && kind !== "thunder")) return [];
    const day = isDay ? 0.88 : 0.36;
    const daySoft = isDay ? 0.7 : 0.28;
    return [
      {
        ...CLOUD_SOLO,
        bank: false,
        left: "-8%",
        top: "4%",
        scale: 0.92,
        opacity: day,
        delay: "-12s",
        duration: "46s",
        drift: "52px",
        flip: false,
      },
      {
        ...CLOUD_SOLO,
        bank: false,
        left: "48%",
        top: "38%",
        scale: 0.72,
        opacity: daySoft,
        delay: "-28s",
        duration: "54s",
        drift: "40px",
        flip: true,
      },
      {
        ...CLOUD_BANK,
        bank: true,
        left: "22%",
        top: "14%",
        scale: 1.08,
        opacity: daySoft,
        delay: "-8s",
        duration: "58s",
        drift: "64px",
        flip: false,
      },
      {
        ...CLOUD_BANK,
        bank: true,
        left: "-18%",
        top: "28%",
        scale: 0.95,
        opacity: isDay ? 0.62 : 0.24,
        delay: "-36s",
        duration: "72s",
        drift: "48px",
        flip: true,
      },
    ];
  }, [kind, isDay, lite]);

  return (
    <div
      className="weather-atmosphere print:hidden"
      data-kind={kind}
      data-day={isDay ? "1" : "0"}
      aria-hidden="true"
    >
      <div className="weather-wash" />

      {!lite && kind === "clear" && isDay ? (
        <div className="weather-sun" style={{ color: particle }} />
      ) : null}

      {stars.length > 0 ? (
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

      {clouds.length > 0 ? (
        <div className="weather-clouds">
          {clouds.map((c, i) => {
            const style = {
              left: c.left,
              top: c.top,
              opacity: c.opacity,
              animationDelay: c.delay,
              animationDuration: c.duration,
              "--scale": String(c.scale),
              "--drift": c.drift,
              "--flip": c.flip ? "-1" : "1",
            } as CSSProperties;
            return (
              <img
                key={i}
                className={c.bank ? "weather-cloud is-bank" : "weather-cloud"}
                src={c.src}
                alt=""
                width={c.width}
                height={c.height}
                decoding="async"
                draggable={false}
                style={style}
              />
            );
          })}
        </div>
      ) : null}

      {!lite && kind === "fog" ? <div className="weather-haze is-fog" /> : null}

      {drops.length > 0 ? (
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

      {!lite && kind === "thunder" ? (
        <>
          <div className="weather-flash" />
          <svg
            className="weather-bolt"
            viewBox="0 0 48 180"
            style={{ left: "22%", top: "8%", width: "4.5rem" }}
          >
            <polyline
              points="26,0 18,46 32,52 12,104 24,110 8,180"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinejoin="miter"
              strokeLinecap="round"
            />
            <polyline
              points="26,0 18,46 32,52 12,104"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              opacity="0.32"
            />
          </svg>
          <svg
            className="weather-bolt"
            viewBox="0 0 48 180"
            style={{ left: "68%", top: "4%", width: "3.4rem" }}
          >
            <polyline
              points="20,0 28,40 14,48 30,96 16,104 34,180"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinejoin="miter"
              strokeLinecap="round"
            />
            <polyline
              points="20,0 28,40 14,48 30,96"
              fill="none"
              stroke="currentColor"
              strokeWidth="4.6"
              opacity="0.3"
            />
          </svg>
        </>
      ) : null}

      {flakes.length > 0 ? (
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
