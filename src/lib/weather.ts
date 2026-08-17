/** Open-Meteo WMO weather interpretation codes → scene themes for glass backdrop. */

export type WeatherKind =
  | "clear"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "thunder";

export type WeatherTheme = {
  kind: WeatherKind;
  isDay: boolean;
  label: string;
  /** Page / body wash */
  bg: string;
  bgAccent: string;
  /** Particle / overlay tint */
  particle: string;
  /** Slightly lift glass saturate on vivid skies */
  glassBoost: number;
};

export type WeatherSnapshot = {
  kind: WeatherKind;
  isDay: boolean;
  code: number;
  temperatureC: number | null;
  theme: WeatherTheme;
  source: "live" | "fallback";
};

const BANGKOK = { lat: 13.7563, lon: 100.5018 };

type OpenMeteoCurrent = {
  temperature_2m?: number;
  weather_code?: number;
  is_day?: number;
};

type OpenMeteoResponse = {
  current?: OpenMeteoCurrent;
};

function kindFromCode(code: number): WeatherKind {
  if (code === 0 || code === 1) return "clear";
  if (code === 2 || code === 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 57) return "drizzle";
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return "rain";
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return "snow";
  if (code >= 95) return "thunder";
  return "cloudy";
}

function labelFor(kind: WeatherKind, isDay: boolean): string {
  const dayNight = isDay ? "day" : "night";
  switch (kind) {
    case "clear":
      return isDay ? "Clear sky" : "Clear night";
    case "cloudy":
      return "Cloudy";
    case "fog":
      return "Fog";
    case "drizzle":
      return "Drizzle";
    case "rain":
      return "Rain";
    case "snow":
      return "Snow";
    case "thunder":
      return "Thunderstorm";
    default:
      return `${kind} ${dayNight}`;
  }
}

/** Soft, readable washes that keep iOS glass legible — not neon or flat. */
export function themeFor(kind: WeatherKind, isDay: boolean): WeatherTheme {
  const label = labelFor(kind, isDay);

  if (kind === "thunder") {
    return {
      kind,
      isDay,
      label,
      bg: isDay ? "#6b7388" : "#12131c",
      bgAccent: isDay ? "#8b7aa8" : "#2a2440",
      particle: "rgba(200, 210, 255, 0.55)",
      glassBoost: 1.15,
    };
  }

  if (kind === "drizzle") {
    return {
      kind,
      isDay,
      label,
      bg: isDay ? "#a8b8c4" : "#121820",
      bgAccent: isDay ? "#c4d0d8" : "#1e2a34",
      particle: isDay
        ? "rgba(255, 255, 255, 0.42)"
        : "rgba(190, 214, 230, 0.38)",
      glassBoost: 1.05,
    };
  }

  if (kind === "rain") {
    return {
      kind,
      isDay,
      label,
      bg: isDay ? "#8fa3b8" : "#0e141c",
      bgAccent: isDay ? "#a8b9c9" : "#1a2836",
      particle: isDay
        ? "rgba(255, 255, 255, 0.55)"
        : "rgba(180, 210, 240, 0.45)",
      glassBoost: 1.1,
    };
  }

  if (kind === "snow") {
    return {
      kind,
      isDay,
      label,
      bg: isDay ? "#d9e4f0" : "#0c1218",
      bgAccent: isDay ? "#eef3f8" : "#1a2430",
      particle: "rgba(255, 255, 255, 0.85)",
      glassBoost: 1.05,
    };
  }

  if (kind === "fog") {
    return {
      kind,
      isDay,
      label,
      bg: isDay ? "#c5c8ce" : "#141618",
      bgAccent: isDay ? "#d6d8dc" : "#22262a",
      particle: "rgba(255, 255, 255, 0.2)",
      glassBoost: 0.95,
    };
  }

  if (kind === "cloudy") {
    return {
      kind,
      isDay,
      label,
      bg: isDay ? "#b7c6d6" : "#10151c",
      bgAccent: isDay ? "#cdd8e4" : "#1c2530",
      particle: isDay
        ? "rgba(248, 250, 252, 0.88)"
        : "rgba(170, 186, 210, 0.42)",
      glassBoost: 1,
    };
  }

  // clear
  if (isDay) {
    return {
      kind,
      isDay,
      label,
      bg: "#cfe7ff",
      bgAccent: "#e8f4ff",
      particle: "rgba(255, 236, 180, 0.35)",
      glassBoost: 1.2,
    };
  }

  return {
    kind,
    isDay,
    label,
    bg: "#070b16",
    bgAccent: "#121a2e",
    particle: "rgba(220, 230, 255, 0.7)",
    glassBoost: 1.1,
  };
}

export function fallbackWeather(isDay = true): WeatherSnapshot {
  const kind: WeatherKind = "clear";
  return {
    kind,
    isDay,
    code: 0,
    temperatureC: null,
    theme: themeFor(kind, isDay),
    source: "fallback",
  };
}

async function resolveCoords(): Promise<{ lat: number; lon: number }> {
  if (!("geolocation" in navigator)) return BANGKOK;

  try {
    const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: false,
        timeout: 4000,
        maximumAge: 30 * 60_000,
      });
    });
    return { lat: pos.coords.latitude, lon: pos.coords.longitude };
  } catch {
    return BANGKOK;
  }
}

export async function fetchWeather(): Promise<WeatherSnapshot> {
  const hour = new Date().getHours();
  const guessDay = hour >= 6 && hour < 19;
  const base = fallbackWeather(guessDay);

  try {
    const { lat, lon } = await resolveCoords();
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", String(lat));
    url.searchParams.set("longitude", String(lon));
    url.searchParams.set("current", "temperature_2m,weather_code,is_day");
    url.searchParams.set("timezone", "auto");

    const res = await fetch(url.toString(), {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return base;

    const data = (await res.json()) as OpenMeteoResponse;
    const current = data.current;
    if (!current || current.weather_code == null) return base;

    const code = current.weather_code;
    const isDay = current.is_day === 1;
    const kind = kindFromCode(code);

    return {
      kind,
      isDay,
      code,
      temperatureC:
        typeof current.temperature_2m === "number"
          ? current.temperature_2m
          : null,
      theme: themeFor(kind, isDay),
      source: "live",
    };
  } catch {
    return base;
  }
}
