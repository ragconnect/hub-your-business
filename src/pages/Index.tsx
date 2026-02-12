import { Helmet } from "react-helmet-async";
import heroImage from "@/assets/hero-people-collab.jpg";
import googleLogo from "@/assets/logos/google.png";
import { Button } from "@/components/ui/button";
import { Play, Calendar } from "lucide-react";

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
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_80%_20%,hsl(var(--primary)/0.15),transparent_60%)]" />
          <div className="container">
            <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">
              <div className="text-center md:text-left">
                <h1 id="hero-title" className="text-4xl md:text-5xl font-bold tracking-wide text-primary" style={{ fontFamily: "'Caprasimo', serif" }}>
                   POV: SaaS and Business Apps Are Dead — Power Your Empire With AI
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
                  <p className="text-center text-sm">
                    <a href="https://my.ragadvise.com/signup" className="text-primary font-medium hover:underline">Sign up free with email.</a>
                    <span className="text-muted-foreground ml-1">No credit card required</span>
                  </p>
                </div>
              </div>
              <VideoModal>
                <div className="relative cursor-pointer group">
                  <img
                    src={heroImage}
                    alt="Watch RagAdvise explainer video"
                    className="w-full h-auto rounded-lg shadow transition-transform group-hover:scale-[1.02]"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black/20 transition-all group-hover:bg-black/30">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center shadow-xl ring-4 ring-primary-foreground/30 transition-transform group-hover:scale-110">
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                    <span className="mt-4 px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-sm md:text-base rounded-full shadow-lg">
                      Watch the Demo
                    </span>
                  </div>
                </div>
              </VideoModal>
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
