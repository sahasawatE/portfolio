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

const THUNDER_TALL = {
  src: publicUrl("/media/weather-thunder1.png"),
  width: 650,
  height: 1137,
} as const;

const THUNDER_LEAN = {
  src: publicUrl("/media/weather-thunder2.png"),
  width: 650,
  height: 1137,
} as const;

const SUN = {
  src: publicUrl("/media/weather-sun.png"),
  width: 600,
  height: 600,
} as const;

const FOG_WIDE = {
  src: publicUrl("/media/weather-fog1.png"),
  width: 2000,
  height: 1747,
} as const;

const FOG_WISP = {
  src: publicUrl("/media/weather-fog2.png"),
  width: 1199,
  height: 378,
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
    const drizzle = kind === "drizzle";
    const raining = kind === "rain" || kind === "thunder";
    if (!drizzle && !raining) return [];
    const count = drizzle ? 42 : 26;
    return Array.from({ length: count }, (_, i) => ({
      left: `${seeded(i, 1) * 100}%`,
      delay: `${seeded(i, 2) * (drizzle ? 2.4 : 1.4)}s`,
      duration: drizzle
        ? `${1.6 + seeded(i, 3) * 1.4}s`
        : `${0.5 + seeded(i, 3) * 0.55}s`,
      height: drizzle
        ? `${4 + seeded(i, 4) * 6}px`
        : `${28 + seeded(i, 4) * 24}px`,
      opacity: drizzle
        ? 0.18 + seeded(i, 5) * 0.28
        : 0.35 + seeded(i, 5) * 0.45,
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

  const fogLayers = useMemo(() => {
    if (lite || kind !== "fog") return [];
    const dense = isDay ? 0.78 : 0.46;
    const mid = isDay ? 0.58 : 0.34;
    const soft = isDay ? 0.5 : 0.3;
    return [
      {
        ...FOG_WIDE,
        left: "-22%",
        top: "-12%",
        size: "min(118vw, 76rem)",
        opacity: dense,
        delay: "-10s",
        duration: "42s",
      },
      {
        ...FOG_WISP,
        left: "4%",
        top: "30%",
        size: "min(96vw, 58rem)",
        opacity: mid,
        delay: "-24s",
        duration: "54s",
      },
      {
        ...FOG_WIDE,
        left: "-16%",
        top: "46%",
        size: "min(124vw, 82rem)",
        opacity: soft,
        delay: "-40s",
        duration: "64s",
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
        <img
          className="weather-sun"
          src={SUN.src}
          alt=""
          width={SUN.width}
          height={SUN.height}
          decoding="async"
          draggable={false}
        />
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

      {fogLayers.length > 0 ? (
        <>
          <div className="weather-haze is-fog" />
          <div className="weather-fog">
            {fogLayers.map((f, i) => (
              <img
                key={i}
                className="weather-fog-layer"
                src={f.src}
                alt=""
                width={f.width}
                height={f.height}
                decoding="async"
                draggable={false}
                style={{
                  left: f.left,
                  top: f.top,
                  width: f.size,
                  opacity: f.opacity,
                  animationDelay: f.delay,
                  animationDuration: f.duration,
                }}
              />
            ))}
          </div>
        </>
      ) : null}

      {!lite && kind === "drizzle" ? (
        <div className="weather-haze is-drizzle" />
      ) : null}

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
          <img
            className="weather-bolt"
            src={THUNDER_TALL.src}
            alt=""
            width={THUNDER_TALL.width}
            height={THUNDER_TALL.height}
            decoding="async"
            draggable={false}
            style={{ left: "6%", top: "-6%", width: "min(42vw, 20rem)" }}
          />
          <img
            className="weather-bolt"
            src={THUNDER_LEAN.src}
            alt=""
            width={THUNDER_LEAN.width}
            height={THUNDER_LEAN.height}
            decoding="async"
            draggable={false}
            style={{
              left: "54%",
              top: "-10%",
              width: "min(34vw, 16rem)",
              animationDelay: "1.8s",
            }}
          />
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
