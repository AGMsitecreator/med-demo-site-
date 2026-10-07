import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, CalendarCheck } from "lucide-react";
import { PageHeader, inputCls, meta } from "@/components/site/Layout";
import { bookingServices, doctor } from "@/lib/site";

export const Route = createFileRoute("/rantevou")({
  head: () => meta("Κλείστε Ραντεβού — Δρ. Ανδρέας Νικολαΐδης, Καρδιολόγος", "Κλείστε online ραντεβού στο καρδιολογικό ιατρείο σε πέντε απλά βήματα."),
  component: Page,
});

const steps = ["Υπηρεσία", "Ημερομηνία", "Ώρα", "Στοιχεία", "Επιβεβαίωση"];
const months = ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"];
const wd = ["Δε", "Τρ", "Τε", "Πε", "Πα", "Σα", "Κυ"];
const morning = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00"];
const evening = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30"];

const fmt = (d: Date) => d.toLocaleDateString("el-GR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
// deterministic mock "booked" slots
const booked = (d: Date, t: string) => (d.getDate() * 7 + t.charCodeAt(1) + t.charCodeAt(3)) % 4 === 0;

function Page() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [info, setInfo] = useState({ first: "", last: "", email: "", phone: "", msg: "" });
  const [done, setDone] = useState(false);
  const today = useMemo(() => { const t = new Date(); t.setHours(0, 0, 0, 0); return t; }, []);
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const days = useMemo(() => {
    const first = (view.getDay() + 6) % 7;
    const n = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    return [...Array(first).fill(null), ...Array.from({ length: n }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1))];
  }, [view]);
  const available = (d: Date) => d > today && d.getDay() !== 0 && d.getDay() !== 6;
  const slots = date ? (date.getDay() >= 1 && date.getDay() <= 3 ? [...morning, ...evening] : morning) : [];
  const infoOk = info.first && info.last && /\S+@\S+\.\S+/.test(info.email) && info.phone.length >= 10;
  const canNext = [service, date, time, infoOk, true][step];

  if (done) {
    return (
      <section className="container-page max-w-2xl py-24 text-center fade-up">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-soft"><CalendarCheck className="h-7 w-7 text-teal" /></div>
        <h1 className="mt-6 text-4xl text-foreground">Το αίτημα για το ραντεβού σας καταχωρήθηκε.</h1>
        <p className="mt-4 text-muted-foreground">Θα λάβετε επιβεβαίωση στο {info.email}. Για αλλαγές ή ακύρωση επικοινωνήστε με το ιατρείο.</p>
        <Summary {...{ service, date, time }} name={`${info.first} ${info.last}`} />
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Στοιχεία ιατρείου</p>
          <p className="mt-2">{doctor.address}, {doctor.floor}</p>
          <p>Τ. {doctor.phone} · {doctor.email}</p>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">Ιστοσελίδα επίδειξης — δεν πραγματοποιήθηκε πραγματική κράτηση.</p>
      </section>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Online ραντεβού" title="Κλείστε Ραντεβού" intro="Ολοκληρώστε την κράτηση σε πέντε απλά βήματα." />
      <section className="container-page max-w-4xl py-14">
        <ol className="flex items-center gap-2">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-1 items-center gap-2">
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs transition-colors ${i < step ? "border-teal bg-teal text-primary-foreground" : i === step ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className={`hidden text-sm md:inline ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
              {i < steps.length - 1 && <span className="h-px flex-1 bg-border" />}
            </li>
          ))}
        </ol>

        <div key={step} className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-soft md:p-10 fade-up">
          {step === 0 && (
            <>
              <h2 className="text-2xl text-foreground">Επιλέξτε υπηρεσία</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {bookingServices.map((s) => (
                  <button key={s} onClick={() => setService(s)} className={`flex items-center justify-between rounded-xl border p-5 text-left transition-colors ${service === s ? "border-primary bg-teal-soft/60" : "border-border hover:border-foreground/30"}`}>
                    <span className="text-foreground">{s}</span>
                    {service === s && <Check className="h-4 w-4 text-primary" />}
                  </button>
                ))}
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl text-foreground">{months[view.getMonth()]} {view.getFullYear()}</h2>
                <div className="flex gap-2">
                  <button aria-label="Προηγούμενος" disabled={view <= new Date(today.getFullYear(), today.getMonth(), 1)} onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))} className="rounded-full border border-border p-2 disabled:opacity-30"><ChevronLeft className="h-4 w-4" /></button>
                  <button aria-label="Επόμενος" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))} className="rounded-full border border-border p-2"><ChevronRight className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">{wd.map((d) => <span key={d} className="py-2">{d}</span>)}</div>
              <div className="grid grid-cols-7 gap-1">
                {days.map((d, i) => d ? (
                  <button key={i} disabled={!available(d)} onClick={() => { setDate(d); setTime(null); }}
                    className={`aspect-square rounded-xl text-sm transition-colors disabled:text-muted-foreground/40 ${date?.getTime() === d.getTime() ? "bg-primary text-primary-foreground" : available(d) ? "text-foreground hover:bg-teal-soft" : ""}`}>
                    {d.getDate()}
                  </button>
                ) : <span key={i} />)}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">Διαθέσιμες ημέρες: Δευτέρα έως Παρασκευή.</p>
            </>
          )}
          {step === 2 && date && (
            <>
              <h2 className="text-2xl text-foreground">Επιλέξτε ώρα</h2>
              <p className="mt-1 text-sm text-muted-foreground">{fmt(date)}</p>
              <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5">
                {slots.map((t) => {
                  const b = booked(date, t);
                  return (
                    <button key={t} disabled={b} onClick={() => setTime(t)} className={`rounded-xl border py-3 text-sm transition-colors disabled:border-dashed disabled:text-muted-foreground/40 disabled:line-through ${time === t ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary"}`}>{t}</button>
                  );
                })}
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h2 className="text-2xl text-foreground">Στοιχεία ασθενούς</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input placeholder="Όνομα *" value={info.first} onChange={(e) => setInfo({ ...info, first: e.target.value })} className={inputCls} />
                <input placeholder="Επώνυμο *" value={info.last} onChange={(e) => setInfo({ ...info, last: e.target.value })} className={inputCls} />
                <input type="email" placeholder="Email *" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} className={inputCls} />
                <input type="tel" placeholder="Τηλέφωνο *" value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} className={inputCls} />
                <textarea rows={3} placeholder="Μήνυμα (προαιρετικό)" value={info.msg} onChange={(e) => setInfo({ ...info, msg: e.target.value })} className={`${inputCls} sm:col-span-2`} />
              </div>
              <p className="mt-4 text-xs text-muted-foreground">Μην συμπεριλαμβάνετε ιατρικό ιστορικό ή ευαίσθητες πληροφορίες υγείας. Θα συζητηθούν κατά την επίσκεψη.</p>
            </>
          )}
          {step === 4 && (
            <>
              <h2 className="text-2xl text-foreground">Σύνοψη ραντεβού</h2>
              <Summary {...{ service, date, time }} name={`${info.first} ${info.last}`} />
            </>
          )}

          <div className="mt-10 flex items-center justify-between">
            <button onClick={() => setStep(step - 1)} className={`text-sm text-muted-foreground hover:text-foreground ${step === 0 ? "invisible" : ""}`}>← Πίσω</button>
            {step < 4 ? (
              <button disabled={!canNext} onClick={() => setStep(step + 1)} className="rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-ink disabled:opacity-40">Συνέχεια</button>
            ) : (
              <button onClick={() => { setDone(true); window.scrollTo({ top: 0 }); }} className="rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-ink">Επιβεβαίωση Ραντεβού</button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Summary({ service, date, time, name }: { service: string | null; date: Date | null; time: string | null; name: string }) {
  const rows = [
    ["Γιατρός", `${doctor.name}, ${doctor.specialty}`],
    ["Ασθενής", name],
    ["Υπηρεσία", service],
    ["Ημερομηνία", date ? fmt(date) : ""],
    ["Ώρα", time],
    ["Τοποθεσία", `${doctor.address}, ${doctor.floor}`],
  ];
  return (
    <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-background text-left">
      {rows.map(([k, v]) => (
        <div key={k} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:justify-between">
          <dt className="text-sm text-muted-foreground">{k}</dt>
          <dd className="text-sm text-foreground sm:text-right">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
