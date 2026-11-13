import { Layout } from "@/components/Layout";
import { Reveal, RevealText } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { img } from "@/data/properties";

export default function Contact() {
  return (
    <Layout>
      <section className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16 pt-32 pb-24 md:pt-40 items-start">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-6">Contact</p>
          <RevealText
            as="h1"
            text="START THE CONVERSATION."
            className="text-4xl sm:text-5xl md:text-5xl lg:text-4xl xl:text-5xl font-extrabold leading-[0.95] tracking-tight"
          />
          <Reveal delay={250} className="mt-12 space-y-8">
            <div>
              <p className="eyebrow mb-2">WhatsApp / Call</p>
              <a
                href="https://wa.me/918431119696"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-xl md:text-2xl text-[#25D366] hover:underline flex items-center gap-2"
              >
                <span>+91 84311 19696</span>
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">Office Phone</p>
              <a href="tel:+13105550182" className="font-display text-xl md:text-2xl hover:text-primary transition-colors">
                +1 (310) 555-0182
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">Email</p>
              <a href="mailto:hello@onyxestates.com" className="font-display text-xl md:text-2xl hover:text-primary transition-colors">
                hello@onyxestates.com
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">Visit</p>
              <p className="font-display text-xl md:text-2xl">Barakhamba Road, Connaught Place, New Delhi</p>
              <p className="text-sm text-muted-foreground mt-1">Mon–Sat, 9:30am–7:00pm</p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={200} className="border border-border bg-card p-6 sm:p-8 md:p-12 shadow-sm">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <div className="relative overflow-hidden h-[45vh] md:h-[55vh] w-full bg-muted">
        <img
          src={img("1560518883-ce09059eeffa", 1920)}
          alt="ONYX office keys handover"
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-overlay/20 pointer-events-none" />
      </div>
    </Layout>
  );
}
