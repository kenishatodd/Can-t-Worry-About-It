import { cn } from "@/lib/utils";

interface ProgressDotsProps {
  total: number;
  current: number;
  className?: string;
}

const ProgressDots = ({ total, current, className }: ProgressDotsProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300",
            index < current
              ? "bg-primary"
              : index === current
              ? "bg-accent w-8"
              : "bg-muted"
          )}
        />
      ))}
    </div>
  );
};

export default ProgressDots;
