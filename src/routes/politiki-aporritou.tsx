import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, meta } from "@/components/site/Layout";

export const Route = createFileRoute("/politiki-aporritou")({
  head: () => meta("Πολιτική Απορρήτου — Ιατρείο Νικολαΐδη", "Πολιτική απορρήτου και προστασίας προσωπικών δεδομένων (placeholder)."),
  component: () => (
    <>
      <PageHeader eyebrow="Νομικά" title="Πολιτική Απορρήτου" />
      <section className="container-page max-w-3xl py-16 space-y-4 leading-relaxed text-muted-foreground">
        <p>Placeholder. Εδώ θα δημοσιευθεί η πλήρης πολιτική απορρήτου σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (GDPR).</p>
        <p>Θα περιγράφονται τα δεδομένα που συλλέγονται, ο σκοπός επεξεργασίας, ο χρόνος διατήρησης και τα δικαιώματα των υποκειμένων.</p>
      </section>
    </>
  ),
});
