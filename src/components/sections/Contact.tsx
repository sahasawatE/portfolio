import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Icon } from "@/components/ui/Icon";
import { getContactItems } from "@/lib/contacts";
import type { Resume } from "@/types/resume";

type ContactProps = {
  basics: Resume["basics"];
};

export function Contact({ basics }: ContactProps) {
  const rows = getContactItems(basics);

  if (!rows.length) return null;

  return (
    <section className="contact-block">
      <h2 className="section-title mb-5 text-[22px] font-semibold tracking-tight text-label">
        Contact
      </h2>
      <FadeIn>
        <GlassSurface className="glass-panel overflow-hidden rounded-ios">
        <ul>
          {rows.map((row, index) => {
            const inner = (
              <>
                <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-gray6 text-blue">
                  <Icon name={row.icon} className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12px] text-secondary">{row.label}</span>
                  <span className="block truncate text-[16px] text-label">
                    {row.value}
                  </span>
                </span>
                {row.href ? (
                  <Icon name="chevron" className="h-4 w-4 text-secondary" />
                ) : null}
              </>
            );

            const className = `flex items-center gap-3 px-4 py-3 ${
              index > 0 ? "border-t border-separator" : ""
            }`;

            return (
              <li key={row.id}>
                {row.href ? (
                  <motion.a
                    href={row.href}
                    className={`${className} text-inherit no-underline`}
                    target={row.href.startsWith("http") ? "_blank" : undefined}
                    rel={row.href.startsWith("http") ? "noreferrer" : undefined}
                    whileHover={{ x: 4, backgroundColor: "var(--gray6)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 24 }}
                  >
                    {inner}
                  </motion.a>
                ) : (
                  <div className={className}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
        </GlassSurface>
      </FadeIn>
    </section>
  );
}
