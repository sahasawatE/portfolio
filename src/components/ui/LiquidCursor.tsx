import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { LiquidGlassFilter } from "@/components/ui/LiquidGlassFilter";
import {
  DROP_CURSOR_HEIGHT,
  DROP_CURSOR_WIDTH,
  getLiquidGlassMaps,
  isChromiumSvgBackdropSupported,
  prefersReducedMotion,
  type LiquidGlassMaps,
} from "@/lib/liquidGlass";
import { useLiteMode } from "@/lib/perf";

const LERP = 0.28;
const SETTLE = 0.12;
const STRETCH_MIN = 0.4;
const CLICKABLE =
  "a[href], button, [role='button'], [role='link'], label[for], summary";
const TEXT_FIELD =
  "textarea, select, [contenteditable='true'], [contenteditable='']";

type NativeCursor = "drop" | "pointer" | "text";

function subscribeFinePointer(onStoreChange: () => void): () => void {
  const fine = window.matchMedia("(pointer: fine)");
  const hover = window.matchMedia("(hover: hover)");
  fine.addEventListener("change", onStoreChange);
  hover.addEventListener("change", onStoreChange);
  return () => {
    fine.removeEventListener("change", onStoreChange);
    hover.removeEventListener("change", onStoreChange);
  };
}

function useFinePointer(): boolean {
  return useSyncExternalStore(
    subscribeFinePointer,
    () =>
      window.matchMedia("(pointer: fine)").matches &&
      window.matchMedia("(hover: hover)").matches,
    () => false,
  );
}

function isButtonLikeInput(el: Element): boolean {
  if (!(el instanceof HTMLInputElement)) return false;
  return (
    el.type === "button" ||
    el.type === "submit" ||
    el.type === "reset" ||
    el.type === "checkbox" ||
    el.type === "radio" ||
    el.type === "file" ||
    el.type === "color" ||
    el.type === "range" ||
    el.type === "image"
  );
}

function nativeCursorAt(target: EventTarget | null): NativeCursor {
  if (!(target instanceof Element)) return "drop";

  const text = target.closest(`input, ${TEXT_FIELD}`);
  if (text) {
    return isButtonLikeInput(text) ? "pointer" : "text";
  }

  if (target.closest(CLICKABLE)) return "pointer";
  if (getComputedStyle(target).cursor === "pointer") return "pointer";

  return "drop";
}

export function LiquidCursor() {
  const lite = useLiteMode();
  const finePointer = useFinePointer();
  const rawId = useId();
  const filterId = `lg-cursor-${rawId.replace(/:/g, "")}`;
  const dropRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const [maps, setMaps] = useState<LiquidGlassMaps | null>(null);
  const [filterReady, setFilterReady] = useState(false);

  const enabled =
    finePointer &&
    !lite &&
    !prefersReducedMotion() &&
    isChromiumSvgBackdropSupported();

  useEffect(() => {
    if (!enabled) {
      setMaps(null);
      return;
    }

    let cancelled = false;
    void getLiquidGlassMaps({
      width: DROP_CURSOR_WIDTH,
      height: DROP_CURSOR_HEIGHT,
      radius: DROP_CURSOR_WIDTH / 2,
      bezel: 64,
      thickness: 50,
      scaleRatio: 1.1,
      shape: "drop",
    }).then((next) => {
      if (!cancelled) setMaps(next);
    });

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  useEffect(() => {
    if (!maps) {
      setFilterReady(false);
      return;
    }
    const frame = requestAnimationFrame(() => setFilterReady(true));
    return () => cancelAnimationFrame(frame);
  }, [maps]);

  useEffect(() => {
    if (!enabled || !filterReady) {
      document.documentElement.classList.remove("has-liquid-cursor");
      return;
    }

    const drop = dropRef.current;
    const lens = lensRef.current;
    const root = document.documentElement;
    if (!drop || !lens) return;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let hasPoint = false;
    let showDrop = false;
    let raf = 0;
    let lastTarget: EventTarget | null = null;
    let lastCursor: NativeCursor = "drop";

    const stopTick = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const writeTransform = (
      left: number,
      top: number,
      stretch: number,
      angle: number,
    ) => {
      if (stretch < 0.004) {
        drop.style.transform = `translate3d(${left}px, ${top}px, 0)`;
        return;
      }
      const deg = (angle * 180) / Math.PI;
      drop.style.transform = `translate3d(${left}px, ${top}px, 0) rotate(${deg}deg) scale(${1 + stretch}, ${1 - stretch}) rotate(${-deg}deg)`;
    };

    const tick = () => {
      raf = 0;
      if (!showDrop) return;

      const dx = tx - x;
      const dy = ty - y;
      x += dx * LERP;
      y += dy * LERP;

      const speed = Math.hypot(dx, dy);
      const settled = speed < SETTLE;
      const stretch =
        settled || speed < STRETCH_MIN ? 0 : Math.min(0.14, speed * 0.018);
      const left = x - DROP_CURSOR_WIDTH / 2;
      const top = y - DROP_CURSOR_HEIGHT / 2;
      writeTransform(left, top, stretch, stretch ? Math.atan2(dy, dx) : 0);

      if (!settled) raf = requestAnimationFrame(tick);
    };

    const startTick = () => {
      if (raf || !showDrop) return;
      raf = requestAnimationFrame(tick);
    };

    const setVisible = (next: boolean) => {
      if (showDrop === next) return;
      showDrop = next;
      root.classList.toggle("has-liquid-cursor", next);
      if (!next) {
        lens.classList.remove("is-bouncing");
        stopTick();
      }
      drop.classList.toggle("is-visible", next);
      if (next) startTick();
    };

    const onMove = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      if (!hasPoint) {
        x = tx;
        y = ty;
        hasPoint = true;
      }
      if (event.target !== lastTarget) {
        lastTarget = event.target;
        lastCursor = nativeCursorAt(event.target);
      }
      setVisible(lastCursor === "drop");
      startTick();
    };

    const onLeave = () => {
      hasPoint = false;
      lastTarget = null;
      setVisible(false);
    };

    const bounce = () => {
      if (!showDrop) return;
      lens.classList.remove("is-bouncing");
      void lens.offsetWidth;
      lens.classList.add("is-bouncing");
    };

    const onBounceEnd = (event: AnimationEvent) => {
      if (event.animationName !== "liquid-cursor-bounce") return;
      lens.classList.remove("is-bouncing");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", bounce);
    lens.addEventListener("animationend", onBounceEnd);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", bounce);
      lens.removeEventListener("animationend", onBounceEnd);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      stopTick();
      root.classList.remove("has-liquid-cursor");
    };
  }, [enabled, filterReady]);

  if (!enabled || !maps) return null;

  const backdropStyle = filterReady
    ? {
        backdropFilter: `url(#${filterId})`,
        WebkitBackdropFilter: `url(#${filterId})`,
      }
    : undefined;

  return createPortal(
    <>
      <LiquidGlassFilter
        id={filterId}
        maps={maps}
        blur={0.4}
        specularOpacity={0.55}
        specularSaturation={8}
        refraction={1.4}
        progressiveBlur={0.3}
      />
      <div ref={dropRef} aria-hidden className="liquid-cursor">
        <div ref={lensRef} className="liquid-cursor-lens" style={backdropStyle}>
          <div className="liquid-cursor-highlight" />
        </div>
      </div>
    </>,
    document.body,
  );
}
