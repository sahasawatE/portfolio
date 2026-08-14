import { EntryLinks } from "@/components/ui/EntryLinks";
import { FadeIn } from "@/components/ui/FadeIn";
import { Gallery } from "@/components/ui/Gallery";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Highlights } from "@/components/ui/Highlights";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { dateRange } from "@/lib/format";
import type { ExperienceSection } from "@/types/resume";

type ExperienceProps = {
  section: ExperienceSection;
};

export function Experience({ section }: ExperienceProps) {
  if (!section.items?.length) return null;

  return (
    <section className="section-block">
      <SectionHeader title={section.title} icon={section.icon} />
      <div className="space-y-10">
        {section.items.map((item, index) => {
          const reverse = index % 2 === 1;
          const hasImages = Boolean(item.images?.length);
          const meta = (
            <>
              <p className="text-[13px] font-medium text-secondary">
                {dateRange(item.start, item.end)}
              </p>
              <h3 className="mt-1 text-[20px] font-semibold tracking-tight text-label">
                {item.role}
              </h3>
              <p className="mt-1 text-[15px] text-secondary">
                {item.company}
                {item.location ? ` · ${item.location}` : ""}
              </p>
            </>
          );

          if (!hasImages) {
            return (
              <FadeIn
                key={`${item.company}-${item.role}-${item.start}`}
                x={reverse ? 28 : -28}
                className="entry grid items-start gap-4 md:grid-cols-12 md:gap-10"
              >
                <div
                  className={
                    reverse ? "md:col-span-5 md:col-start-8" : "md:col-span-5"
                  }
                >
                  {meta}
                </div>
                <GlassSurface
                  className={`glass-panel rounded-ios p-5 md:col-span-7 ${
                    reverse ? "md:col-start-1 md:row-start-1" : ""
                  }`}
                >
                  <Highlights items={item.highlights} />
                  <EntryLinks links={item.links} />
                </GlassSurface>
              </FadeIn>
            );
          }

          return (
            <FadeIn
              key={`${item.company}-${item.role}-${item.start}`}
              x={reverse ? 28 : -28}
              className="entry relative md:min-h-44 md:[--experience-card:58%]"
            >
              <div className="relative z-0 mb-4 w-full min-w-0 md:absolute md:inset-0 md:mb-0 md:grid md:items-center">
                <Gallery
                  images={item.images ?? []}
                  alt={`${item.role} at ${item.company}`}
                  through={reverse ? "left" : "right"}
                />
              </div>
              <GlassSurface
                className={`glass-panel relative z-10 rounded-ios p-5 ${
                  reverse
                    ? "md:w-[var(--experience-card)]"
                    : "md:ml-auto md:w-[var(--experience-card)]"
                }`}
              >
                <div className="mb-3">{meta}</div>
                <Highlights items={item.highlights} />
                <EntryLinks links={item.links} />
              </GlassSurface>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
