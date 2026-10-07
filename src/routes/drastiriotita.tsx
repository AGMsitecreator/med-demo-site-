import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PageHeader, meta } from "@/components/site/Layout";
import { activities, type Activity } from "@/lib/site";

export const Route = createFileRoute("/drastiriotita")({
  head: () => meta("Επιστημονική & Επαγγελματική Δραστηριότητα — Δρ. Νικολαΐδης", "Δημοσιεύσεις, συνέδρια, ομιλίες, έρευνα και διακρίσεις του καρδιολόγου Δρ. Ανδρέα Νικολαΐδη."),
  component: Page,
});

const cats: ("Όλα" | Activity["cat"])[] = ["Όλα", "Δημοσιεύσεις", "Συνέδρια", "Ομιλίες", "Έρευνα", "Βραβεία & Διακρίσεις"];

function Page() {
  const [cat, setCat] = useState<(typeof cats)[number]>("Όλα");
  const [open, setOpen] = useState<string | null>(null);
  const list = activities.filter((a) => cat === "Όλα" || a.cat === cat);
  return (
    <>
      <PageHeader eyebrow="Επιστημονική & Επαγγελματική Δραστηριότητα" title="Έρευνα, εκπαίδευση και συνεχής ενημέρωση" intro="Επιλεγμένα στοιχεία από το επιστημονικό έργο και τη συμμετοχή σε συνέδρια και εκπαιδευτικές δράσεις." />
      <section className="container-page py-16">
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-4 py-2 text-sm transition-colors ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {list.map((a) => (
            <article key={a.t} className="grid gap-4 py-8 md:grid-cols-12">
              <div className="md:col-span-3">
                <p className="font-display text-3xl text-foreground">{a.y}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-teal">{a.cat}</p>
              </div>
              <div className="md:col-span-9">
                <p className="text-sm text-muted-foreground">{a.label} — {a.y}</p>
                <h2 className="mt-2 text-2xl leading-snug text-foreground">«{a.t}»</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{a.d}</p>
                {open === a.t && <p className="mt-3 rounded-xl bg-muted p-4 text-sm text-muted-foreground">Ενδεικτική καταχώρηση για το demo. Εδώ μπορούν να προστεθούν πλήρη βιβλιογραφικά στοιχεία, DOI ή σύνδεσμος προς την πηγή.</p>}
                <button onClick={() => setOpen(open === a.t ? null : a.t)} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  {open === a.t ? "Λιγότερα" : "Μάθετε περισσότερα"} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
