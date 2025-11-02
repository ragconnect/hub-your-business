import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Megaphone, Scale, Plane } from "lucide-react";


const future = [
  {
    title: "Hiring Assistant",
    desc: "Automate candidate screening, scheduling, and onboarding.",
    Icon: UserPlus,
  },
  {
    title: "Marketing Assistant",
    desc: "Manage campaigns, track ROI, and generate on-brand content ideas.",
    Icon: Megaphone,
  },
  {
    title: "Legal Assistant",
    desc: "Draft, organize, and track agreements with built‑in reviews.",
    Icon: Scale,
  },
  {
    title: "Travel Assistant",
    desc: "Plan trips, optimize budgets, and centralize approvals.",
    Icon: Plane,
  },
] as const;

const RoadmapFuture: React.FC = () => {
  return (
    <section id="roadmap" aria-labelledby="roadmap-title" className="border-t bg-muted/10">
      <div className="container py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-primary/80 tracking-wide">Future Research & Development</p>
          <h2 id="roadmap-title" className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">We're Just Getting Started</h2>
          <p className="mt-3 text-muted-foreground">Our roadmap expands RagAdvise beyond today's five assistants with new AI assistants tailored for more of your operations. <a href="https://my.ragadvise.com/signup" className="font-medium text-primary underline-offset-4 hover:underline">Start free</a>.</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {future.map(({ title, desc, Icon }) => (
            <Card key={title} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold tracking-tight">{title}</CardTitle>
                  <span className="rounded-full bg-secondary text-secondary-foreground text-[11px] px-2 py-0.5">Coming soon</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="inline-flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary">
                  <Icon aria-hidden="true" />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapFuture;