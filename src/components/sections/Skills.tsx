import { motion } from "framer-motion";
import { SectionCard } from "@/components/ui/SectionCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { SkillsSection } from "@/types/resume";

type SkillsProps = {
  section: SkillsSection;
};

export function Skills({ section }: SkillsProps) {
  if (!section.groups?.length) return null;

  return (
    <section className="section-block">
      <SectionHeader title={section.title} icon={section.icon} />
      <SectionCard>
        {section.groups.map((group, index) => (
          <div
            key={group.name}
            className={`skill-group p-5 ${index > 0 ? "border-t border-separator" : ""}`}
          >
            <h3 className="mb-3 text-[13px] font-medium uppercase tracking-[0.08em] text-secondary">
              {group.name}
            </h3>
            <motion.ul
              className="flex flex-wrap gap-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.035 } },
              }}
            >
              {group.items.map((item) => (
                <motion.li
                  key={item}
                  className="skill-chip rounded-full bg-gray6 px-3 py-1.5 text-[13px] font-medium text-label"
                  variants={{
                    hidden: { opacity: 0, y: 8, scale: 0.96 },
                    show: { opacity: 1, y: 0, scale: 1 },
                  }}
                  whileHover={{ scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        ))}
      </SectionCard>
    </section>
  );
}
