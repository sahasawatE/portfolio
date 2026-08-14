import { EntryLinks } from "@/components/ui/EntryLinks";
import { Gallery } from "@/components/ui/Gallery";
import { Highlights } from "@/components/ui/Highlights";
import { SectionCard } from "@/components/ui/SectionCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { dateRange } from "@/lib/format";
import type { ProjectsSection } from "@/types/resume";

type ProjectsProps = {
  section: ProjectsSection;
};

export function Projects({ section }: ProjectsProps) {
  if (!section.items?.length) return null;

  return (
    <section className="section-block">
      <SectionHeader title={section.title} icon={section.icon} />
      <SectionCard>
        {section.items.map((item, index) => (
          <article
            key={item.name}
            className={`entry p-5 ${index > 0 ? "border-t border-separator" : ""}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-[17px] font-semibold tracking-tight text-label">
                {item.name}
              </h3>
              <span className="text-[13px] text-secondary">
                {item.date || dateRange(item.start, item.end)}
              </span>
            </div>
            {item.images?.length ? (
              <div className="mt-3">
                <Gallery images={item.images} alt={item.name} />
              </div>
            ) : null}
            <Highlights items={item.highlights} />
            <EntryLinks links={item.links} fallbackUrl={item.url} />
          </article>
        ))}
      </SectionCard>
    </section>
  );
}
