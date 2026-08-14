import { EntryLinks } from "@/components/ui/EntryLinks";
import { FadeIn } from "@/components/ui/FadeIn";
import { Gallery } from "@/components/ui/Gallery";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Highlights } from "@/components/ui/Highlights";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { dateRange, parseResumeDate } from "@/lib/format";
import type { ExperienceItem, ExperienceSection } from "@/types/resume";

type ExperienceProps = {
  section: ExperienceSection;
};

function ExperienceCard({ item }: { item: ExperienceItem }) {
  return (
    <GlassSurface className="glass-panel rounded-ios p-5">
      <h3 className="text-[20px] font-semibold tracking-tight text-label">
        {item.role}
      </h3>
      <p className="mt-1 text-[15px] text-secondary">
        {item.company}
        {item.location ? ` · ${item.location}` : ""}
      </p>
      <Highlights items={item.highlights} />
      <EntryLinks links={item.links} />
    </GlassSurface>
  );
}

export function Experience({ section }: ExperienceProps) {
  if (!section.items?.length) return null;

  const items = [...section.items].sort((a, b) => {
    const start = parseResumeDate(a.start) - parseResumeDate(b.start);
    if (start !== 0) return start;
    return parseResumeDate(a.end) - parseResumeDate(b.end);
  });

  return (
    <section className="section-block">
      <SectionHeader title={section.title} icon={section.icon} />
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-4 w-px -translate-x-1/2 bg-separator print:hidden md:left-1/2"
        />
        <div className="space-y-10 md:space-y-12">
          {items.map((item, index) => {
            const reverse = index % 2 === 1;
            const hasImages = Boolean(item.images?.length);

            return (
              <FadeIn
                key={`${item.company}-${item.role}-${item.start}`}
                x={reverse ? -28 : 28}
                className="entry relative"
              >
                <div className="relative mb-3 flex items-center md:hidden">
                  <span
                    aria-hidden
                    className="absolute top-1/2 left-4 z-1 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue ring-4 ring-bg print:hidden"
                  />
                  <p className="pl-10 text-[13px] font-medium text-secondary">
                    {dateRange(item.start, item.end)}
                  </p>
                </div>
                <div className="grid items-start gap-4 pl-10 md:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)] md:gap-x-6 md:gap-y-2 md:pl-0">
                  <p
                    className={`hidden text-[13px] font-medium text-secondary md:block ${
                      reverse
                        ? "text-right md:col-start-1 md:row-start-1"
                        : "text-left md:col-start-3 md:row-start-1"
                    }`}
                  >
                    {dateRange(item.start, item.end)}
                  </p>
                  <div
                    className={
                      reverse
                        ? "md:col-start-1 md:row-start-2"
                        : "md:col-start-3 md:row-start-2"
                    }
                  >
                    <ExperienceCard item={item} />
                  </div>
                  <span
                    aria-hidden
                    className="relative z-1 mx-auto mt-1 hidden size-3 rounded-full bg-blue ring-4 ring-bg print:hidden md:col-start-2 md:row-start-1 md:block"
                  />
                  {hasImages ? (
                    <div
                      className={`min-w-0 ${
                        reverse
                          ? "md:col-start-3 md:row-start-2"
                          : "md:col-start-1 md:row-start-2"
                      }`}
                    >
                      <Gallery
                        images={item.images ?? []}
                        alt={`${item.role} at ${item.company}`}
                      />
                    </div>
                  ) : null}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
