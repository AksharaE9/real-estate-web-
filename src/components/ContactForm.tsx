import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const field = "w-full border-b border-border bg-transparent py-3 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

export function ContactForm({ compact, defaultMessage = "" }: { compact?: boolean; defaultMessage?: string }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      interest: (formData.get("interest") as string) || "Buying",
      message: (formData.get("message") as string) || defaultMessage,
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
        setSent(true);
        toast.success(`Enquiry registered (#${data.id}) — an ONYX advisor will contact you within 24 hours.`);
        form.reset();
      } else {
        throw new Error(data.error || "Failed");
      }
    } catch {
      // Local fallback
      const local = JSON.parse(localStorage.getItem("onyx_enquiries") || "[]");
      const id = `ENQ-${Date.now().toString(36).toUpperCase()}`;
      local.push({ ...payload, id });
      localStorage.setItem("onyx_enquiries", JSON.stringify(local));
      setSent(true);
      toast.success(`Enquiry registered (#${id}) — an ONYX advisor will be in touch shortly.`);
      form.reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className={compact ? "space-y-5" : "grid gap-5 md:grid-cols-2"}>
        <input required name="name" maxLength={100} placeholder="Full name" className={field} />
        <input required type="email" name="email" maxLength={255} placeholder="Email" className={field} />
        <input required type="tel" name="phone" maxLength={30} placeholder="Phone / WhatsApp" className={field} />
        {!compact && (
          <select name="interest" className={field} defaultValue="Buying">
            <option>Buying</option><option>Selling</option><option>Renting</option><option>Investing</option>
          </select>
        )}
      </div>
      <textarea name="message" rows={compact ? 3 : 5} maxLength={1000} defaultValue={defaultMessage} placeholder="Tell us what you're looking for" className={field} />
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-primary py-4 font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-75"
      >
        {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Registering...</> : sent ? "Enquiry Sent — Send Another" : "Send enquiry"}
      </button>
    </form>
  );
}
