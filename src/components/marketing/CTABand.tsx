import React from "react";
import { Button } from "@/components/ui/button";
import DemoRequestModal from "./DemoRequestModal";

const CTABand: React.FC = () => {
  return (
    <section id="start" aria-labelledby="cta-title" className="border-t">
      <div className="container py-14 md:py-16">
        <div className="rounded-xl border bg-gradient-to-br from-primary/10 to-primary/0 p-8 md:p-10 text-center shadow-sm">
          <h2 id="cta-title" className="text-2xl md:text-3xl font-semibold tracking-tight">
            Put an always-on companion to work this week
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Setup in minutes. See value in your first 20 minutes—no credit card.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild>
              <a href="https://my.ragadvise.com/signup" aria-label="Sign Up – No Credit Card Required">Sign Up</a>
            </Button>
            <DemoRequestModal>
              <Button size="lg" variant="outline">
                Schedule a Demo
              </Button>
            </DemoRequestModal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABand;
