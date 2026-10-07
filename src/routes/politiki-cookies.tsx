import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, meta } from "@/components/site/Layout";

export const Route = createFileRoute("/politiki-cookies")({
  head: () => meta("Πολιτική Cookies — Ιατρείο Νικολαΐδη", "Πληροφορίες για τη χρήση cookies στην ιστοσελίδα (placeholder)."),
  component: () => (
    <>
      <PageHeader eyebrow="Νομικά" title="Πολιτική Cookies" />
      <section className="container-page max-w-3xl py-16 space-y-4 leading-relaxed text-muted-foreground">
        <p>Placeholder. Εδώ θα περιγράφονται τα cookies που χρησιμοποιεί η ιστοσελίδα, ο σκοπός τους και ο τρόπος διαχείρισής τους από τον επισκέπτη.</p>
      </section>
    </>
  ),
});
