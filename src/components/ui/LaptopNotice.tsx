import { useEffect, useId, useRef, useState } from "react";
import { GlassSurface } from "@/components/ui/GlassSurface";

const STORAGE_KEY = "portfolio-laptop-notice";

function shouldOpen() {
  if (sessionStorage.getItem(STORAGE_KEY) === "1") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

export function LaptopNotice() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const sync = () => setOpen(shouldOpen());
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function dismiss() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="print:hidden mt-auto mr-auto mb-5 ml-auto w-[calc(100%-2.5rem)] max-w-sm border-0 bg-transparent p-0 backdrop:bg-black/35"
      onKeyDown={(event) => {
        if (event.key === "Escape") dismiss();
      }}
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <GlassSurface className="glass-panel rounded-ios">
        <div className="relative px-5 py-5">
          <p id={titleId} className="text-[17px] leading-snug font-medium text-label">
            For the best experience, please use a laptop.
          </p>
          <button
            type="button"
            autoFocus
            className="mt-4 inline-flex rounded-full bg-blue px-4 py-2 text-[14px] font-medium text-[#fff]"
            onClick={dismiss}
          >
            Continue
          </button>
        </div>
      </GlassSurface>
    </dialog>
  );
}
