import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEnquiry } from "@/context/EnquiryContext";

const links = [{ to: "/properties", label: "Properties" }, { to: "/about", label: "About" }, { to: "/contact", label: "Contact" }];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { openEnquiry } = useEnquiry();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500 bg-background/90 backdrop-blur-md", scrolled || open ? "border-b border-border" : "border-b border-transparent")}>
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="font-display text-xl font-extrabold tracking-tight">ONYX<span className="text-primary">.</span>ESTATES</Link>
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => cn("font-display text-xs uppercase tracking-[0.25em] transition-colors hover:text-primary", isActive && "text-primary")}>{l.label}</NavLink>
          ))}
          <button
            type="button"
            onClick={() => openEnquiry({ interest: "Private Viewing", defaultMessage: "I would like to book a private architectural viewing." })}
            className="bg-primary px-5 py-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-transform hover:-translate-y-0.5 active:scale-95"
          >
            Book a viewing
          </button>
        </nav>
        <button className="md:hidden font-display text-xs uppercase tracking-[0.25em]" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open ? "Close" : "Menu"}</button>
      </div>
      <div className={cn("md:hidden overflow-hidden transition-[max-height] duration-500", open ? "max-h-96" : "max-h-0")}>
        <nav className="container-x flex flex-col gap-6 pb-10 pt-4">
          {links.map((l) => <Link key={l.to} to={l.to} className="font-display text-4xl font-bold">{l.label}</Link>)}
        </nav>
      </div>
    </header>
  );
}
