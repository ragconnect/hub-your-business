import React from "react";
import { MousePointer, Link2, BookOpen, Rocket } from "lucide-react";

const steps = [
  {
    icon: MousePointer,
    number: "1",
    title: "Choose Your Assistants",
    desc: "Pick the assistants that match your business needs. Start with one or get the full suite.",
  },
  {
    icon: Link2,
    number: "2",
    title: "Connect Your Tools",
    desc: "Integrate with your existing phone system, email, calendar, and business tools in minutes.",
  },
  {
    icon: BookOpen,
    number: "3",
    title: "Train Your AI",
    desc: "Upload your business information, FAQs, and documents. Your assistants learn your business.",
  },
  {
    icon: Rocket,
    number: "4",
    title: "Go Live",
    desc: "Your AI business assistants start working immediately, handling customer inquiries, managing tasks, and running your operations.",
  },
] as const;

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-title" className="border-t">
      <div className="container py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-primary/80 tracking-wide">Getting Started</p>
          <h2 id="how-it-works-title" className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
            How It Works
          </h2>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, number, title, desc }) => (
            <div key={number} className="text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">{number}</span>
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
