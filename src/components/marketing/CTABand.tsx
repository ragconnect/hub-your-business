import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import DemoRequestModal from "@/components/marketing/DemoRequestModal";
import googleLogo from "@/assets/logos/google.png";

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
          <div className="mt-6 flex flex-col gap-3 justify-center max-w-md mx-auto">
            <Button size="lg" className="w-full h-14 text-base font-semibold rounded-lg" asChild>
              <a href="https://my.ragadvise.com/signup" className="flex items-center justify-center gap-3">
                <img src={googleLogo} alt="" className="w-7 h-7 bg-white rounded-full p-0.5" />
                Sign up with Google or email
              </a>
            </Button>
            <DemoRequestModal>
              <Button size="lg" variant="outline" className="w-full h-14 text-base font-semibold rounded-lg">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Demo & Free Setup
              </Button>
            </DemoRequestModal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABand;
