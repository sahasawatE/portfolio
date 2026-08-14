type HighlightsProps = {
  items?: string[];
};

export function Highlights({ items }: HighlightsProps) {
  if (!items?.length) return null;
  return (
    <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-label/90">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-blue" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
