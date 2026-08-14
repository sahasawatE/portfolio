import { motion } from "framer-motion";
import { SectionCard } from "@/components/ui/SectionCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SkillIcon } from "@/components/ui/SkillIcon";
import type { SkillsSection } from "@/types/resume";

type SkillsProps = {
  section: SkillsSection;
};

const CHIP_TONES = {
  blue: "border-blue/30 bg-blue/22 text-blue hover:bg-blue/32",
  purple: "border-purple/30 bg-purple/22 text-purple hover:bg-purple/32",
  green: "border-green/30 bg-green/22 text-green hover:bg-green/32",
  orange: "border-orange/30 bg-orange/22 text-orange hover:bg-orange/32",
  teal: "border-teal/30 bg-teal/22 text-teal hover:bg-teal/32",
  pink: "border-pink/30 bg-pink/22 text-pink hover:bg-pink/32",
  indigo: "border-indigo/30 bg-indigo/22 text-indigo hover:bg-indigo/32",
  lime: "border-lime/30 bg-lime/22 text-lime hover:bg-lime/32",
} as const;

type ChipTone = keyof typeof CHIP_TONES;

const PALETTE: ChipTone[] = [
  "blue",
  "purple",
  "green",
  "orange",
  "teal",
  "pink",
  "indigo",
  "lime",
];

const CHIP_TONES_BY_NAME: Record<string, ChipTone> = {
  Creativity: "purple",
  "Collaboration and Teamwork": "teal",
  "Complex Decision Making": "indigo",
  Leadership: "orange",
  "Time Management": "green",
  "React.js": "blue",
  "Next.js": "blue",
  TypeScript: "blue",
  JavaScript: "blue",
  Figma: "purple",
  Flutter: "purple",
  Dart: "purple",
  "Vue.js": "green",
  "Nuxt.js": "green",
  Git: "orange",
  Playwright: "orange",
  SQL: "teal",
  Cypress: "teal",
  TurboRepo: "pink",
  "Create and Design database": "indigo",
  "Object Oriented Program": "indigo",
  Vitest: "lime",
};

function chipClass(item: string, index: number) {
  const tone = CHIP_TONES_BY_NAME[item] ?? PALETTE[index % PALETTE.length];
  return CHIP_TONES[tone];
}

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
                {group.items.map((item, itemIndex) => (
                <motion.li
                  key={item}
                  className={`skill-chip inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-semibold ${chipClass(item, itemIndex)}`}
                  variants={{
                    hidden: { opacity: 0, y: 8, scale: 0.96 },
                    show: { opacity: 1, y: 0, scale: 1 },
                  }}
                  whileHover={{ scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  <SkillIcon name={item} className="h-3.5 w-3.5 shrink-0 print:hidden" />
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
