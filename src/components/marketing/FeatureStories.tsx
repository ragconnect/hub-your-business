import React from "react";
import { MessageSquare, Wallet, Users } from "lucide-react";

const items = [
  {
    title: "Your hubs, one brain",
    desc: "Conversation, meetings, and finances connect so work moves automatically.",
    Icon: MessageSquare,
  },
  {
    title: "Always on, omnichannel",
    desc: "From phone and email to social DMs—your companion responds 24/7.",
    Icon: Users,
  },
  {
    title: "From insight to action",
    desc: "Track spend, surface risks, and trigger follow-up without switching tools.",
    Icon: Wallet,
  },
];

const FeatureStories: React.FC = () => {
  return (
    <section id="features" aria-labelledby="features-title">
      <div className="container py-16 md:py-20">
        <h2 id="features-title" className="text-3xl font-semibold tracking-tight">
          Built for real operations
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {items.map(({ title, desc, Icon }) => (
            <article key={title} className="rounded-lg border bg-card p-6 shadow-sm transition-colors hover:border-primary/40 animate-fade-in">
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

export default FeatureStories;
