import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import commImg from "@/assets/hubs/hub-communications.jpg";
import meetingsImg from "@/assets/hubs/hub-meetings.jpg";
import financeImg from "@/assets/hubs/hub-finance.jpg";
import customersImg from "@/assets/hubs/hub-customers.jpg";
import knowledgeImg from "@/assets/hubs/hub-knowledge.jpg";

const hubs = [
  { key: "communications", title: "Communications", desc: "Calls, messages, and tasks in one inbox.", image: commImg, alt: "Communications hub UI with calls, messages, and tasks" },
  { key: "meetings", title: "Meetings", desc: "Auto-notes, action items, and follow‑ups.", image: meetingsImg, alt: "Meetings hub with calendar and meeting notes" },
  { key: "finance", title: "Finance", desc: "Real-time cash, revenue, and expenses.", image: financeImg, alt: "Finance hub dashboard with KPIs and charts" },
  { key: "customers", title: "Customers", desc: "Lightweight CRM and pipeline tracking.", image: customersImg, alt: "Customers hub with pipeline columns and cards" },
  { key: "knowledge", title: "Knowledge", desc: "Docs and wiki trained on your business.", image: knowledgeImg, alt: "Knowledge hub with wiki preview and documents list" },
] as const;

const FiveHubs: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi | null>(null)
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    api.on("select", onSelect)
    onSelect()
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <section id="hubs" aria-labelledby="hubs-title" className="border-t bg-muted/10">
      <div className="container py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-primary/80 tracking-wide">Run your business on AI</p>
          <h2 id="hubs-title" className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">The more hubs, the merrier.</h2>
          <p className="mt-3 text-muted-foreground">Tap a hub to preview. Each tile is powered by RagAdvise and works together out‑of‑the‑box.</p>
        </div>

        {/* Tabs */}
        <div role="tablist" aria-label="Hubs" className="mt-6 flex flex-wrap justify-center gap-2">
          {hubs.map((h, i) => (
            <Button
              key={h.key}
              role="tab"
              aria-selected={current === i}
              variant={current === i ? "default" : "outline"}
              size="sm"
              onClick={() => api?.scrollTo(i)}
            >
              {h.title}
            </Button>
          ))}
        </div>

        {/* Carousel */}
        <div className="mt-8">
          <Carousel opts={{ align: "start", loop: true }} setApi={setApi}>
            <CarouselContent>
              {hubs.map((hub) => (
                <CarouselItem key={hub.key} className="basis-full md:basis-1/2 lg:basis-1/3">
                  <article className="overflow-hidden rounded-2xl border bg-card shadow-sm hover:shadow-md">
                    <AspectRatio ratio={16 / 9}>
                      <img src={hub.image} alt={`${hub.title} hub — ${hub.alt}`} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                    </AspectRatio>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold tracking-tight">{hub.title} Hub</h3>
                      <p className="mt-1 text-sm text-muted-foreground max-w-md">{hub.desc}</p>
                      <Button className="mt-3" variant="secondary" size="sm" asChild>
                        <a href="#start" className="story-link">Learn more</a>
                      </Button>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-4 flex items-center justify-end gap-2">
              <CarouselPrevious aria-label="Previous hub" />
              <CarouselNext aria-label="Next hub" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}

export default FiveHubs;
