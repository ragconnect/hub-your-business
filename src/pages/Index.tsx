import { Helmet } from "react-helmet-async";
import heroImage from "@/assets/hero-people-collab.jpg";
import { Button } from "@/components/ui/button";

import LogoMarquee from "@/components/marketing/LogoMarquee";
import Testimonials from "@/components/marketing/Testimonials";

import FiveHubs from "@/components/marketing/FiveHubs";
import ComparisonCompact from "@/components/marketing/ComparisonCompact";
import CTABand from "@/components/marketing/CTABand";
import FAQ from "@/components/marketing/FAQ";
import IntegrationsShowcase from "@/components/marketing/IntegrationsShowcase";
import RoadmapFuture from "@/components/marketing/RoadmapFuture";
import CustomerFacts from "@/components/marketing/CustomerFacts";
import WhoIsThisFor from "@/components/marketing/WhoIsThisFor";
import SocialProof from "@/components/marketing/SocialProof";

const Index = () => {
  const siteUrl = typeof window !== 'undefined' ? `${window.location.origin}/` : 'https://ragadvise.com/';
  const title = "RagAdvise — Your AI Business Companion";
  const description = "Always-on AI that handles calls, meetings, finances, and follow-up for your business in minutes.";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={siteUrl} />
      </Helmet>

      <header className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <a href="#" className="font-semibold tracking-tight">RagAdvise</a>
          <nav className="hidden md:flex gap-6 text-sm text-muted-foreground">
            <a href="#hubs" className="hover:text-foreground transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Stories</a>
            <a href="#who" className="hover:text-foreground transition-colors">Who is This For</a>
            <a href="#compare" className="hover:text-foreground transition-colors">Compare</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="https://my.ragadvise.com" className="text-sm text-muted-foreground hover:text-foreground">Sign in</a>
            <Button asChild>
              <a href="https://my.ragadvise.com/signup" aria-label="Start Free – See Value in 20 Minutes">Start Free</a>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative pt-8 md:pt-12 pb-16 md:pb-24" aria-labelledby="hero-title">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_80%_20%,hsl(var(--primary)/0.15),transparent_60%)]" />
          <div className="container">
            <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">
              <div>
                <h1 id="hero-title" className="text-4xl md:text-5xl font-bold tracking-tight">
                  AI That Handles Business Task While You Focus on Growth
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Think Siri or Alexa — but trained exclusively for your business. RagAdvise’s AI-powered hubs handle the calls, messages, meetings, finances, and customer follow-up you don’t have time for.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button size="lg" asChild>
                    <a href="https://my.ragadvise.com/signup">Start Free – See Value in 20 Minutes</a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="#demo">Watch the 2-Minute Demo</a>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src={heroImage}
                  alt="Small business team collaborating with RagAdvise AI assistant across devices"
                  className="w-full h-auto rounded-lg shadow"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>


        {/* Companies */}
        <LogoMarquee />

        {/* Hubs */}
        <FiveHubs />

        {/* Facts */}
        <CustomerFacts />

        {/* Testimonials */}
        <Testimonials />

        {/* Integrations */}
        <IntegrationsShowcase />

        {/* Who is this for */}
        <WhoIsThisFor />

        {/* Compact Comparison */}
        <ComparisonCompact />

        {/* CTA Band */}
        <CTABand />

        {/* Roadmap */}
        <RoadmapFuture />

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
