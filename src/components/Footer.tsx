import { Link } from "react-router-dom";
import { useEnquiry } from "@/context/EnquiryContext";

export function Footer() {
  const { openEnquiry } = useEnquiry();

  return (
    <footer className="border-t border-border">
      <div className="container-x py-20">
        <button
          type="button"
          onClick={() => openEnquiry({ defaultMessage: "I am ready to speak with an ONYX principal advisor." })}
          className="group block text-left w-full cursor-pointer"
        >
          <p className="eyebrow mb-6">Ready when you are</p>
          <p className="font-display text-[8.4vw] md:text-[7.6vw] font-extrabold leading-[0.85] tracking-tighter transition-colors group-hover:text-primary">LET'S TALK<span className="text-primary group-hover:text-foreground">→</span></p>
        </button>
        <div className="mt-20 grid gap-10 border-t border-border pt-10 text-sm text-muted-foreground md:grid-cols-4">
          <div><p className="font-display text-lg font-extrabold text-foreground">ONYX<span className="text-primary">.</span>ESTATES</p><p className="mt-3">Architectural homes, curated.</p></div>
          <div><p className="eyebrow mb-3">Office</p><p>Barakhamba Road, Connaught Place<br />New Delhi 110001, India</p></div>
          <div><p className="eyebrow mb-3">Contact</p><p><a href="https://wa.me/918431119696" target="_blank" rel="noopener noreferrer" className="hover:text-primary">WhatsApp: +91 84311 19696</a><br />hello@onyxestates.com</p></div>
          <div><p className="eyebrow mb-3">Explore</p><div className="flex flex-col gap-1"><Link to="/properties" className="hover:text-primary">Properties</Link><Link to="/about" className="hover:text-primary">About</Link><button type="button" onClick={() => openEnquiry()} className="text-left hover:text-primary">Enquire Now</button></div></div>
        </div>
        <p className="mt-16 text-xs text-muted-foreground">© {new Date().getFullYear()} ONYX Estates. All rights reserved.</p>
      </div>
    </footer>
  );
}
