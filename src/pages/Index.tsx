import { Helmet } from "react-helmet-async";
import { useState } from "react";
import heroImage from "@/assets/hero-people-collab.jpg";
import logo from "@/assets/ragadvise_logo.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Play } from "lucide-react";

import LogoMarquee from "@/components/marketing/LogoMarquee";
import Testimonials from "@/components/marketing/Testimonials";

import FiveAssistants from "@/components/marketing/FiveAssistants";
import ComparisonCompact from "@/components/marketing/ComparisonCompact";
import CTABand from "@/components/marketing/CTABand";
import FAQ from "@/components/marketing/FAQ";
import IntegrationsShowcase from "@/components/marketing/IntegrationsShowcase";
import RoadmapFuture from "@/components/marketing/RoadmapFuture";
import CustomerFacts from "@/components/marketing/CustomerFacts";
import WhoIsThisFor from "@/components/marketing/WhoIsThisFor";
import SocialProof from "@/components/marketing/SocialProof";
import OfferBanner from "@/components/marketing/OfferBanner";
import VideoModal from "@/components/marketing/VideoModal";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

      <OfferBanner />

      <header className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <a href="#" className="flex items-center">
            <img src={logo} alt="RagAdvise Logo" className="h-16" />
          </a>
          <nav className="hidden md:flex gap-6 text-sm text-muted-foreground">
            <a href="#assistants" className="hover:text-foreground transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Stories</a>
            <a href="#who" className="hover:text-foreground transition-colors">Who is This For</a>
            <a href="#compare" className="hover:text-foreground transition-colors">Compare</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
            <a href="https://ragadvise.framer.ai/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Blog</a>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href="https://my.ragadvise.com" className="text-sm text-muted-foreground hover:text-foreground">Sign in</a>
            <Button asChild>
              <a href="https://my.ragadvise.com/signup" aria-label="Sign Up – See Value in 20 Minutes">Sign Up</a>
            </Button>
          </div>
          
          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-8">
                <a 
                  href="#assistants" 
                  className="text-lg hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#testimonials" 
                  className="text-lg hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Stories
                </a>
                <a 
                  href="#who" 
                  className="text-lg hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Who is This For
                </a>
                <a 
                  href="#compare" 
                  className="text-lg hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Compare
                </a>
                <a 
                  href="#faq" 
                  className="text-lg hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </a>
                <a 
                  href="https://ragadvise.framer.ai/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-lg hover:text-primary transition-colors"
                >
                  Blog
                </a>
                <div className="flex flex-col gap-3 mt-4 pt-6 border-t">
                  <a href="https://my.ragadvise.com" className="text-lg hover:text-primary transition-colors">
                    Sign in
                  </a>
                  <Button asChild className="w-full">
                    <a href="https://my.ragadvise.com/signup">Sign Up</a>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
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
                  Grow Your Business, While AI Handles the Rest
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Managing every aspect of your business can feel emotionally overwhelming. RagAdvise's AI-powered business assistants handle the calls, messages, meetings, finances, and other tasks you don't have time for.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button size="lg" asChild>
                    <a href="https://my.ragadvise.com/signup">Sign Up – See Value in 20 Minutes</a>
                  </Button>
                  <VideoModal>
                    <Button variant="outline" size="lg">
                      Watch the 1-Minute Demo
                    </Button>
                  </VideoModal>
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
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg transition-colors group-hover:bg-black/40">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </VideoModal>
            </div>
          </div>
        </section>


        {/* Companies */}
        <LogoMarquee />

        {/* Assistants */}
        <FiveAssistants />

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
