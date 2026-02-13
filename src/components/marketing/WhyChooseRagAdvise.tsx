import React from "react";
import { DollarSign, Rocket, Zap, Link2, Target, Shield, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import DemoRequestModal from "@/components/marketing/DemoRequestModal";
import googleLogo from "@/assets/logos/google.png";

const benefits = [
  {
    icon: DollarSign,
    emoji: "💵",
    title: "20x More Affordable",
    desc: "Get all the tools you need for less than the cost of one employee. Starting at just $16/month.",
  },
  {
    icon: Rocket,
    emoji: "🚀",
    title: "All-in-One Platform",
    desc: "Stop paying for 10+ different tools. RagAdvise replaces your phone system, task manager, accounting software, CRM, training platform, and more.",
  },
  {
    icon: Zap,
    emoji: "⚡",
    title: "Works 24/7",
    desc: "Your AI business assistants never sleep, never take breaks, and handle unlimited work simultaneously.",
  },
  {
    icon: Link2,
    emoji: "🔗",
    title: "Integrates With Everything",
    desc: "Connect with your existing tools: Slack, HubSpot, Salesforce, Google Workspace, and more.",
  },
  {
    icon: Target,
    emoji: "🎯",
    title: "Built for Small Businesses",
    desc: "Designed specifically for SMBs, service businesses, and growing teams. No enterprise complexity.",
  },
  {
    icon: Shield,
    emoji: "🛡️",
    title: "Secure & Reliable",
    desc: "Bank-level security, 99.9% uptime, and GDPR compliant.",
  },
] as const;

const WhyChooseRagAdvise: React.FC = () => {
  return (
    <section id="why-choose" aria-labelledby="why-choose-title" className="border-t bg-muted/10">
      <div className="container py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-primary/80 tracking-wide">Why RagAdvise</p>
          <h2 id="why-choose-title" className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
            Why Businesses Choose RagAdvise
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ emoji, title, desc }) => (
            <article key={title} className="rounded-xl border bg-card p-5 shadow-sm">
              <div className="text-2xl mb-2">{emoji}</div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <Button size="lg" className="h-14 text-base font-semibold rounded-lg flex-1" asChild>
            <a href="https://my.ragadvise.com/signup" className="flex items-center justify-center gap-3">
              <img src={googleLogo} alt="" className="w-7 h-7 bg-white rounded-full p-0.5" />
              Sign up with Google
            </a>
          </Button>
          <DemoRequestModal>
            <Button variant="outline" size="lg" className="h-14 text-base font-semibold rounded-lg flex-1 bg-background">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Demo & Free Setup
            </Button>
          </DemoRequestModal>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseRagAdvise;
