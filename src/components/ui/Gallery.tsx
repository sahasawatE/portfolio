import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { publicUrl } from "@/lib/assets";

type GalleryProps = {
  images: string[];
  alt: string;
  through?: "left" | "right";
};

export function Gallery({ images, alt, through }: GalleryProps) {
  const [open, setOpen] = useState<number | null>(null);
  const srcs = images.map(publicUrl);
  const lenis = useLenis();

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") {
        setOpen((i) => (i === null ? i : (i + 1) % images.length));
      }
      if (event.key === "ArrowLeft") {
        setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length));
      }
    };
    document.body.style.overflow = "hidden";
    lenis?.stop();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, images.length, lenis]);

  if (!images.length) return null;

  return (
    <>
      <ul
        data-lenis-prevent
        className={`flex w-full min-w-0 gap-3 overflow-x-auto pb-1 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
          through
            ? "max-md:snap-x max-md:snap-mandatory md:snap-none md:ps-[calc(var(--experience-card)+1.5rem)]"
            : "snap-x snap-mandatory"
        } ${through === "right" ? "md:[direction:rtl]" : ""}`}
      >
        {srcs.map((src, index) => (
          <li key={src} className="snap-start shrink-0" dir="ltr">
            <motion.button
              type="button"
              className="block overflow-hidden rounded-2xl bg-gray6"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 380, damping: 24 }}
              onClick={() => setOpen(index)}
            >
              <img
                src={src}
                alt={`${alt} ${index + 1}`}
                className="h-40 w-56 object-cover md:h-44 md:w-64"
              />
            </motion.button>
          </li>
        ))}
      </ul>

      {createPortal(
        <AnimatePresence>
          {open !== null ? (
            <motion.div
              className="fixed inset-0 z-200 flex items-center justify-center bg-black/40 p-6 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(null)}
            >
              <motion.div
                className="max-h-[86vh] max-w-4xl"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                onClick={(event) => event.stopPropagation()}
              >
                <img
                  src={srcs[open]}
                  alt={`${alt} ${open + 1}`}
                  className="max-h-[78vh] w-full rounded-ios object-contain shadow-[0_12px_40px_rgba(0,0,0,0.28)]"
                />
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
