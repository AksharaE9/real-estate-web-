import { ElementType, ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: 0.05, rootMargin: "0px 0px 100px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

/** Word-by-word masked text reveal */
export function RevealText({ text, as: Tag = "h2", className, delay = 0 }: { text: string; as?: ElementType; className?: string; delay?: number }) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <Tag ref={ref} className={cn(inView && "is-in", className)} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="word-mask" aria-hidden>
          <span className="word-inner" style={{ transitionDelay: `${delay + i * 70}ms` }}>{w}{i < text.split(" ").length - 1 ? "\u00A0" : ""}</span>
        </span>
      ))}
    </Tag>
  );
}

export function Reveal({ children, className, delay = 0, variant = "fade" }: { children: ReactNode; className?: string; delay?: number; variant?: "fade" | "clip" }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={cn(variant === "fade" ? "fade-up" : "clip-reveal", inView && "is-in", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
