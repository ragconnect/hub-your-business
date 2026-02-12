import { Helmet } from "react-helmet-async";
import googleLogo from "@/assets/logos/google.png";
import heroDashboard1 from "@/assets/hero-dashboard-1.png";
import heroDashboard2 from "@/assets/hero-dashboard-2.png";
import { Button } from "@/components/ui/button";
import { Play, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

import Header from "@/components/layout/Header";
import LogoMarquee from "@/components/marketing/LogoMarquee";
import Testimonials from "@/components/marketing/Testimonials";
import SixAssistants from "@/components/marketing/SixAssistants";
import WhyChooseRagAdvise from "@/components/marketing/WhyChooseRagAdvise";
import HowItWorks from "@/components/marketing/HowItWorks";
import PricingSection from "@/components/marketing/PricingSection";
import CTABand from "@/components/marketing/CTABand";
import FAQ from "@/components/marketing/FAQ";
import IntegrationsShowcase from "@/components/marketing/IntegrationsShowcase";
import OfferBanner from "@/components/marketing/OfferBanner";
import VideoModal from "@/components/marketing/VideoModal";
import DemoRequestModal from "@/components/marketing/DemoRequestModal";

const heroImages = [heroDashboard1, heroDashboard2];

const HeroImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg" style={{ aspectRatio: '16/10' }}>
      {heroImages.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`RagAdvise dashboard view ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-in-out"
          style={{ transform: `translateY(${(i - activeIndex) * 100}%)` }}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
        />
      ))}
    </div>
  );
};

const Index = () => {
  const siteUrl = typeof window !== 'undefined' ? `${window.location.origin}/` : 'https://ragadvise.com/';
  const title = "RagAdvise — Your Business, Powered by AI Business Assistants";
  const description = "Run your entire business with AI Business assistants that handle customer conversations, task management, financial tracking, team training, CRM, and website engagement—all from $16/month.";

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
        <section className="relative pt-8 md:pt-16 pb-16 md:pb-24" aria-labelledby="hero-title">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[hsl(var(--primary)/0.15)] via-[hsl(var(--primary)/0.08)] to-transparent" />
          {/* Decorative sparkle dots */}
          <div className="absolute top-20 left-[15%] w-2 h-2 bg-primary/30 rounded-full blur-[1px] hidden md:block" />
          <div className="absolute top-32 right-[20%] w-3 h-3 bg-primary/20 rounded-full blur-[2px] hidden md:block" />
          <div className="absolute top-48 right-[10%] w-1.5 h-1.5 bg-primary/40 rounded-full hidden md:block" />
          <div className="container">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <h1 id="hero-title" className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground" style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
                RagAdvise: AI-Powered Business Management
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
                Run your entire business with AI assistants that handle customer conversations, task management, financial tracking, and more—all from $16/month.
              </p>
              <div className="relative z-10 mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <VideoModal>
                  <Button variant="outline" size="lg" className="h-14 px-8 text-base font-semibold rounded-full bg-background border-primary text-primary hover:bg-primary/5">
                    <Play className="mr-2 h-4 w-4" fill="currentColor" />
                    See How It Works
                  </Button>
                </VideoModal>
                <Button size="lg" className="h-14 px-8 text-base font-semibold rounded-full" asChild>
                  <a href="https://my.ragadvise.com/signup">Start Your Free Trial</a>
                </Button>
              </div>
            </div>
            <div className="mt-12 md:mt-16 max-w-5xl mx-auto">
              <HeroImageCarousel />
            </div>
          </div>
        </section>

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

        {/* Testimonials */}
        <Testimonials />

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
