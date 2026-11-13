import { Layout } from "@/components/Layout";
import { Reveal, RevealText } from "@/components/Reveal";
import { agents, img } from "@/data/properties";

const values = [["Rare over plenty", "We represent fewer homes, chosen for design merit and build quality."], ["Data, then taste", "Every price is backed by hard comps; every campaign is art-directed."], ["Discretion", "A third of our sales close off-market, quietly and on your terms."]];

export default function About() {
  return (
    <Layout>
      <section className="container-x pt-32 pb-12 md:pt-40 md:pb-16">
        <p className="eyebrow mb-6">About ONYX</p>
        <RevealText as="h1" text="AN AGENCY BUILT LIKE A STUDIO." className="max-w-5xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.92] tracking-tighter" />
      </section>
      <div className="relative overflow-hidden h-[50vh] md:h-[65vh] w-full bg-muted">
        <img
          src={img("1486406146926-c627a92ad1ab", 1920)}
          alt="Modern architecture facade"
          className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
          loading="eager"
        />
        <div className="absolute inset-0 bg-overlay/20 pointer-events-none" />
      </div>
      <section className="container-x grid gap-12 py-24 md:grid-cols-12 md:py-32">
        <p className="eyebrow md:col-span-3">Our story</p>
        <div className="space-y-6 text-lg leading-relaxed text-foreground/85 md:col-span-8">
          <RevealText text="Founded in 2008 by architect-turned-broker Elena Vasquez." className="text-3xl md:text-5xl font-bold leading-tight text-foreground" />
          <Reveal><p>ONYX started with a simple belief: great architecture deserves representation that understands it. Today our team of 40 advisors works across six cities, pairing design literacy with sharp negotiation.</p></Reveal>
        </div>
      </section>
      <section className="border-y border-border">
        <div className="container-x grid gap-px bg-border md:grid-cols-3">
          {values.map(([t, d], i) => <Reveal key={t} delay={i * 120} className="bg-background p-10"><p className="font-display text-primary">0{i + 1}</p><h3 className="mt-6 text-3xl">{t}</h3><p className="mt-4 text-muted-foreground">{d}</p></Reveal>)}
        </div>
      </section>
      <section className="border-t border-border bg-card/40 py-24 md:py-32">
        <div className="container-x">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-8 md:mb-24">
            <div>
              <p className="eyebrow mb-6">The advisors</p>
              <RevealText text="The people behind the keys" className="max-w-3xl text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight" />
            </div>
            <Reveal><p className="max-w-xs text-sm leading-relaxed text-muted-foreground">A small bench of senior advisors — each one handpicked, each one accountable for a handful of clients at a time.</p></Reveal>
          </div>
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-3">
            {agents.map((a, i) => (
              <Reveal key={a.name} delay={i * 140} className={`group ${i % 3 === 1 ? "md:mt-20" : i % 3 === 2 ? "md:mt-10" : ""}`}>
                <div className="relative overflow-hidden border border-border/60">
                  <img src={img(a.photo, 900)} alt={a.name} loading="lazy" className="aspect-[3/4] w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-4 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="eyebrow text-primary">{a.role}</p>
                    <p className="mt-2 text-sm text-foreground/80">Private viewings &amp; off-market access</p>
                  </div>
                  <span className="absolute left-5 top-5 font-display text-sm tracking-widest text-foreground/70">0{i + 1}</span>
                </div>
                <div className="mt-6 flex items-baseline justify-between border-t border-border pt-5">
                  <h3 className="text-2xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary">{a.name}</h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{a.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
