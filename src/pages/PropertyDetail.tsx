import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Reveal, RevealText } from "@/components/Reveal";
import { PropertyCard } from "@/components/PropertyCard";
import { ContactForm } from "@/components/ContactForm";
import { img, properties } from "@/data/properties";
import NotFound from "./NotFound";

export default function PropertyDetail() {
  const { slug } = useParams();
  const p = properties.find((x) => x.slug === slug);
  const [active, setActive] = useState(0);
  if (!p) return <NotFound />;
  const related = properties.filter((x) => x.slug !== p.slug && (x.city === p.city || x.type === p.type)).slice(0, 2);
  const specs = [["Availability", p.status], ["Bedrooms", p.beds], ["Bathrooms", p.baths], ["Interior", `${p.area.toLocaleString()} sq ft`], ["Type", p.type], ["Built", p.year]];

  return (
    <Layout>
      <section className="relative h-[90svh] min-h-[560px] overflow-hidden">
        <img key={active} src={img(p.images[active], 1920)} alt={p.title} className="absolute inset-0 h-full w-full object-cover animate-fade-in" fetchPriority="high" />
        <div className="absolute inset-0 bg-overlay" />
        <div className="container-x relative flex h-full flex-col justify-end pb-10 text-on-media">
          <Link to="/properties" className="mb-8 flex w-fit items-center gap-2 font-display text-xs uppercase tracking-[0.25em] hover:text-primary"><ArrowLeft className="h-4 w-4" /> All properties</Link>
          <p className="eyebrow mb-4 text-on-media/80">{p.status} — {p.location}, {p.city}</p>
          <RevealText as="h1" text={p.title.toUpperCase()} className="text-[11vw] md:text-[7vw] font-extrabold leading-[0.88] tracking-tighter" />
          <div className="mt-8 flex gap-2 overflow-x-auto">
            {p.images.map((id, i) => (
              <button key={id + i} onClick={() => setActive(i)} aria-label={`Show photo ${i + 1}`} className={`h-16 w-24 shrink-0 overflow-hidden border-2 transition ${active === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}>
                <img src={img(id, 240)} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x grid gap-16 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-3">
            {specs.map(([k, v]) => <div key={k} className="bg-background p-6"><p className="eyebrow">{k}</p><p className="mt-2 font-display text-2xl font-bold">{v}</p></div>)}
          </div>
          <Reveal><p className="mt-14 text-lg leading-relaxed text-foreground/85">{p.description}</p></Reveal>
          <h2 className="mt-14 text-3xl">Features</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {p.features.map((f) => <li key={f} className="flex items-center gap-3 border-b border-border pb-3"><Check className="h-4 w-4 text-primary" />{f}</li>)}
          </ul>
          <div className="mt-14 grid grid-cols-2 gap-4">
            {p.images.slice(1, 3).map((id, i) => <Reveal key={id} variant="clip" delay={i * 150}><img src={img(id, 900)} alt={`${p.title} interior`} loading="lazy" className="aspect-[4/5] w-full object-cover" /></Reveal>)}
          </div>
        </div>
        <aside className="lg:col-span-5">
          <div className="sticky top-28 border border-border bg-card p-8">
            <p className="eyebrow">Private viewing</p>
            <p className="mt-2 font-display text-4xl font-extrabold text-primary">{formatPrice(p)}</p>
            <p className="mt-2 text-sm text-muted-foreground">Tell us when suits you and an agent will confirm within 24 hours.</p>
            <div className="mt-6"><ContactForm compact defaultMessage={`I'd like to view ${p.title}.`} /></div>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="container-x border-t border-border py-20">
          <h2 className="mb-10 text-4xl md:text-5xl">You may also like</h2>
          <div className="grid gap-8 md:grid-cols-2">{related.map((r) => <PropertyCard key={r.slug} p={r} />)}</div>
        </section>
      )}
    </Layout>
  );
}
