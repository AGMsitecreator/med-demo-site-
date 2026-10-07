import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { doctor, hours, nav } from "@/lib/site";

export function BookButton({ children = "Κλείστε Ραντεβού", variant = "solid", className = "" }: { children?: ReactNode; variant?: "solid" | "outline"; className?: string }) {
  const base = "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300";
  const v = variant === "solid"
    ? "bg-primary text-primary-foreground hover:bg-ink"
    : "border border-foreground/20 text-foreground hover:border-primary hover:text-primary";
  return <Link to="/rantevou" className={`${base} ${v} ${className}`}>{children}</Link>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link to="/" className="leading-tight" onClick={() => setOpen(false)}>
          <span className="block font-display text-xl text-foreground">{doctor.name}</span>
          <span className="block text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">Καρδιολόγος · {doctor.title}</span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-sm text-foreground" }} activeOptions={{ exact: true }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block"><BookButton /></div>
        <button className="lg:hidden text-foreground" aria-label="Μενού" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-page flex flex-col py-4">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b border-border/60 py-3 text-foreground">
                {n.label}
              </Link>
            ))}
            <div className="pt-4" onClick={() => setOpen(false)}><BookButton className="w-full" /></div>
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-page grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-display text-xl">{doctor.name}</p>
          <p className="mt-1 text-sm opacity-70">Καρδιολόγος · {doctor.title}</p>
        </div>
        <div className="text-sm opacity-80 space-y-1">
          <p className="mb-3 text-xs uppercase tracking-[0.18em] opacity-60">Επικοινωνία</p>
          <p>{doctor.address}</p>
          <p>Τ. {doctor.phone}</p>
          <p>{doctor.email}</p>
        </div>
        <div className="text-sm opacity-80 space-y-1">
          <p className="mb-3 text-xs uppercase tracking-[0.18em] opacity-60">Ωράριο</p>
          {hours.map((h) => <p key={h.d}>{h.d}: {h.h}</p>)}
        </div>
        <div className="text-sm space-y-1">
          <p className="mb-3 text-xs uppercase tracking-[0.18em] opacity-60">Πλοήγηση</p>
          {nav.map((n) => <Link key={n.to} to={n.to} className="block opacity-80 hover:opacity-100">{n.label}</Link>)}
          <Link to="/rantevou" className="block opacity-80 hover:opacity-100">Κλείστε Ραντεβού</Link>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs opacity-60 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {doctor.name}. Ιστοσελίδα επίδειξης — όλα τα στοιχεία είναι φανταστικά.</p>
          <div className="flex gap-5">
            <Link to="/politiki-aporritou" className="hover:opacity-100">Πολιτική Απορρήτου</Link>
            <Link to="/politiki-cookies" className="hover:opacity-100">Πολιτική Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="border-b border-border">
      <div className="container-page py-12 md:py-16 fade-up">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl text-foreground md:text-5xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>}
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl text-foreground md:text-4xl">{title}</h2>
      {intro && <p className="mt-4 leading-relaxed text-muted-foreground">{intro}</p>}
    </div>
  );
}

export function Timeline({ items }: { items: { y: string; t: string; p: string }[] }) {
  return (
    <ol className="relative border-l border-border pl-8">
      {items.map((i) => (
        <li key={i.t + i.y} className="relative pb-10 last:pb-0">
          <span className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-teal bg-background" />
          <p className="text-xs uppercase tracking-[0.16em] text-teal">{i.y}</p>
          <p className="mt-1 font-display text-xl text-foreground">{i.t}</p>
          <p className="mt-1 text-sm text-muted-foreground">{i.p}</p>
        </li>
      ))}
    </ol>
  );
}

export function MapPlaceholder() {
  return (
    <div className="flex aspect-[4/3] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-input bg-muted text-center">
      <p className="font-display text-lg text-foreground">Χάρτης τοποθεσίας</p>
      <p className="mt-1 text-sm text-muted-foreground">{doctor.address}</p>
      <p className="mt-3 text-xs text-muted-foreground">(Placeholder — εδώ θα ενσωματωθεί χάρτης)</p>
    </div>
  );
}

export function HoursList() {
  return (
    <dl className="divide-y divide-border">
      {hours.map((h) => (
        <div key={h.d} className="flex justify-between gap-4 py-3 text-sm">
          <dt className="text-muted-foreground">{h.d}</dt>
          <dd className="text-right text-foreground">{h.h}</dd>
        </div>
      ))}
    </dl>
  );
}

export function meta(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}

export const inputCls = "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";
