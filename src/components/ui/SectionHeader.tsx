import { Icon, isIconName } from "./Icon";

type SectionHeaderProps = {
  title: string;
  icon?: string;
};

export function SectionHeader({ title, icon }: SectionHeaderProps) {
  return (
    <div className="mb-5 flex items-center gap-2">
      {isIconName(icon) ? <Icon name={icon} className="h-5 w-5 text-blue" /> : null}
      <h2 className="section-title text-[22px] font-semibold tracking-tight text-label">
        {title}
      </h2>
    </div>
  );
}
