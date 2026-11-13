import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { Reveal, RevealText } from "@/components/Reveal";
import { PropertyCard } from "@/components/PropertyCard";
import { properties } from "@/data/properties";
import { cn } from "@/lib/utils";

const statuses = ["All", "For Sale", "For Rent"] as const;
const types = ["All", "Villa", "Penthouse", "Apartment", "Townhouse"] as const;
const cities = ["All", ...Array.from(new Set(properties.map((p) => p.city)))];

function Chips({ items, value, onChange }: { items: readonly string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => (
        <button key={i} onClick={() => onChange(i)} className={cn("border px-4 py-2 font-display text-[11px] uppercase tracking-[0.2em] transition-colors", value === i ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground")}>{i}</button>
      ))}
    </div>
  );
}

export default function Properties() {
  const [status, setStatus] = useState<(typeof statuses)[number]>("All");
  const [type, setType] = useState<(typeof types)[number]>("All");
  const [city, setCity] = useState("All");
  const [sort, setSort] = useState("featured");
  const list = useMemo(() => {
    const r = properties.filter((p) => (status === "All" || p.status === status) && (type === "All" || p.type === type) && (city === "All" || p.city === city));
    if (sort === "size") r.sort((a, b) => b.area - a.area);
    return r;
  }, [status, type, city, sort]);

  return (
    <Layout>
      <section className="container-x pt-36 pb-12 md:pt-44">
        <p className="eyebrow mb-6">Portfolio — {properties.length} residences</p>
        <RevealText as="h1" text="ALL PROPERTIES" className="text-[8.4vw] md:text-[7vw] font-extrabold leading-[0.85] tracking-tighter" />
      </section>
      <section className="container-x">
        <div className="grid gap-6 border-y border-border py-8 lg:grid-cols-[auto_auto_1fr_auto] lg:items-center lg:gap-10">
          <Chips items={statuses} value={status} onChange={(v) => setStatus(v as typeof status)} />
          <Chips items={types} value={type} onChange={(v) => setType(v as typeof type)} />
          <select value={city} onChange={(e) => setCity(e.target.value)} aria-label="City" className="h-10 border border-border bg-background px-3 text-sm lg:justify-self-end">
            {cities.map((c) => <option key={c} value={c}>{c === "All" ? "All cities" : c}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort" className="h-10 border border-border bg-background px-3 text-sm">
            <option value="featured">Featured</option><option value="size">Largest first</option>
          </select>
        </div>
        <p className="py-6 text-sm text-muted-foreground">{list.length} result{list.length !== 1 && "s"}</p>
        {list.length ? (
          <div className="grid gap-x-8 gap-y-14 pb-28 md:grid-cols-2 xl:grid-cols-3">
            {list.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 100}><PropertyCard p={p} index={i} /></Reveal>)}
          </div>
        ) : (
          <div className="pb-28 pt-10 text-center">
            <p className="font-display text-3xl">No homes match those filters.</p>
            <button onClick={() => { setStatus("All"); setType("All"); setCity("All"); }} className="mt-6 text-primary underline">Clear filters</button>
          </div>
        )}
      </section>
    </Layout>
  );
}
