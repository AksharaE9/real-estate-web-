import { ArrowUpRight } from "lucide-react";
import { Property, img } from "@/data/properties";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useEnquiry } from "@/context/EnquiryContext";

export function PropertyCard({ p, index, tall }: { p: Property; index?: number; tall?: boolean }) {
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openEnquiry({
      propertyTitle: `${p.title} (${p.location}, ${p.city})`,
      interest: p.status === "For Rent" ? "Renting" : "Buying",
      defaultMessage: `I would like to inquire about ${p.title} in ${p.location}, ${p.city} and schedule a private viewing.`,
    });
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openEnquiry({
            propertyTitle: `${p.title} (${p.location}, ${p.city})`,
            interest: p.status === "For Rent" ? "Renting" : "Buying",
            defaultMessage: `I would like to inquire about ${p.title} in ${p.location}, ${p.city} and schedule a private viewing.`,
          });
        }
      }}
      className="group block cursor-pointer text-left focus:outline-none"
    >
      <div
        ref={cardRef}
        className={cn(
          "relative overflow-hidden bg-muted",
          tall ? "aspect-[3/4]" : "aspect-[4/3]"
        )}
      >
        {/* Photo with scroll reveal animation */}
        <div
          className="h-full w-full overflow-hidden transition-[clip-path] duration-1000 ease-out"
          style={{
            clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
          }}
        >
          <img
            src={img(p.images[0], 1000)}
            alt={`${p.title}, ${p.location}`}
            loading="lazy"
            decoding="async"
            className={cn(
              "h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105",
              inView ? "scale-100" : "scale-110"
            )}
          />
        </div>
        <div className="absolute inset-0 bg-overlay opacity-60 pointer-events-none" />
        <span className="absolute left-4 top-4 bg-background px-3 py-1 font-display text-[10px] uppercase tracking-[0.2em]">
          {p.status}
        </span>
        {index !== undefined && (
          <span className="absolute right-4 top-3 font-display text-sm text-foreground/80">
            /{String(index + 1).padStart(2, "0")}
          </span>
        )}
        <span className="absolute bottom-4 right-4 flex h-12 w-12 translate-y-4 items-center justify-center bg-primary text-primary-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
      <div className="flex items-start justify-between gap-4 border-b border-border py-5">
        <div>
          <h3 className="text-xl md:text-2xl transition-colors group-hover:text-primary">
            {p.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {p.location}, {p.city}
          </p>
          <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
            {p.beds} Bed · {p.baths} Bath · {p.area.toLocaleString()} sq ft
          </p>
        </div>
        <span className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-primary mt-1 flex items-center gap-1 shrink-0">
          Enquire <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </div>
  );
}
