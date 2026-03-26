import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Calendar } from "lucide-react";
import DemoRequestModal from "@/components/marketing/DemoRequestModal";
import googleLogo from "@/assets/logos/google.png";

interface PricingCompactProps {
  page?: string;
  traditionalCosts?: {
    label: string;
    cost: string;
  }[];
  traditionalTotal?: string;
  savingsLabel?: string;
}

const defaultTraditionalCosts = [
  { label: "Receptionist/VA", cost: "$2,500/month" },
  { label: "Answering service", cost: "$200–500/month" },
  { label: "CRM / lead tracking", cost: "$50–200/month" },
  { label: "Follow-up automation", cost: "$100–300/month" },
];

const PricingCompact: React.FC<PricingCompactProps> = ({
  page,
  traditionalCosts = defaultTraditionalCosts,
  traditionalTotal = "$2,850–3,500/month",
  savingsLabel = "RagAdvise = 15–50× cheaper",
}) => {
  const included = [
    "AI phone answering (new or existing number)",
    "AI website chat & voice",
    "AI email responses & follow-ups",
    "Customer timeline & CRM",
    "Task management & notes",
    "Unlimited volume across all channels",
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Pricing That Makes Sense
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Everything you need for less than the cost of one tool.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Free tier */}
          <Card className="border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-primary mb-2">
                  Free
                </div>
                <p className="text-lg text-muted-foreground">
                  30 minutes included
                </p>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                {[
                  "Phone & website voice",
                  "AI website chat",
                  "No credit card required",
                  "Get started in 60 seconds",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button size="lg" className="w-full h-12 text-sm font-semibold rounded-lg" asChild>
                  <a href="https://my.ragadvise.com/signup" className="flex items-center justify-center gap-3">
                    <img src={googleLogo} alt="" className="w-6 h-6 bg-white rounded-full p-0.5" />
                    Sign up Free
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* $16/month tier */}
          <Card className="border-primary/20 ring-2 ring-primary/20 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
              Most Popular
            </div>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-primary mb-2">
                  $16

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    What's included:
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    {included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                  <h4 className="font-bold mb-4 flex items-center gap-2 text-destructive">
                    <X className="w-5 h-5" />
                    Building it yourself:
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    {traditionalCosts.map((item, i) => (
                      <li key={i} className="text-sm">
                        {item.label}: <span className="line-through">{item.cost}</span>
                      </li>
                    ))}
                    <li className="font-bold pt-2 border-t border-destructive/20 text-sm">
                      Total: <span className="line-through">{traditionalTotal}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-4 bg-primary/10 rounded-xl text-center">
                <p className="text-lg font-bold text-primary">{savingsLabel}</p>
              </div>

              <div className="mt-8 flex flex-col gap-3 max-w-md mx-auto">
                <Button size="lg" className="w-full h-14 text-base font-semibold rounded-lg" asChild>
                  <a href="https://my.ragadvise.com/signup" className="flex items-center justify-center gap-3">
                    <img src={googleLogo} alt="" className="w-7 h-7 bg-white rounded-full p-0.5" />
                    Sign up with Google & Get 30 Minutes Free
                  </a>
                </Button>
                <DemoRequestModal page={page}>
                  <Button variant="outline" size="lg" className="w-full h-14 text-base font-semibold rounded-lg">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Demo & Free Setup
                  </Button>
                </DemoRequestModal>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingCompact;
