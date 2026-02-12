import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import DemoRequestModal from "@/components/marketing/DemoRequestModal";
import googleLogo from "@/assets/logos/google.png";

const plans = [
  {
    name: "Individual Assistant",
    price: "$16",
    period: "/month",
    features: [
      "Any single assistant",
      "Unlimited usage",
      "All core features",
      "Email support",
    ],
    highlight: false,
  },
  {
    name: "Business Suite",
    price: "$49",
    period: "/month",
    features: [
      "All 6 assistants",
      "Unlimited usage across all assistants",
      "Priority support",
      "Advanced integrations",
      "Custom training",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: " pricing",
    features: [
      "Everything in Business Suite",
      "Dedicated account manager",
      "Custom AI training",
      "SLA guarantees",
      "White-label options",
    ],
    highlight: false,
  },
] as const;

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="border-t bg-muted/10">
      <div className="container py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-primary/80 tracking-wide">Simple Pricing</p>
          <h2 id="pricing-title" className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
            Pricing
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {plans.map(({ name, price, period, features, highlight }) => (
            <Card 
              key={name} 
              className={`relative ${highlight ? "border-primary shadow-lg ring-2 ring-primary/20" : ""}`}
            >
              {highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">{name}</CardTitle>
                <div className="mt-2">
                  <span className="text-4xl font-bold">{price}</span>
                  <span className="text-muted-foreground">{period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full h-12 text-sm font-semibold" 
                  variant={highlight ? "default" : "outline"}
                  asChild
                >
                  <a href="https://my.ragadvise.com/signup" className="flex items-center justify-center gap-2">
                    <img src={googleLogo} alt="" className="w-5 h-5 bg-white rounded-full p-0.5" />
                    Sign up with Google
                  </a>
                </Button>
                <p className="text-xs text-center mt-2">
                  <a href="https://my.ragadvise.com/signup" className="text-primary font-medium hover:underline">Sign up free with email.</a>
                  {" "}<span className="text-muted-foreground">No credit card required</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            No credit card required • 14-day trial
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
