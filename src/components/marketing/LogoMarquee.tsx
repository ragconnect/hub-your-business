import React from "react";
import { Car, Wrench, Home, Wind, Leaf, Truck, Sparkles } from "lucide-react";

const brands = [
  { name: "City Auto Dealers", Icon: Car },
  { name: "Prime Plumbing", Icon: Wrench },
  { name: "GreenLeaf Realty", Icon: Home },
  { name: "Swift HVAC", Icon: Wind },
  { name: "Peak Landscaping", Icon: Leaf },
  { name: "Starline Movers", Icon: Truck },
  { name: "Sunset Spa", Icon: Sparkles },
];

const LogoMarquee: React.FC = () => {
  return (
    <section id="logos" aria-labelledby="logos-title" className="border-t bg-muted/10">
      <div className="container py-8 md:py-10">
        <div className="text-center">
          <h2 id="logos-title" className="text-sm font-medium text-muted-foreground">Built for industry leaders</h2>
        </div>
        <div className="group relative mt-6 overflow-hidden">
          <div className="flex w-max items-center gap-12 md:gap-16 animate-marquee will-change-transform">
            {[...brands, ...brands].map((item, idx) => (
              <div key={`${item.name}-${idx}`} aria-label={`${item.name} logo`} className="select-none inline-flex items-center gap-2">
                <item.Icon className="size-4 text-muted-foreground/70" aria-hidden="true" />
                <span className="text-lg md:text-xl font-semibold tracking-[0.18em] uppercase text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
