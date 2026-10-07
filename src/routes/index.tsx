import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Phone, Clock } from "lucide-react";
import doctorImg from "@/assets/doctor.jpg";
import receptionImg from "@/assets/reception.jpg";
import { BookButton, SectionTitle, Timeline, meta, HoursList } from "@/components/site/Layout";
import { activities, doctor, expertise, experience, education } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => meta("Δρ. Ανδρέας Νικολαΐδης — Καρδιολόγος, Αθήνα", "Καρδιολογικό ιατρείο στην Αθήνα. Γνωρίστε τον γιατρό, τις υπηρεσίες και κλείστε ραντεβού online."),
  component: Home,
});

function Home() {
  const milestones = [education[0], education[1], education[3], experience[0]].filter((x): x is NonNullable<typeof x> => !!x);
  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="container-page grid items-start gap-10 py-12 md:grid-cols-12 md:py-16 fade-up">
          <div className="md:col-span-4">
            <p className="eyebrow">{doctor.specialty} · {doctor.city}</p>
            <h1 className="mt-3 text-3xl leading-tight text-foreground md:text-4xl">Δρ. Ανδρέας Νικολαΐδης</h1>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{doctor.title}</p>
            <img src={doctorImg} alt="Δρ. Ανδρέας Νικολαΐδης" width={1024} height={1280} className="mt-6 aspect-[4/5] w-full max-w-xs rounded-2xl object-cover shadow-soft" />
          </div>
          <div className="space-y-5 leading-relaxed text-muted-foreground md:col-span-8 md:pt-8">
            <p className="eyebrow">Σχετικά με τον γιατρό</p>
            <p>Ο Δρ. Ανδρέας Νικολαΐδης είναι απόφοιτος της Ιατρικής Σχολής του Πανεπιστημίου Αθηνών, με ειδικότητα στην Καρδιολογία και διδακτορικό δίπλωμα στον τομέα της καρδιαγγειακής πρόληψης.</p>
            <p>Έχει εργαστεί σε πανεπιστημιακή κλινική και δημόσιο νοσοκομείο στην Ελλάδα, ενώ ολοκλήρωσε κλινική εξειδίκευση στο εξωτερικό. Από το 2018 διατηρεί ιδιωτικό ιατρείο στην Αθήνα.</p>
            <p>Η προσέγγισή του βασίζεται στην τεκμηριωμένη ιατρική, στη σαφή επικοινωνία και στον χρόνο που αφιερώνεται σε κάθε ασθενή.</p>
            <div className="flex flex-wrap items-center gap-5 pt-3">
              <BookButton />
              <Link to="/o-giatros" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
                Μάθετε περισσότερα <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12 md:py-16">
        <SectionTitle eyebrow="Τομείς εξειδίκευσης" title="Πεδία κλινικής δραστηριότητας" />
        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {expertise.map((e, i) => (
            <div key={e.t} className="group bg-card p-6 transition-colors hover:bg-teal-soft/50">
              <p className="font-display text-sm text-teal">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-xl text-foreground">{e.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="container-page grid gap-12 py-20 md:grid-cols-2 md:py-28">
          <SectionTitle eyebrow="Επαγγελματική πορεία" title="Σημαντικοί σταθμοί" intro="Από τις σπουδές και την ειδικότητα έως την ιδιωτική πρακτική." />
          <Timeline items={milestones} />
        </div>
      </section>

      <section className="container-page py-12 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle eyebrow="Επιστημονική δραστηριότητα" title="Δημοσιεύσεις, συνέδρια και ομιλίες" />
          <Link to="/drastiriotita" className="inline-flex items-center gap-2 text-sm font-medium text-primary">Όλη η δραστηριότητα <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[0, 5, 8].map((i) => activities[i]!).map((a) => (
            <article key={a.t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <p className="text-xs uppercase tracking-[0.16em] text-teal">{a.label} — {a.y}</p>
              <h3 className="mt-4 text-xl leading-snug text-foreground">{a.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.d}</p>
            </article>
          ))}
        </div>
      </section>


      <section className="border-t border-border bg-card">
        <div className="container-page grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <img src={receptionImg} alt="Χώρος υποδοχής ιατρείου" loading="lazy" width={1280} height={896} className="aspect-[4/3] w-full rounded-2xl object-cover" />
          <div>
            <div className="max-w-2xl">
              <p className="eyebrow">Το ιατρείο</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">Το ιατρείο βρίσκεται στο κέντρο της Αθήνας και διαθέτει τον απαραίτητο εξοπλισμό για ολοκληρωμένο καρδιολογικό έλεγχο.</p>
            </div>
            <div className="mt-8 space-y-4 text-sm">
              <p className="flex gap-3 text-foreground"><MapPin className="h-4 w-4 text-teal mt-0.5" />{doctor.address}</p>
              <p className="flex gap-3 text-foreground"><Phone className="h-4 w-4 text-teal mt-0.5" />{doctor.phone} · {doctor.email}</p>
              <div className="flex gap-3"><Clock className="h-4 w-4 text-teal mt-3" /><div className="flex-1"><HoursList /></div></div>
            </div>
            <Link to="/iatreio" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">Γνωρίστε το ιατρείο <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-ink text-ink-foreground">
        <div className="container-page py-20 text-center md:py-24">
          <h2 className="text-3xl md:text-5xl">Προγραμματίστε το ραντεβού σας</h2>
          <p className="mx-auto mt-4 max-w-lg opacity-70">Επιλέξτε υπηρεσία, ημερομηνία και ώρα σε λίγα απλά βήματα.</p>
          <Link to="/rantevou" className="mt-8 inline-flex rounded-full bg-ink-foreground px-7 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90">Κλείστε Ραντεβού</Link>
        </div>
      </section>
    </>
  );
}
