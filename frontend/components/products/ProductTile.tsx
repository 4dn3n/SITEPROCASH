import { getEquipmentTile } from "@/lib/tileStyles";
import { cn } from "@/lib/utils";

export function ProductTile({
  category,
  className,
  iconClassName,
}: {
  category: string;
  className?: string;
  iconClassName?: string;
}) {
  const { icon: Icon, gradient } = getEquipmentTile(category);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl",
        gradient,
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_55%)]" />
      <Icon className={cn("relative h-1/3 w-1/3 text-white/90", iconClassName)} strokeWidth={1.25} />
    </div>
  );
}
