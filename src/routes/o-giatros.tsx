import { createFileRoute } from "@tanstack/react-router";
import doctorImg from "@/assets/doctor.jpg";
import { BookButton, PageHeader, SectionTitle, Timeline, meta } from "@/components/site/Layout";
import { education, experience, expertise } from "@/lib/site";

export const Route = createFileRoute("/o-giatros")({
  head: () => meta("Ο Γιατρός — Δρ. Ανδρέας Νικολαΐδης, Καρδιολόγος", "Βιογραφικό, εκπαίδευση, επαγγελματική εμπειρία και φιλοσοφία του καρδιολόγου Δρ. Ανδρέα Νικολαΐδη."),
  component: Page,
});

const philosophy = [
  { t: "Ασθενοκεντρική προσέγγιση", d: "Κάθε απόφαση λαμβάνεται λαμβάνοντας υπόψη τις ανάγκες, τις ανησυχίες και τις προτιμήσεις του ασθενούς." },
  { t: "Τεκμηριωμένη ιατρική", d: "Η διάγνωση και η αγωγή βασίζονται στις τρέχουσες επιστημονικές οδηγίες και στη διαθέσιμη βιβλιογραφία." },
  { t: "Καλή επικοινωνία", d: "Σαφής εξήγηση των ευρημάτων και των επιλογών, ώστε ο ασθενής να συμμετέχει ενεργά στις αποφάσεις." },
  { t: "Εξατομικευμένη φροντίδα", d: "Το πλάνο παρακολούθησης προσαρμόζεται στο ιστορικό και τον τρόπο ζωής του κάθε ανθρώπου." },
];

function Page() {
  return (
    <>
      <PageHeader eyebrow="Ο Γιατρός" title="Δρ. Ανδρέας Νικολαΐδης, MD, PhD" intro="Καρδιολόγος με κλινική και ερευνητική εμπειρία στην καρδιαγγειακή πρόληψη και την αρτηριακή υπέρταση." />
      <section className="container-page grid gap-14 py-20 md:grid-cols-12">
        <img src={doctorImg} alt="Δρ. Ανδρέας Νικολαΐδης" width={1024} height={1280} className="aspect-[4/5] w-full rounded-2xl object-cover md:col-span-5" />
        <div className="md:col-span-7 space-y-5 leading-relaxed text-muted-foreground">
          <SectionTitle eyebrow="Βιογραφικό" title="Επαγγελματική παρουσίαση" />
          <p>Ο Δρ. Ανδρέας Νικολαΐδης γεννήθηκε στην Αθήνα. Αποφοίτησε από την Ιατρική Σχολή του Εθνικού και Καποδιστριακού Πανεπιστημίου Αθηνών και ολοκλήρωσε την ειδικότητα της Καρδιολογίας σε πανεπιστημιακή κλινική.</p>
          <p>Κάτοχος μεταπτυχιακού διπλώματος στην Καρδιαγγειακή Πρόληψη και διδακτορικού διπλώματος με αντικείμενο τη στρωματοποίηση κινδύνου σε ασθενείς με υπέρταση. Ακολούθησε κλινική εξειδίκευση στο Λονδίνο στην προληπτική καρδιολογία και την καρδιακή απεικόνιση.</p>
          <p>Εργάστηκε ως επιμελητής καρδιολογίας σε δημόσιο νοσοκομείο και από το 2018 διατηρεί ιδιωτικό ιατρείο στην Αθήνα. Τα επιστημονικά του ενδιαφέροντα περιλαμβάνουν την εκτίμηση καρδιαγγειακού κινδύνου, την αρτηριακή υπέρταση και το υπερηχοκαρδιογράφημα.</p>
          <p>Είναι μέλος ελληνικών και ευρωπαϊκών καρδιολογικών εταιρειών και συμμετέχει τακτικά σε προγράμματα συνεχιζόμενης ιατρικής εκπαίδευσης.</p>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="container-page grid gap-16 py-20 md:grid-cols-2">
          <div><SectionTitle eyebrow="Εκπαίδευση" title="Σπουδές" /><div className="mt-10"><Timeline items={education} /></div></div>
          <div><SectionTitle eyebrow="Εμπειρία" title="Επαγγελματική πορεία" /><div className="mt-10"><Timeline items={experience} /></div></div>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionTitle eyebrow="Τομείς εξειδίκευσης" title="Κλινικά ενδιαφέροντα" />
        <ul className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {expertise.map((e) => <li key={e.t} className="border-t border-border py-5 font-display text-lg text-foreground">{e.t}</li>)}
        </ul>
      </section>

      <section className="border-t border-border bg-teal-soft/40">
        <div className="container-page py-20">
          <SectionTitle eyebrow="Φιλοσοφία" title="Πώς προσεγγίζω την ιατρική πράξη" />
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {philosophy.map((p) => (
              <div key={p.t}>
                <div className="h-px w-10 bg-teal" />
                <h3 className="mt-5 text-xl text-foreground">{p.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-14"><BookButton /></div>
        </div>
      </section>
    </>
  );
}
