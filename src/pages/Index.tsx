import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Reveal, RevealText } from "@/components/Reveal";
import { PropertyCard } from "@/components/PropertyCard";
import { HERO_VIDEO, img, properties } from "@/data/properties";
import { cn } from "@/lib/utils";
import { useEnquiry } from "@/context/EnquiryContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote: "They found us a home that wasn't even on the market — and closed in nineteen days.",
    author: "James & Ava Whitmore",
    location: "Bel Air, Los Angeles",
    role: "Private Residence Acquisition",
  },
  {
    quote: "ONYX represented our architectural home with the reverence of an art gallery. The cinematic film drew qualified buyers from Geneva to Tokyo.",
    author: "Julian & Claire Vance",
    location: "Tribeca, New York",
    role: "Penthouse Sale",
  },
  {
    quote: "Unrivaled market intellect and total discretion. When acquiring a landmark estate, their counsel was indispensable from first walk-through to keys.",
    author: "Mateo Soriano",
    location: "Coconut Grove, Miami",
    role: "Waterfront Villa Acquisition",
  },
  {
    quote: "Not just brokers — design curators. They understand spatial flow, provenance, and light better than any luxury firm in the world.",
    author: "Dr. Evelyn Ross",
    location: "Paradise Valley, Scottsdale",
    role: "Modernist Estate Purchase",
  },
];

const services = [
  ["Buy", "Off-market access to architectural homes, villas and penthouses across six cities."],
  ["Sell", "Cinematic marketing, global buyer networks and pricing built on hard data."],
  ["Rent", "Fully vetted, design-led rentals with white-glove leasing support."],
  ["Invest", "Development advisory and portfolio strategy for long-horizon investors."],
];

export default function Index() {
  const featured = properties.slice(0, 4);
  const { openEnquiry } = useEnquiry();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    setCurrentSlide(carouselApi.selectedScrollSnap());
    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);
  return (
    <Layout>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <video className="absolute inset-0 h-full w-full object-cover" src={HERO_VIDEO} poster={img("1600596542815-ffad4c1539a9", 1920)}
          autoPlay muted loop playsInline preload="metadata" aria-hidden />
        <div className="absolute inset-0 bg-overlay" />
        <div className="container-x relative flex h-full flex-col justify-end pb-14 md:pb-20 text-on-media">
          <p className="eyebrow mb-6 text-on-media/80 fade-up is-in">Luxury real estate — Est. 2008</p>
          <RevealText as="h1" text="LIVE IN ARCHITECTURE." className="max-w-6xl text-[6.6vw] md:text-[6.6vw] font-extrabold leading-[0.88] tracking-tighter" delay={200} />
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal delay={700}><p className="max-w-md text-base md:text-lg text-on-media/80">We curate the most distinctive homes on the market — and the people who deserve them.</p></Reveal>
            <Reveal delay={900} className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openEnquiry({ interest: "Buying", defaultMessage: "I would like to explore your curated portfolio of prime luxury residences." })}
                className="group flex items-center gap-3 bg-primary px-7 py-4 font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground hover:brightness-105 active:scale-95 transition-all"
              >
                Explore homes <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </button>
              <button
                type="button"
                onClick={() => openEnquiry({ interest: "Private Viewing", defaultMessage: "I would like to book a private architectural viewing." })}
                className="border border-on-media/40 px-7 py-4 font-display text-xs uppercase tracking-[0.2em] backdrop-blur-sm transition-colors hover:bg-on-media hover:text-scrim active:scale-95"
              >
                Book a viewing
              </button>
            </Reveal>
          </div>
          <ArrowDown className="absolute bottom-8 right-10 hidden h-5 w-5 animate-bounce md:block" />
        </div>
      </section>

      {/* SMALL TEXT CAROUSEL */}
      <div className="overflow-hidden border-y border-border bg-card/60 py-3.5 backdrop-blur-sm">
        <div className="marquee flex w-max gap-12 whitespace-nowrap font-display text-xs md:text-sm uppercase tracking-[0.25em] text-foreground/80 hover:[animation-play-state:paused]">
          {Array.from({ length: 3 }).flatMap((_, k) =>
            [
              "Rare Architectural Estates",
              "Discreet Off-Market Transactions",
              "Cinematic Architectural Film",
              "Provenance & Design Literacy",
              "Global Advisory Network",
              "Modernist Masterpieces",
            ].map((item, idx) => (
              <span key={`${item}-${k}-${idx}`} className="flex items-center gap-6">
                <span>{item}</span>
                <span className="text-primary opacity-60">✦</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* INTRO */}
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:gap-16 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <p className="eyebrow mb-6">(01) — Who we are</p>
            <RevealText
              text="We don't sell houses. We place people inside rare, well-made architecture."
              className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight"
            />
            <Reveal delay={250}>
              <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
                We curate the most distinctive residential properties on the market — architectural estates, modern villas, and landmark residences built for longevity and life.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <div className="relative">
              {/* Primary architectural photo */}
              <div className="relative overflow-hidden aspect-[4/5] bg-muted shadow-2xl border border-border">
                <img
                  src={img("1600585154340-be6161a56a0c", 1400)}
                  alt="Modern architectural residence"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                  <div>
                    <p className="font-display text-[10px] uppercase tracking-[0.2em] text-white/70">Featured Residence</p>
                    <p className="font-display text-base md:text-lg font-bold">Obsidian House · Golf Links, New Delhi</p>
                  </div>
                  <span className="font-display text-[10px] uppercase tracking-widest text-primary bg-background/90 px-2.5 py-1 backdrop-blur-sm">
                    Est. 2024
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-x py-24 md:py-32">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div><p className="eyebrow mb-4">(02) — Featured listings</p><RevealText text="Selected residences" className="text-5xl md:text-7xl font-extrabold" /></div>
          <Link to="/properties" className="group flex items-center gap-2 font-display text-xs uppercase tracking-[0.25em] hover:text-primary">View all {properties.length} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" /></Link>
        </div>
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 120}>
              <PropertyCard p={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* FILM */}
      <section className="relative overflow-hidden bg-black text-on-media py-24 md:py-32">
        {/* Cinematic background image */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={img("1613490493576-7fde63acd811", 1920)}
            alt="Cinematic architectural estate"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="container-x relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
            <div className="max-w-3xl">
              <p className="eyebrow mb-6 text-on-media/80">(03) — The ONYX standard</p>
              <RevealText
                text="Every listing gets a film, not a photo shoot."
                className="text-4xl md:text-7xl font-extrabold leading-[0.95]"
              />
            </div>
            <Reveal delay={200} className="md:max-w-xs">
              <p className="text-sm md:text-base text-on-media/75 leading-relaxed">
                4K cinema cameras, aerial cinematography, and narrative direction for every exclusive residence.
              </p>
            </Reveal>
          </div>

          {/* Curated film stills photo gallery */}
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                id: "1600607687939-ce8a6c25118c",
                tag: "Frame 01 · Interior Lighting",
                desc: "Anamorphic framing of open-plan living volumes",
              },
              {
                id: "1600596542815-ffad4c1539a9",
                tag: "Frame 02 · Twilight Drone",
                desc: "Aerial dusk capture over infinity pool edge",
              },
              {
                id: "1580587771525-78b9dba3b914",
                tag: "Frame 03 · Detail & Material",
                desc: "Tactile natural stone, timber, and glass finishes",
              },
            ].map((frame, i) => (
              <Reveal key={frame.tag} delay={i * 140} variant="clip">
                <div className="group relative overflow-hidden border border-white/10 bg-card/40 backdrop-blur-sm">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={img(frame.id, 900)}
                      alt={frame.tag}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute top-3 left-3 bg-black/60 px-2.5 py-1 font-display text-[9px] uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                      {frame.tag}
                    </span>
                  </div>
                  <div className="p-4 border-t border-white/10">
                    <p className="text-xs text-muted-foreground">{frame.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-x py-24 md:py-32">
        <p className="eyebrow mb-12">(04) — Services</p>
        <div className="border-t border-border">
          {services.map(([t, d], i) => (
            <Reveal key={t} delay={i * 80}>
              <button
                type="button"
                onClick={() =>
                  openEnquiry({
                    interest: t,
                    defaultMessage: `I am inquiring about ${t} services with ONYX Estates: ${d}`,
                  })
                }
                className="w-full text-left group grid items-center gap-4 border-b border-border py-8 transition-colors hover:bg-card md:grid-cols-12 md:px-4 cursor-pointer"
              >
                <span className="font-display text-sm text-muted-foreground md:col-span-1">0{i + 1}</span>
                <h3 className="text-5xl md:text-7xl font-extrabold transition-all duration-500 group-hover:translate-x-4 group-hover:text-primary md:col-span-5">{t}</h3>
                <p className="text-muted-foreground md:col-span-5">{d}</p>
                <ArrowUpRight className="hidden h-8 w-8 justify-self-end transition-transform group-hover:rotate-45 group-hover:text-primary md:col-span-1 md:block" />
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS CAROUSEL */}
      <section className="border-t border-border bg-card/20 py-24 md:py-36">
        <div className="container-x max-w-5xl mx-auto flex flex-col items-center text-center">
          <p className="eyebrow mb-4 text-primary tracking-[0.3em]">(05) — Client Reflections</p>
          <p className="font-display text-7xl md:text-8xl leading-none text-primary mb-6 select-none">“</p>

          <Carousel
            setApi={setCarouselApi}
            opts={{ loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((t, idx) => (
                <CarouselItem key={idx}>
                  <div className="flex flex-col items-center justify-center px-4 md:px-12 py-2">
                    <blockquote className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight max-w-4xl tracking-tight text-foreground">
                      "{t.quote}"
                    </blockquote>
                    <div className="mt-10 flex flex-col items-center gap-2">
                      <p className="font-display text-sm md:text-base uppercase tracking-[0.25em] text-foreground font-semibold">
                        — {t.author}
                      </p>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        {t.location} · <span className="text-primary">{t.role}</span>
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Centered Controls and Indicators */}
            <div className="mt-12 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => carouselApi?.scrollPrev()}
                className="h-11 w-11 rounded-full border border-border bg-background flex items-center justify-center transition-all hover:border-primary hover:text-primary hover:scale-105 active:scale-95 shadow-sm"
                aria-label="Previous review"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => carouselApi?.scrollTo(i)}
                    className={cn(
                      "h-1.5 transition-all duration-300 rounded-full",
                      currentSlide === i ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                    )}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => carouselApi?.scrollNext()}
                className="h-11 w-11 rounded-full border border-border bg-background flex items-center justify-center transition-all hover:border-primary hover:text-primary hover:scale-105 active:scale-95 shadow-sm"
                aria-label="Next review"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Carousel>
        </div>
      </section>
    </Layout>
  );
}
