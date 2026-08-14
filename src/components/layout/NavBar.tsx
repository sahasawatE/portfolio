import { motion } from "framer-motion";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Icon } from "@/components/ui/Icon";
import { publicUrl } from "@/lib/assets";
import { downloadMarkdown } from "@/lib/exportMd";
import type { Resume } from "@/types/resume";

type NavBarProps = {
  resume: Resume;
};

const pill =
  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-blue";

export function NavBar({ resume }: NavBarProps) {
  return (
    <header className="site-nav sticky top-0 z-50 px-4 pt-3">
      <GlassSurface
        className="glass-panel mx-auto max-w-5xl rounded-ios"
        effect="liquid"
        blur={3}
        specularOpacity={0.5}
        specularSaturation={50}
        refraction={1}
        progressiveBlur={0.35}
      >
        <div className="flex items-center justify-between gap-3 px-5 py-3">
          <a
            href="#top"
            className="font-mono text-[15px] font-semibold tracking-tight text-label no-underline"
          >
            {"<Sahasawat />"}
          </a>
          <div className="flex items-center gap-2">
            <motion.a
              href={publicUrl("/resume.pdf")}
              download
              className={pill}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
            >
              <Icon name="print" className="h-4 w-4" />
              <span className="hidden sm:inline">Save as PDF</span>
            </motion.a>
            <motion.button
              type="button"
              className={pill}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
              onClick={() => downloadMarkdown(resume)}
            >
              <Icon name="download" className="h-4 w-4" />
              <span className="hidden sm:inline">Download .md</span>
            </motion.button>
          </div>
        </div>
      </GlassSurface>
    </header>
  );
}
