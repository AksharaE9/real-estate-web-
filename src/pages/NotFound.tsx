import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <section className="container-x flex min-h-[80vh] flex-col items-start justify-center pt-24">
        <p className="font-display text-[30vw] md:text-[18vw] font-extrabold leading-none outline-text">404</p>
        <p className="mt-4 text-xl">This address isn't on our books.</p>
        <Link to="/properties" className="mt-8 bg-primary px-7 py-4 font-display text-xs uppercase tracking-[0.2em] text-primary-foreground">Browse properties</Link>
      </section>
    </Layout>
  );
}
