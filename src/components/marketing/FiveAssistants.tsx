import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import commImg from "@/assets/hubs/hub-communications.jpg";
import meetingsImg from "@/assets/hubs/hub-meetings.jpg";
import financeImg from "@/assets/hubs/hub-finance.jpg";
import customersImg from "@/assets/hubs/hub-customers.jpg";
import knowledgeImg from "@/assets/hubs/hub-knowledge.jpg";

const assistants = [
  { key: "conversation", title: "Conversation", desc: "Calls, messages, and tasks in one inbox.", image: commImg, alt: "Conversation assistant UI with calls, messages, and tasks" },
  { key: "task", title: "Task", desc: "Auto-notes, action items, and follow‑ups.", image: meetingsImg, alt: "Task assistant with calendar and meeting notes" },
  { key: "money", title: "Money", desc: "Real-time cash, revenue, and expenses.", image: financeImg, alt: "Money assistant dashboard with KPIs and charts" },
  { key: "customer", title: "Customer", desc: "Lightweight CRM and pipeline tracking.", image: customersImg, alt: "Customer assistant with pipeline columns and cards" },
  { key: "training", title: "Training", desc: "Docs and wiki trained on your business.", image: knowledgeImg, alt: "Training assistant with wiki preview and documents list" },
] as const;

const FiveAssistants: React.FC = () => {
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
    <section id="assistants" aria-labelledby="assistants-title" className="border-t bg-muted/10">
      <div className="container py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-primary/80 tracking-wide">Run your business on AI</p>
          <h2 id="assistants-title" className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">The more assistants, the better.</h2>
          <p className="mt-3 text-muted-foreground">Tap an assistant to preview. Powered by RagAdvise and works together out‑of‑the‑box.</p>
        </div>

        {/* Tabs */}
        <div role="tablist" aria-label="Assistants" className="mt-6 flex flex-wrap justify-center gap-2">
          {assistants.map((h, i) => (
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
              {assistants.map((assistant) => (
                <CarouselItem key={assistant.key} className="basis-full md:basis-1/2 lg:basis-1/3">
                  <article className="overflow-hidden rounded-2xl border bg-card shadow-sm hover:shadow-md">
                    <AspectRatio ratio={16 / 9}>
                      <img src={assistant.image} alt={`${assistant.title} assistant — ${assistant.alt}`} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                    </AspectRatio>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold tracking-tight">{assistant.title} Assistant</h3>
                      <p className="mt-1 text-sm text-muted-foreground max-w-md">{assistant.desc}</p>
                      <Button className="mt-3" variant="secondary" size="sm" asChild>
                        <a href="#start" className="story-link">Learn more</a>
                      </Button>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-4 flex items-center justify-end gap-2">
              <CarouselPrevious aria-label="Previous assistant" />
              <CarouselNext aria-label="Next assistant" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}

export default FiveAssistants;
