import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import retailImg from "@/assets/stories/story-retail.jpg";
import financeImg from "@/assets/stories/story-finance.jpg";
import hospitalityImg from "@/assets/stories/story-hospitality.jpg";
import warehouseImg from "@/assets/stories/story-warehouse.jpg";

const stories = [
  {
    company: "Acme Retail",
    tags: ["Retail", "Mid-size"],
    image: retailImg,
    alt: "Retail store team assisting a customer at the counter",
    review: {
      quote: "RagAdvise takes calls and turns them into tasks—our staff finally focuses on customers.",
      name: "Jenna P.",
      role: "Store Manager",
      initials: "JP",
    },
  },
  {
    company: "Fintek",
    tags: ["Financial Services", "Enterprise"],
    image: financeImg,
    alt: "Fintech operator using POS terminal",
    review: {
      quote: "Meeting notes and follow‑ups are automatic. Finance ops feel effortless.",
      name: "Omar R.",
      role: "Operations Lead",
      initials: "OR",
    },
  },
  {
    company: "GreenLounge",
    tags: ["Hospitality", "SMB"],
    image: hospitalityImg,
    alt: "Hospitality lounge with natural light and sofa",
    review: {
      quote: "Response times dropped and reviews climbed—guests get answers 24/7.",
      name: "Mina K.",
      role: "General Manager",
      initials: "MK",
    },
  },
  {
    company: "Heyday Goods",
    tags: ["E‑commerce", "Mid-size"],
    image: warehouseImg,
    alt: "Organized warehouse shelves in a bright stockroom",
    review: {
      quote: "Every ticket has context from calls, chats, and orders—nothing slips.",
      name: "David L.",
      role: "Head of CX",
      initials: "DL",
    },
  },
] as const;

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="border-t bg-muted/10">
      <div className="container py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 id="testimonials-title" className="text-3xl md:text-4xl font-semibold tracking-tight">What would you do with more time?</h2>
          <p className="mt-2 text-muted-foreground">Real stories from teams saving hours every week with RagAdvise.</p>
        </div>

        <div className="mt-8">
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {stories.map((s) => (
                <CarouselItem key={s.company} className="basis-full md:basis-1/2 lg:basis-1/3">
                  <article className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                    <AspectRatio ratio={16 / 9}>
                      <img src={s.image} alt={`${s.company} — ${s.alt}`} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
                      <div className="absolute left-4 right-4 top-4">
                        <span className="text-sm font-semibold tracking-wider text-background/90 bg-foreground/80 px-2 py-1 rounded-md">CASE STUDY</span>
                      </div>
                    </AspectRatio>
                    <div className="p-4">
                      <h3 className="text-xl md:text-2xl font-semibold">{s.company}</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {s.tags.map((t) => (
                          <span key={t} className="rounded-full bg-muted text-foreground/90 text-xs px-3 py-1">{t}</span>
                        ))}
                      </div>
                      <div className="mt-4 rounded-xl border bg-background p-3">
                        <p className="text-sm text-foreground/90">“{s.review.quote}”</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Avatar className="size-6">
                            <AvatarFallback className="text-[10px]">{s.review.initials}</AvatarFallback>
                          </Avatar>
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium text-foreground">{s.review.name}</span> · {s.review.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-4 flex items-center justify-end gap-2">
              <CarouselPrevious aria-label="Previous story" />
              <CarouselNext aria-label="Next story" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

