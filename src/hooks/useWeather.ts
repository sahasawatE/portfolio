import { useEffect, useState } from "react";
import {
  fetchWeather,
  fallbackWeather,
  themeFor,
  type WeatherKind,
  type WeatherSnapshot,
} from "@/lib/weather";

const KINDS = new Set<WeatherKind>([
  "clear",
  "cloudy",
  "fog",
  "drizzle",
  "rain",
  "snow",
  "thunder",
]);

function previewFromSearch(): WeatherSnapshot | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("weather");
  if (!raw || !KINDS.has(raw as WeatherKind)) return null;
  const kind = raw as WeatherKind;
  const dayParam = params.get("day");
  const isDay = dayParam == null ? true : dayParam !== "0" && dayParam !== "night";
  return {
    kind,
    isDay,
    code: 0,
    temperatureC: null,
    theme: themeFor(kind, isDay),
    source: "fallback",
  };
}

export function useWeather(): WeatherSnapshot {
  const [weather, setWeather] = useState<WeatherSnapshot>(() => {
    const preview = previewFromSearch();
    if (preview) return preview;
    const hour = new Date().getHours();
    return fallbackWeather(hour >= 6 && hour < 19);
  });

  useEffect(() => {
    const preview = previewFromSearch();
    if (preview) {
      setWeather(preview);
      return;
    }

    let cancelled = false;

    void fetchWeather().then((next) => {
      if (!cancelled) setWeather(next);
    });

    const id = window.setInterval(() => {
      void fetchWeather().then((next) => {
        if (!cancelled) setWeather(next);
      });
    }, 15 * 60_000);

    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return weather;
}
