import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 850;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const raw = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - raw, 3);
      setProgress(eased * 100);

      if (raw < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            setShouldRender(false);
          }, 700);
        }, 100);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 backdrop-blur-md transition-opacity duration-700 ease-out pointer-events-auto",
        isDone && "opacity-0 pointer-events-none"
      )}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center justify-center gap-5">
        {/* Minimalist Architectural Emblem */}
        <div className="relative flex h-12 w-12 items-center justify-center">
          <div className="absolute inset-0 rotate-45 border border-primary/30" />
          <div className="absolute inset-2 rotate-45 border-2 border-primary animate-pulse" />
          <span className="text-primary text-xs select-none">✦</span>
        </div>

        {/* Minimalist sleek progress indicator */}
        <div className="h-[2px] w-28 overflow-hidden rounded-full bg-border/60">
          <div
            className="h-full bg-primary rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
