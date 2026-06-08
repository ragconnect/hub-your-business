import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

import Header from "@/components/layout/Header";
import LogoMarquee from "@/components/marketing/LogoMarquee";
import SixAssistants from "@/components/marketing/SixAssistants";
import WhyChooseRagAdvise from "@/components/marketing/WhyChooseRagAdvise";
import HowItWorks from "@/components/marketing/HowItWorks";
import PricingSection from "@/components/marketing/PricingSection";
import CTABand from "@/components/marketing/CTABand";
import FAQ from "@/components/marketing/FAQ";
import IntegrationsShowcase from "@/components/marketing/IntegrationsShowcase";
import OfferBanner from "@/components/marketing/OfferBanner";
import WhoIsThisFor from "@/components/marketing/WhoIsThisFor";
import ComparisonCompact from "@/components/marketing/ComparisonCompact";

const AUTH_URL = "https://my.ragadvise.com/demo/home";

type Persona = {
  src: string;
  type: "video" | "image";
  name: string;
  role: string;
  rotate: string;
  translateY: string;
  lead?: boolean;
};

const personas: Persona[] = [
  {
    src: "https://pub-5da904f04ed24c6f8d5b29e27aca24c1.r2.dev/avatar-presets/6e6349fb-d588-4e0f-a373-7c7cd06d1b58/video-1780653626416-5872.mp4",
    type: "video",
    name: "Marcus",
    role: "Sales",
    rotate: "-6deg",
    translateY: "0px",
  },
  {
    src: "https://pub-5da904f04ed24c6f8d5b29e27aca24c1.r2.dev/avatars/7/1779144998708-2875.jpg",
    type: "image",
    name: "Jo",
    role: "Success",
    rotate: "-2deg",
    translateY: "16px",
  },
  {
    src: "https://pub-5da904f04ed24c6f8d5b29e27aca24c1.r2.dev/avatar-videos/7/1779901175750-6643.mp4",
    type: "video",
    name: "Theo",
    role: "Concierge",
    rotate: "0deg",
    translateY: "-8px",
    lead: true,
  },
  {
    src: "https://pub-5da904f04ed24c6f8d5b29e27aca24c1.r2.dev/avatar-videos/7/1780017993679-5735.mp4",
    type: "video",
    name: "Kami",
    role: "Support",
    rotate: "7deg",
    translateY: "24px",
  },
];

const ROTATING_PHRASES = [
  "Reply wherever my customers show up.",
  "Turn every question into a great answer.",
  "Give my brand a face and a voice.",
  "Answer my customers on every surface.",
];

const HeroSection = () => {
  const [prompt, setPrompt] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const current = ROTATING_PHRASES[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (typed.length < current.length) {
        timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 55);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), 1800);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 600);
    } else {
      if (typed.length > 0) {
        timeout = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), 25);
      } else {
        setPhraseIndex((i) => (i + 1) % ROTATING_PHRASES.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [typed, phase, phraseIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = prompt.trim()
      ? `${AUTH_URL}?prompt=${encodeURIComponent(prompt.trim())}`
      : AUTH_URL;
    window.location.href = url;
  };

  return (
    <section
      className="relative overflow-hidden bg-background"
      aria-labelledby="hero-title"
    >
      {/* Radial lime glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px] opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(var(--primary) / 0.18), transparent 70%)",
        }}
      />

      <div className="container relative z-10 pt-10 md:pt-16 pb-16 md:pb-24">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <p className="text-xs md:text-sm font-mono tracking-[0.2em] uppercase text-primary">
            One Assistant · Every Surface
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-foreground min-h-[2.4em] md:min-h-[2.4em]"
            style={{ fontFamily: "'Bree Serif', serif" }}
          >
            <span>{typed}</span>
            <span className="inline-block w-[3px] md:w-[4px] h-[0.85em] align-[-0.1em] ml-1 bg-primary animate-pulse" />
          </h1>

          <p className="mt-8 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Describe what your customers need. RagAdvise handles it across every
            surface they already use — instantly.
          </p>

          {/* Prompt input */}
          <form
            onSubmit={handleSubmit}
            className="mt-10 w-full max-w-2xl flex items-center gap-2 rounded-2xl border border-border bg-card/80 backdrop-blur p-2 pl-5 shadow-lg"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask RagAdvise to handle anything…"
              className="flex-1 bg-transparent border-0 outline-none text-base text-foreground placeholder:text-muted-foreground py-3"
              aria-label="Ask RagAdvise"
            />
            <Button
              type="submit"
              size="lg"
              className="rounded-xl h-12 px-6 font-semibold"
            >
              Create
            </Button>
          </form>

          <p className="mt-3 text-xs text-muted-foreground">
            No credit card required · Get 30 minutes free
          </p>

          {/* Persona card stack */}
          <div className="mt-16 md:mt-20 w-full flex justify-center items-end gap-3 md:gap-5">
            {personas.map((p, i) => (
              <div
                key={i}
                className="relative w-32 sm:w-40 md:w-48 lg:w-56 rounded-2xl overflow-hidden border border-border bg-card shadow-2xl transition-transform duration-500 hover:!translate-y-0 hover:!rotate-0"
                style={{
                  transform: `rotate(${p.rotate}) translateY(${p.translateY})`,
                }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={p.src}
                    alt=""
                    width={512}
                    height={768}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-3 py-2 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="font-mono text-[10px] md:text-xs text-foreground/90 tracking-wide">
                    {p.label}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


const Index = () => {
  const siteUrl = typeof window !== 'undefined' ? `${window.location.origin}/` : 'https://ragadvise.com/';
  const title = "RagAdvise — Your Business, Powered by AI Business Assistants";
  const description = "RagAdvise's AI-powered business platform uses business assistants to handle everything from customer conversations and task management to financial tracking, team training, CRM, and website engagement—all for $16/month.";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={siteUrl} />
      </Helmet>

      <OfferBanner />

      <Header />

      <main>
        {/* Hero */}
        <HeroSection />

        {/* Companies */}
        <LogoMarquee />

        {/* Assistants */}
        <SixAssistants />

        {/* Why Choose RagAdvise */}
        <WhyChooseRagAdvise />

        {/* How It Works */}
        <HowItWorks />

        {/* Integrations */}
        <IntegrationsShowcase />

        {/* Pricing */}
        <PricingSection />

        {/* Who Is This For */}
        <WhoIsThisFor />

        {/* Compare */}
        <ComparisonCompact />


        {/* CTA Band */}
        <CTABand />

        {/* FAQ */}
        <FAQ />
      </main>

      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'RagAdvise',
        url: siteUrl,
        description,
      }) }} />
    </>
  );
};

export default Index;
