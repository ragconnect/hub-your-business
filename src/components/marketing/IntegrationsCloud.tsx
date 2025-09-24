import React from "react";
import { Phone, ShoppingCart, Mail, Calendar, CreditCard, MessageSquare, Link2, Cloud } from "lucide-react";

const pills = [
  { label: "Google", Icon: Cloud },
  { label: "Outlook", Icon: Mail },
  { label: "Phone", Icon: Phone },
  { label: "Shopify", Icon: ShoppingCart },
  { label: "Calendar", Icon: Calendar },
  { label: "Stripe", Icon: CreditCard },
  { label: "Slack", Icon: MessageSquare },
  { label: "Zapier", Icon: Link2 },
] as const;

const IntegrationsCloud: React.FC = () => {
  return (
    <section id="integrations" aria-labelledby="integrations-title" className="border-t">
      <div className="container py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-primary/80 tracking-wide">Connect your stack</p>
          <h2 id="integrations-title" className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">Works with your tools</h2>
          <p className="mt-3 text-muted-foreground">Plug RagAdvise into the channels and apps you already use. No heavy setup.</p>
        </div>

        <div className="relative mt-10 rounded-2xl bg-gradient-to-b from-secondary/60 to-accent/50 p-8 md:p-12">
          {/* Center card */}
          <div className="mx-auto max-w-md rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <div className="h-24 rounded-lg bg-muted" aria-hidden="true" />
            <div className="mt-4">
              <div className="h-3 w-2/3 rounded bg-muted mb-2" aria-hidden="true" />
              <div className="h-3 w-1/2 rounded bg-muted" aria-hidden="true" />
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm hover-scale">
              <span>Connect once · sync everywhere</span>
            </div>
          </div>

          {/* Floating pills */}
          <div className="hidden md:block" aria-hidden="true">
            <div className="absolute -top-3 left-6">
              <BadgePill Icon={Cloud} label="Google" />
            </div>
            <div className="absolute top-8 right-10">
              <BadgePill Icon={Mail} label="Outlook" />
            </div>
            <div className="absolute bottom-8 left-4">
              <BadgePill Icon={Phone} label="Phone" />
            </div>
            <div className="absolute -bottom-4 right-16">
              <BadgePill Icon={ShoppingCart} label="Shopify" />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -left-2">
              <BadgePill Icon={Calendar} label="Calendar" />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-2">
              <BadgePill Icon={CreditCard} label="Stripe" />
            </div>
            <div className="absolute top-2 left-1/2 -translate-x-1/2">
              <BadgePill Icon={MessageSquare} label="Slack" />
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
              <BadgePill Icon={Link2} label="Zapier" />
            </div>
          </div>

          {/* Mobile pill grid */}
          <div className="mt-6 grid grid-cols-2 gap-3 md:hidden">
            {pills.map(({ label, Icon }) => (
              <BadgePill key={label} Icon={Icon} label={label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const BadgePill = ({ Icon, label }: { Icon: React.ComponentType<any>; label: string }) => (
  <div className="inline-flex items-center gap-2 rounded-full bg-background/80 text-foreground/90 backdrop-blur px-3 py-1.5 shadow-sm border hover-scale">
    <Icon className="size-4 text-primary" aria-hidden="true" />
    <span className="text-sm">{label}</span>
  </div>
);

export default IntegrationsCloud;
