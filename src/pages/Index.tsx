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
        <section className="relative pt-8 md:pt-12 pb-16 md:pb-24" aria-labelledby="hero-title">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[hsl(var(--primary)/0.15)] via-[hsl(var(--primary)/0.08)] to-transparent" />
          <div className="container">
            <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">
              <div className="text-center md:text-left">
                <h1 id="hero-title" className="text-4xl md:text-5xl font-bold tracking-wide text-primary" style={{ fontFamily: "'Caprasimo', serif" }}>
                   SaaS and Business Apps Are Dead — Use RagAdvise: AI Powered Business Management
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Run your entire business with AI Business assistants that handle customer conversations, task management, financial tracking, team training, CRM, and website engagement—all from $16/month.
                </p>
                <div className="relative z-10 mt-6 flex flex-col gap-3 justify-center md:justify-start max-w-md mx-auto md:mx-0">
                  <Button size="lg" className="w-full h-14 text-base font-semibold rounded-lg" asChild>
                    <a href="https://my.ragadvise.com/signup" className="flex items-center justify-center gap-3">
                      <img src={googleLogo} alt="" className="w-7 h-7 bg-white rounded-full p-0.5" />
                      Sign up with Google
                    </a>
                  </Button>
                  <DemoRequestModal>
                    <Button variant="outline" size="lg" className="w-full h-14 text-base font-semibold rounded-lg bg-background">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Demo & Free Setup
                    </Button>
                  </DemoRequestModal>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex-1 border-t" />
                    <span className="text-xs text-muted-foreground">OR</span>
                    <div className="flex-1 border-t" />
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                    <a href="https://my.ragadvise.com/signup" className="text-primary font-medium hover:underline">Sign up free with email.</a>
                    <span className="text-muted-foreground">No credit card required</span>
                    <span className="text-muted-foreground">·</span>
                    <VideoModal>
                      <button className="inline-flex items-center gap-1 text-primary font-medium hover:underline cursor-pointer">
                        <Play className="w-3 h-3" fill="currentColor" />
                        Watch Demo
                      </button>
                    </VideoModal>
                  </div>
                </div>
              </div>
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
