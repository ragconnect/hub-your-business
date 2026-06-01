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

import personaVoice from "@/assets/hero/persona-voice.jpg";
import personaChat from "@/assets/hero/persona-chat.jpg";
import personaPhone from "@/assets/hero/persona-phone.jpg";
import personaEmail from "@/assets/hero/persona-email.jpg";

const AUTH_URL = "https://my.ragadvise.com/demo/home";

const personas = [
  { src: personaVoice, label: "voice · live", rotate: "-6deg", translateY: "0px" },
  { src: personaChat, label: "chat · acme", rotate: "-2deg", translateY: "16px" },
  { src: personaPhone, label: "phone · 0:42", rotate: "3deg", translateY: "8px" },
  { src: personaEmail, label: "email · sent", rotate: "7deg", translateY: "24px" },
];

const HeroSection = () => {
  const [prompt, setPrompt] = useState("");

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
            className="mt-6 text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-foreground"
            style={{ fontFamily: "'Bree Serif', serif" }}
          >
            Answer my customers on{" "}
            <span className="relative inline-block">
              every surface.
              <span className="absolute -right-2 top-1 bottom-1 w-[3px] bg-primary animate-pulse" />
            </span>
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
