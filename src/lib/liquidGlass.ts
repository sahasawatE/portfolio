const SAMPLES = 127;
const IOR = 1.5;
const LIGHT_ANGLE = (-60 * Math.PI) / 180;
const DERIVATIVE_DELTA = 0.001;

export type LiquidGlassMaps = {
  width: number;
  height: number;
  scale: number;
  displacement: string;
  specular: string;
};

type MapInput = {
  width: number;
  height: number;
  radius: number;
  bezel?: number;
  thickness?: number;
  scaleRatio?: number;
};

const DEFAULT_BEZEL = 100;
const DEFAULT_THICKNESS = 100;
const DEFAULT_SCALE_RATIO = 0.7;

const cache = new Map<string, LiquidGlassMaps>();
const inflight = new Map<string, Promise<LiquidGlassMaps | null>>();

function squircle(x: number): number {
  const t = 1 - Math.min(1, Math.max(0, x));
  const v = 1 - t ** 4;
  return v <= 0 ? 0 : v ** 0.25;
}

function surfaceHeight(x: number, thickness: number): number {
  return squircle(x) * thickness;
}

/** Inward displacement (px) at a normalized bezel station, via Snell. */
function refractDisplacement(
  xNorm: number,
  bezel: number,
  thickness: number,
): number {
  const heightAt = (x: number) => surfaceHeight(x, thickness);
  const dfdx =
    (heightAt(xNorm + DERIVATIVE_DELTA) - heightAt(xNorm - DERIVATIVE_DELTA)) /
    (2 * DERIVATIVE_DELTA);
  const dhds = bezel > 0 ? dfdx / bezel : 0;

  const nx = -dhds;
  const nz = 1;
  const invLen = 1 / Math.hypot(nx, nz);
  const Nx = nx * invLen;
  const Nz = nz * invLen;

  const eta = 1 / IOR;
  const cosI = Nz;
  const sin2T = eta * eta * (1 - cosI * cosI);
  if (sin2T > 1) return 0;

  const cosT = Math.sqrt(1 - sin2T);
  const Tx = (eta * cosI - cosT) * Nx;
  const Tz = eta * -1 + (eta * cosI - cosT) * Nz;
  const h = heightAt(xNorm);
  if (Math.abs(Tz) < 1e-6) return 0;

  return Math.abs((Tx * -h) / Tz);
}

function precomputeMagnitudes(bezel: number, thickness: number): {
  normalized: Float64Array;
  scale: number;
} {
  const raw = new Float64Array(SAMPLES);
  let max = 0;
  for (let i = 0; i < SAMPLES; i += 1) {
    const x = i / (SAMPLES - 1);
    const mag = refractDisplacement(x, bezel, thickness);
    raw[i] = mag;
    if (mag > max) max = mag;
  }
  const scale = Math.max(max, 1);
  const normalized = new Float64Array(SAMPLES);
  for (let i = 0; i < SAMPLES; i += 1) {
    normalized[i] = raw[i] / scale;
  }
  return { normalized, scale };
}

function sampleMagnitude(table: Float64Array, t: number): number {
  const x = Math.min(1, Math.max(0, t)) * (SAMPLES - 1);
  const i = Math.floor(x);
  const f = x - i;
  const a = table[i] ?? 0;
  const b = table[Math.min(i + 1, SAMPLES - 1)] ?? a;
  return a + (b - a) * f;
}

/** IQ rounded-box SDF: negative inside, positive outside. */
function sdRoundedBox(
  px: number,
  py: number,
  width: number,
  height: number,
  radius: number,
): number {
  const qx = Math.abs(px - width * 0.5) - width * 0.5 + radius;
  const qy = Math.abs(py - height * 0.5) - height * 0.5 + radius;
  return (
    Math.min(Math.max(qx, qy), 0) +
    Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) -
    radius
  );
}

function imageDataToBlobUrl(image: ImageData): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      resolve("");
      return;
    }
    ctx.putImageData(image, 0, 0);
    canvas.toBlob((blob) => {
      resolve(blob ? URL.createObjectURL(blob) : "");
    }, "image/png");
  });
}

function paintMaps(
  width: number,
  height: number,
  radius: number,
  bezel: number,
  table: Float64Array,
): { displacement: ImageData; specular: ImageData } {
  const displacement = new ImageData(width, height);
  const specular = new ImageData(width, height);
  const d = displacement.data;
  const s = specular.data;
  const lx = Math.cos(LIGHT_ANGLE);
  const ly = Math.sin(LIGHT_ANGLE);
  const eps = 0.6;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * 4;
      const sd = sdRoundedBox(x + 0.5, y + 0.5, width, height, radius);

      d[i] = 128;
      d[i + 1] = 128;
      d[i + 2] = 128;
      d[i + 3] = 255;
      s[i] = 255;
      s[i + 1] = 255;
      s[i + 2] = 255;
      s[i + 3] = 0;

      if (sd > 0.5) continue;

      const inward = Math.max(0, -sd);
      if (inward >= bezel) continue;

      const gx =
        sdRoundedBox(x + 0.5 + eps, y + 0.5, width, height, radius) -
        sdRoundedBox(x + 0.5 - eps, y + 0.5, width, height, radius);
      const gy =
        sdRoundedBox(x + 0.5, y + 0.5 + eps, width, height, radius) -
        sdRoundedBox(x + 0.5, y + 0.5 - eps, width, height, radius);
      const glen = Math.hypot(gx, gy) || 1;
      const inx = -gx / glen;
      const iny = -gy / glen;

      const t = inward / bezel;
      const mag = sampleMagnitude(table, t);
      d[i] = Math.round(128 + inx * mag * 127);
      d[i + 1] = Math.round(128 + iny * mag * 127);

      const ndotl = Math.max(0, -inx * lx - iny * ly);
      const rim = ndotl ** 6 * (1 - t) ** 1.2;
      s[i + 3] = Math.round(Math.min(1, rim) * 255);
    }
  }

  return { displacement, specular };
}

export function getLiquidGlassMaps({
  width,
  height,
  radius,
  bezel: bezelInput = DEFAULT_BEZEL,
  thickness = DEFAULT_THICKNESS,
  scaleRatio = DEFAULT_SCALE_RATIO,
}: MapInput): Promise<LiquidGlassMaps | null> {
  const w = Math.round(width);
  const h = Math.round(height);
  if (w < 4 || h < 4) return Promise.resolve(null);

  const r = Math.min(Math.max(0, radius), w * 0.5, h * 0.5);
  const bezel = Math.min(bezelInput, Math.min(w, h) / 2);
  const key = `${w}x${h}r${Math.round(r)}b${bezel}t${thickness}s${scaleRatio}`;
  const hit = cache.get(key);
  if (hit) return Promise.resolve(hit);

  const pending = inflight.get(key);
  if (pending) return pending;

  const { normalized, scale } = precomputeMagnitudes(bezel, thickness);
  const painted = paintMaps(w, h, r, bezel, normalized);
  const build = Promise.all([
    imageDataToBlobUrl(painted.displacement),
    imageDataToBlobUrl(painted.specular),
  ]).then(([displacement, specular]) => {
    if (!displacement || !specular) return null;
    const maps: LiquidGlassMaps = {
      width: w,
      height: h,
      scale: scale * scaleRatio,
      displacement,
      specular,
    };
    cache.set(key, maps);
    return maps;
  }).finally(() => {
    inflight.delete(key);
  });

  inflight.set(key, build);
  return build;
}

export function isChromiumSvgBackdropSupported(): boolean {
  if (typeof window === "undefined" || typeof CSS === "undefined") return false;
  if (!CSS.supports?.("backdrop-filter", "url(#x)")) return false;

  const ua = navigator.userAgent;
  if (/CriOS|FxiOS|EdgiOS/.test(ua)) return false;

  const brands = (
    navigator as Navigator & {
      userAgentData?: { brands?: { brand: string }[] };
    }
  ).userAgentData?.brands;
  if (brands?.length) {
    return brands.some((item) => item.brand === "Chromium");
  }

  return /\b(Chrome|Chromium|Edg|OPR)\//.test(ua);
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
