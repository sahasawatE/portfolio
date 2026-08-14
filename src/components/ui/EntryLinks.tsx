import { linkIconFromUrl, normalizeLinks } from "@/lib/links";
import type { ResumeLink } from "@/types/resume";
import { Icon } from "./Icon";

type EntryLinksProps = {
  links?: ResumeLink[];
  fallbackUrl?: string;
};

export function EntryLinks({ links, fallbackUrl }: EntryLinksProps) {
  const items = normalizeLinks(links, fallbackUrl);

  if (!items.length) return null;

  return (
    <ul className="entry-links mt-3 flex flex-wrap gap-x-4 gap-y-1">
      {items.map((link) => (
        <li key={link.url}>
          <a
            href={link.url}
            className="inline-flex items-center gap-1 text-[13px] font-medium text-blue no-underline"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name={linkIconFromUrl(link.url)} className="h-3.5 w-3.5" />
            {link.label || link.url}
          </a>
        </li>
      ))}
    </ul>
  );
}
