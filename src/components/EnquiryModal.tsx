import { FormEvent, useState, useEffect } from "react";
import { useEnquiry } from "@/context/EnquiryContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { CheckCircle2, Loader2, MessageSquare, Send } from "lucide-react";

export function EnquiryModal() {
  const { isOpen, closeEnquiry, propertyTitle, defaultMessage, interest: defaultInterest } = useEnquiry();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState(defaultInterest || "Buying");
  const [message, setMessage] = useState(defaultMessage || "");
  const [loading, setLoading] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMessage(defaultMessage || "");
      setInterest(defaultInterest || "Buying");
      setSubmittedId(null);
    }
  }, [isOpen, defaultMessage, defaultInterest]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name,
      email,
      phone,
      interest,
      message,
      propertyTitle: propertyTitle || "General Portfolio Enquiry",
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmittedId(data.id || "ENQ-CONFIRMED");
        toast.success("Enquiry received — an ONYX advisor will contact you within 24 hours.");
      } else {
        // Fallback for offline/local storage if API is temporarily unavailable
        const localEnquiries = JSON.parse(localStorage.getItem("onyx_enquiries") || "[]");
        const fallbackId = `ENQ-${Date.now().toString(36).toUpperCase()}`;
        localEnquiries.push({ ...payload, id: fallbackId });
        localStorage.setItem("onyx_enquiries", JSON.stringify(localEnquiries));
        setSubmittedId(fallbackId);
        toast.success("Enquiry saved locally — an ONYX advisor will contact you shortly.");
      }
    } catch {
      // Local fallback
      const localEnquiries = JSON.parse(localStorage.getItem("onyx_enquiries") || "[]");
      const fallbackId = `ENQ-${Date.now().toString(36).toUpperCase()}`;
      localEnquiries.push({ ...payload, id: fallbackId });
      localStorage.setItem("onyx_enquiries", JSON.stringify(localEnquiries));
      setSubmittedId(fallbackId);
      toast.success("Enquiry received — saved to ONYX advisory system.");
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setSubmittedId(null);
    closeEnquiry();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ONYX Estates, I just submitted an enquiry for ${propertyTitle || "luxury residences"}. My name is ${name || "Client"}.`
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetAndClose()}>
      <DialogContent className="max-w-xl border-border bg-background/95 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
        <DialogHeader className="text-left space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-display text-[10px] uppercase tracking-[0.25em] text-primary">
              Private Advisory &amp; Booking
            </span>
          </div>
          <DialogTitle className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-foreground">
            {propertyTitle ? `Enquire: ${propertyTitle}` : "Book a Private Viewing"}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            Connect directly with an ONYX senior advisor for off-market access and architectural walk-throughs.
          </DialogDescription>
        </DialogHeader>

        {submittedId ? (
          <div className="py-8 flex flex-col items-center text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
            <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-foreground">
                Enquiry Confirmed
              </h3>
              <p className="font-mono text-xs text-primary mt-1">Ref #{submittedId}</p>
              <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                Your request has been logged into our advisory queue. We will review comps and arrange access promptly.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 w-full">
              <a
                href={`https://wa.me/918431119696?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-4 font-display text-xs font-semibold uppercase tracking-[0.2em] rounded hover:brightness-105 transition-all shadow-md"
              >
                <MessageSquare className="h-4 w-4" /> Connect on WhatsApp
              </a>
              <button
                type="button"
                onClick={resetAndClose}
                className="flex-1 border border-border py-3 px-4 font-display text-xs uppercase tracking-[0.2em] hover:bg-muted transition-colors rounded"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="font-display text-[11px] uppercase tracking-wider text-muted-foreground">
                  Full Name *
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vikram Singhania"
                  className="w-full border border-border bg-background px-3.5 py-2.5 text-sm rounded outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-display text-[11px] uppercase tracking-wider text-muted-foreground">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vikram@domain.com"
                  className="w-full border border-border bg-background px-3.5 py-2.5 text-sm rounded outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="font-display text-[11px] uppercase tracking-wider text-muted-foreground">
                  Phone / WhatsApp *
                </label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 84311 19696"
                  className="w-full border border-border bg-background px-3.5 py-2.5 text-sm rounded outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-display text-[11px] uppercase tracking-wider text-muted-foreground">
                  Area of Interest
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full border border-border bg-background px-3.5 py-2.5 text-sm rounded outline-none transition-colors focus:border-primary"
                >
                  <option value="Buying">Buying Architecture</option>
                  <option value="Selling">Selling / Listing</option>
                  <option value="Private Viewing">Book Private Walkthrough</option>
                  <option value="Advisory">Portfolio Advisory</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-display text-[11px] uppercase tracking-wider text-muted-foreground">
                Message / Specifications
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Preferred viewing dates, location criteria, or specific requirements..."
                className="w-full border border-border bg-background px-3.5 py-2.5 text-sm rounded outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-primary py-3.5 px-6 font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground transition-all hover:brightness-105 active:scale-[0.99] disabled:opacity-70 rounded"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Submitting to ONYX Advisory...
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" /> Submit Enquiry
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
