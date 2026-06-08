import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

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
import DemoRequestModal from "@/components/marketing/DemoRequestModal";
import googleLogo from "@/assets/logos/google.png";


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

          <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            RagAdvise gives every customer-facing surface — phone, chat, email, voice — a single trained assistant that already sounds like your business.
          </p>

          {/* Surface chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {[
              { label: "Phone Sales", active: true },
              { label: "Email", active: false },
              { label: "Chat", active: false },
              { label: "Voice Notes", active: false },
              { label: "Web", active: false },
            ].map((c) => (
              <span
                key={c.label}
                className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border ${
                  c.active
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
                    : "bg-card/60 text-muted-foreground border-border"
                }`}
              >
                {c.label}
              </span>
            ))}
          </div>


          {/* Persona card stack */}
          <div className="mt-16 md:mt-20 w-full flex justify-center items-end gap-3 md:gap-5">
            {personas.map((p, i) => (
              <div
                key={i}
                className={`relative w-32 sm:w-40 md:w-48 lg:w-56 rounded-[18px] overflow-hidden bg-card shadow-2xl transition-transform duration-500 hover:!translate-y-[-5px] hover:!rotate-0 ${
                  p.lead ? "ring-2 ring-primary shadow-[0_0_40px_hsl(var(--primary)/0.35)]" : "border border-border"
                }`}
                style={{
                  transform: `rotate(${p.rotate}) translateY(${p.translateY})`,
                }}
              >
                <div className="aspect-[3/4] overflow-hidden bg-black">
                  {p.type === "video" ? (
                    <video
                      src={p.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <img
                      src={p.src}
                      alt={p.name}
                      width={512}
                      height={768}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                  )}
                </div>
                {p.lead && (
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary))]" />
                    <span className="font-mono text-[9px] md:text-[10px] font-semibold tracking-wider text-primary uppercase">Live</span>
                  </div>
                )}
                <div className="absolute bottom-0 inset-x-0 px-3 py-2 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                  <div className="text-xs md:text-sm font-semibold text-white leading-tight">{p.name}</div>
                  <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-wider text-white/60">{p.role}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Your AI assistant · pick a face, any surface
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <Button size="lg" className="h-12 px-5 rounded-xl text-sm font-semibold" asChild>
              <a href={AUTH_URL} className="flex items-center gap-2">
                <img src={googleLogo} alt="" className="w-5 h-5 bg-white rounded-full p-0.5" />
                Sign up with Google & Get 30 Minutes Free
              </a>
            </Button>
            <DemoRequestModal page="home">
              <Button variant="outline" size="lg" className="h-12 px-5 rounded-xl text-sm font-semibold bg-background">
                <Calendar className="mr-2 h-4 w-4" />
                Book a Demo
              </Button>
            </DemoRequestModal>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            No credit card required · 30 minutes free
          </p>

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
