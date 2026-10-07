import { createFileRoute } from "@tanstack/react-router";
import { Accessibility, Mail, MapPin, Phone } from "lucide-react";
import receptionImg from "@/assets/reception.jpg";
import examImg from "@/assets/exam-room.jpg";
import equipImg from "@/assets/equipment.jpg";
import { BookButton, HoursList, MapPlaceholder, PageHeader, SectionTitle, meta } from "@/components/site/Layout";
import { doctor } from "@/lib/site";

export const Route = createFileRoute("/iatreio")({
  head: () => meta("Το Ιατρείο — Καρδιολογικό Ιατρείο στην Αθήνα", "Χώρος υποδοχής, εξεταστήριο, εξοπλισμός, τοποθεσία, ωράριο και πρόσβαση στο ιατρείο του Δρ. Νικολαΐδη."),
  component: Page,
});

const rooms = [
  { img: receptionImg, t: "Χώρος υποδοχής", d: "Ένας φωτεινός και ήσυχος χώρος αναμονής, σχεδιασμένος για την άνεση των επισκεπτών." },
  { img: examImg, t: "Εξεταστήριο", d: "Πλήρως εξοπλισμένο εξεταστήριο για κλινική εξέταση, ΗΚΓ και υπερηχοκαρδιογράφημα." },
  { img: equipImg, t: "Εξοπλισμός", d: "Σύγχρονος υπερηχοκαρδιογράφος, ηλεκτροκαρδιογράφος και συσκευές καταγραφής Holter." },
];

function Page() {
  return (
    <>
      <PageHeader eyebrow="Το Ιατρείο" title="Σύγχρονος χώρος στο κέντρο της Αθήνας" intro="Το ιατρείο έχει σχεδιαστεί ώστε να προσφέρει ένα ήρεμο περιβάλλον και τον απαραίτητο εξοπλισμό για ολοκληρωμένο καρδιολογικό έλεγχο." />
      <section className="container-page space-y-20 py-20">
        {rooms.map((r, i) => (
          <div key={r.t} className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>img]:order-2" : ""}`}>
            <img src={r.img} alt={r.t} loading="lazy" width={1280} height={896} className="aspect-[4/3] w-full rounded-2xl object-cover" />
            <div>
              <p className="font-display text-sm text-teal">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 text-3xl text-foreground">{r.t}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{r.d}</p>
            </div>
          </div>
        ))}
      </section>
      <section className="border-t border-border bg-card">
        <div className="container-page grid gap-12 py-20 md:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Πληροφορίες" title="Τοποθεσία & ωράριο" />
            <div className="mt-8 space-y-4 text-sm text-foreground">
              <p className="flex gap-3"><MapPin className="h-4 w-4 text-teal mt-0.5" />{doctor.address}, {doctor.floor}</p>
              <p className="flex gap-3"><Phone className="h-4 w-4 text-teal mt-0.5" />{doctor.phone}</p>
              <p className="flex gap-3"><Mail className="h-4 w-4 text-teal mt-0.5" />{doctor.email}</p>
              <p className="flex gap-3 text-muted-foreground"><Accessibility className="h-4 w-4 text-teal mt-0.5" />Το κτίριο διαθέτει ανελκυστήρα και ράμπα πρόσβασης. Πλησιέστερος σταθμός μετρό: Μέγαρο Μουσικής (5 λεπτά με τα πόδια).</p>
            </div>
            <div className="mt-8"><HoursList /></div>
            <div className="mt-8"><BookButton /></div>
          </div>
          <MapPlaceholder />
        </div>
      </section>
    </>
  );
}
