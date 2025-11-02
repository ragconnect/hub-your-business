import React from "react";

import { PhoneCall, MessageSquare, Clock, Voicemail, Star, ShieldCheck, Wallet, CalendarCheck } from "lucide-react";

const facts = [
  {
    title: "Prefer live answer",
    stat: "90%",
    desc: "Surveys show customers dislike voicemails and unanswered calls, causing them to move on.",
    Icon: PhoneCall,
  },
  {
    title: "Finance momentum",
    stat: "43%",
    desc: "Significantly reduce your business expenses and taxes by up to 43%.",
    Icon: Wallet,
  },
  {
    title: "Meetings → actions",
    stat: "1 min",
    desc: "In less than 60 seconds, resolve tasks across meetings.",
    Icon: CalendarCheck,
  },
  {
    title: "Callbacks are risky",
    stat: "15%",
    desc: "Only a fraction are okay with a callback — most move on.",
    Icon: Clock,
  },
  {
    title: "Message satisfaction",
    stat: "4★",
    desc: "Average rating on RagAdvise message responses.",
    Icon: Star,
  },
  {
    title: "Escalate the tough ones",
    stat: "Owner",
    desc: "Complex messages are routed directly to you — not mishandled.",
    Icon: ShieldCheck,
  },
] as const;

const CustomerFacts: React.FC = () => {
  return (
    <section id="facts" aria-labelledby="facts-title" className="border-t bg-muted/10">
      <div className="container py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-primary/80 tracking-wide">Proof & numbers</p>
          <h2 id="facts-title" className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
            Numbers That Tell the Story
          </h2>
          <p className="mt-3 text-muted-foreground">Facts across comms, meetings, customers, finance, and knowledge assistants.</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map(({ title, stat, desc, Icon }) => (
            <article key={title} className="rounded-xl border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary">
                  <Icon aria-hidden="true" />
                </div>
                <h3 className="font-medium">{title}</h3>
              </div>
              <div className="mt-3 text-2xl font-semibold tracking-tight text-primary">{stat}</div>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerFacts;

