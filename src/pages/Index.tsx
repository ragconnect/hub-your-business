import { Helmet } from "react-helmet-async";
import googleLogo from "@/assets/logos/google.png";
import { Button } from "@/components/ui/button";
import { Play, Calendar } from "lucide-react";
import ScrollingCharacterBg from "@/components/marketing/ScrollingCharacterBg";


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

const HeroSection = () => {
  return (
    <section className="relative pt-8 md:pt-12 pb-16 md:pb-24 overflow-hidden" aria-labelledby="hero-title">
      <ScrollingCharacterBg />
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 id="hero-title" className="text-4xl md:text-5xl font-bold tracking-wide text-primary" style={{ fontFamily: "'Caprasimo', serif" }}>
            👀 to Replace All Your SaaS Tools? Use the #1 AI for Businesses
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            AI platform to manage your new or existing business. Handle everything your Shopify or Physical business needs and all the extras to run your team—all for $16/month.
          </p>
          <div className="relative z-10 mt-6 flex flex-col gap-3 max-w-md mx-auto">
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
            <div className="flex items-center justify-center gap-2 text-sm">
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
