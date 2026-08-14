import { Highlights } from "@/components/ui/Highlights";
import { SectionCard } from "@/components/ui/SectionCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { dateRange } from "@/lib/format";
import type { EducationSection } from "@/types/resume";

type EducationProps = {
  section: EducationSection;
};

export function Education({ section }: EducationProps) {
  if (!section.items?.length) return null;

  return (
    <section className="section-block">
      <SectionHeader title={section.title} icon={section.icon} />
      <SectionCard>
        {section.items.map((item, index) => (
          <article
            key={`${item.institution}-${item.degree}`}
            className={`entry p-5 ${index > 0 ? "border-t border-separator" : ""}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-[17px] font-semibold tracking-tight text-label">
                {item.institution}
              </h3>
              <span className="text-[13px] text-secondary">
                {dateRange(item.start, item.end)}
              </span>
            </div>
            <p className="mt-1 text-[15px] text-secondary">
              {item.degree}
              {item.location ? ` · ${item.location}` : ""}
            </p>
            <Highlights items={item.highlights} />
          </article>
        ))}
      </SectionCard>
    </section>
  );
}
