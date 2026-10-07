import { createFileRoute } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { BookButton, PageHeader, meta } from "@/components/site/Layout";
import { services } from "@/lib/site";

export const Route = createFileRoute("/ypiresies")({
  head: () => meta("Ιατρικές Υπηρεσίες — Καρδιολογικό Ιατρείο Νικολαΐδη", "Καρδιολογική εξέταση, ηλεκτροκαρδιογράφημα, υπερηχοκαρδιογράφημα, Holter ρυθμού και έλεγχος υπέρτασης."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader eyebrow="Ιατρικές Υπηρεσίες" title="Καρδιολογικός έλεγχος και παρακολούθηση" intro="Οι παρακάτω εξετάσεις πραγματοποιούνται στο ιατρείο. Η επιλογή τους γίνεται πάντα μετά από ιατρική εκτίμηση." />
      <section className="container-page py-16 md:py-20">
        <div className="divide-y divide-border border-y border-border">
          {services.map((s, i) => (
            <article key={s.t} className="grid gap-6 py-10 md:grid-cols-12 md:items-start">
              <p className="font-display text-sm text-teal md:col-span-1">{String(i + 1).padStart(2, "0")}</p>
              <div className="md:col-span-7">
                <h2 className="text-2xl text-foreground md:text-3xl">{s.t}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{s.d}</p>
                <p className="mt-4 flex gap-2 rounded-xl bg-muted p-4 text-sm text-foreground/80"><Info className="h-4 w-4 shrink-0 text-teal mt-0.5" />{s.info}</p>
              </div>
              <div className="md:col-span-4 md:text-right"><BookButton variant="outline" /></div>
            </article>
          ))}
        </div>
        <p className="mt-10 text-xs text-muted-foreground">Οι πληροφορίες έχουν ενημερωτικό χαρακτήρα και δεν υποκαθιστούν την ιατρική συμβουλή.</p>
      </section>
    </>
  );
}
