import React from "react";
import integrationsImg from "@/assets/integrations/integrations-mosaic.jpg";
import { Phone, ShoppingCart, Mail, Calendar, CreditCard, MessageSquare, Link2, Cloud } from "lucide-react";
import type { LucideIcon } from "lucide-react";


type BadgeItem = { label: string; Icon: LucideIcon };

const badges: BadgeItem[] = [
  { label: "Google", Icon: Cloud },
  { label: "Outlook", Icon: Mail },
  { label: "Slack", Icon: MessageSquare },
  { label: "Phone", Icon: Phone },
  { label: "Shopify", Icon: ShoppingCart },
  { label: "Stripe", Icon: CreditCard },
  { label: "Calendar", Icon: Calendar },
  { label: "Zapier", Icon: Link2 },
];

const IntegrationsShowcase: React.FC = () => {
  return (
    <section id="integrations" aria-labelledby="integrations-title" className="border-t bg-muted/10">
      <div className="container py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-medium text-primary/80 tracking-wide">Works with your tools</p>
            <h2 id="integrations-title" className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
              Connect once. Sync everywhere.
            </h2>
            <p className="mt-3 text-muted-foreground max-w-prose">
              RagAdvise plugs into the channels you already use—calls, email, calendar, storefront, payments—and keeps context flowing so every assistant stays up to date. <a href="https://my.ragadvise.com/signup" className="font-medium text-primary underline-offset-4 hover:underline">Start free</a>.
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md">
              {badges.map(({ label, Icon }) => (
                <div key={label} className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 shadow-sm">
                  <Icon className="size-4 text-primary" aria-hidden="true" />
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 bg-[radial-gradient(500px_200px_at_70%_40%,hsl(var(--primary)/0.18),transparent_60%)]" />
            <img
              src={integrationsImg}
              alt="Illustration of integrations around a central RagAdvise dashboard"
              className="w-full h-auto rounded-xl border shadow-sm"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsShowcase;
