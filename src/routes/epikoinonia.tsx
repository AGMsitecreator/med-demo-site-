import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { inputCls, HoursList, MapPlaceholder, PageHeader, meta } from "@/components/site/Layout";
import { doctor } from "@/lib/site";

export const Route = createFileRoute("/epikoinonia")({
  head: () => meta("Επικοινωνία — Δρ. Ανδρέας Νικολαΐδης, Καρδιολόγος", "Διεύθυνση, τηλέφωνο, email, ωράριο και φόρμα επικοινωνίας του καρδιολογικού ιατρείου."),
  component: Page,
});


function Page() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader eyebrow="Επικοινωνία" title="Είμαστε στη διάθεσή σας" intro="Για πληροφορίες σχετικά με το ιατρείο ή τα ραντεβού, επικοινωνήστε τηλεφωνικά ή μέσω της φόρμας." />
      <section className="container-page grid gap-14 py-20 md:grid-cols-2">
        <div className="space-y-8">
          <div>
            <p className="font-display text-2xl text-foreground">{doctor.name}</p>
            <p className="text-sm text-muted-foreground">{doctor.specialty} · {doctor.title}</p>
          </div>
          <dl className="space-y-4 text-sm">
            {[["Διεύθυνση", `${doctor.address}, ${doctor.floor}`], ["Τηλέφωνο", doctor.phone], ["Email", doctor.email]].map(([k, v]) => (
              <div key={k}><dt className="eyebrow">{k}</dt><dd className="mt-1 text-foreground">{v}</dd></div>
            ))}
          </dl>
          <div><p className="eyebrow">Ωράριο</p><HoursList /></div>
          <MapPlaceholder />
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-10 h-fit">
          {sent ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-teal" />
              <p className="mt-4 font-display text-2xl text-foreground">Το μήνυμά σας στάλθηκε</p>
              <p className="mt-2 text-sm text-muted-foreground">Θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <h2 className="text-2xl text-foreground">Φόρμα επικοινωνίας</h2>
              <input required placeholder="Όνομα" className={inputCls} />
              <input required type="email" placeholder="Email" className={inputCls} />
              <input type="tel" placeholder="Τηλέφωνο" className={inputCls} />
              <textarea required rows={5} placeholder="Μήνυμα" className={inputCls} />
              <p className="text-xs text-muted-foreground">Παρακαλούμε μην συμπεριλαμβάνετε ευαίσθητες πληροφορίες υγείας στο μήνυμά σας.</p>
              <button className="w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-ink">Αποστολή</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
