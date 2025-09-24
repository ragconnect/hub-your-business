import React from "react";
import { Car, Wrench, Home, Wind, Stethoscope, Leaf, Truck, Sparkles } from "lucide-react";


const audiences = [
  { title: "Car Dealerships", desc: "Answer sales calls, schedule test drives, and follow up automatically.", Icon: Car },
  { title: "Plumbing & HVAC", desc: "Book jobs, route emergencies, and message customers with updates.", Icon: Wrench },
  { title: "Real Estate Teams", desc: "Capture inquiries, qualify leads, and auto-schedule showings.", Icon: Home },
  { title: "Renewables & Field Services", desc: "Coordinate site visits and track tasks from call to invoice.", Icon: Wind },
  { title: "Dental & Clinics", desc: "Reduce no‑shows with reminders and collect intake info.", Icon: Stethoscope },
  { title: "Landscaping & Home Services", desc: "Bundle estimates, approvals, and recurring service reminders.", Icon: Leaf },
  { title: "Movers & Logistics", desc: "Quote requests become scheduled jobs with checklists.", Icon: Truck },
  { title: "Spas & Studios", desc: "Manage bookings and reviews with friendly follow‑ups.", Icon: Sparkles },
] as const;

const WhoIsThisFor: React.FC = () => {
  return (
    <section id="who" aria-labelledby="who-title" className="border-t bg-muted/10">
      <div className="container py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-primary/80 tracking-wide">Who is this for?</p>
          <h2 id="who-title" className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">Built for service businesses</h2>
          <p className="mt-3 text-muted-foreground">If your team talks to customers and moves work forward, RagAdvise will save you time.</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map(({ title, desc, Icon }) => (
            <article key={title} className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="inline-flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary">
                <Icon aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-medium">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhoIsThisFor;
