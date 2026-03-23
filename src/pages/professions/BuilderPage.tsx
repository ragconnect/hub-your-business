import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import ScrollingCharacterBg from "@/components/marketing/ScrollingCharacterBg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import DemoRequestModal from "@/components/marketing/DemoRequestModal";
import VideoModal from "@/components/marketing/VideoModal";
import googleLogo from "@/assets/logos/google.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Phone,
  Mail,
  Globe,
  Video,
  Calendar,
  Send,
  Check,
  Shield,
  Clock,
  Headphones,
  DollarSign,
  Compass,
  Play,
  HardHat,
  UserCheck,
  RefreshCw,
  Eye,
  Users,
  ArrowRight,
  Zap,
  Target,
  FileText,
  MapPin,
  AlertTriangle,
  Wrench,
} from "lucide-react";

const faqs = [
  {
    q: "Can we keep our current phone number?",
    a: "Yes—port or connect your existing number.",
  },
  {
    q: "Does it replace my office manager?",
    a: "It helps your office by handling repetitive questions, capturing leads, and booking—while you choose when to hand off to a human.",
  },
  {
    q: "Can it handle emergencies?",
    a: "Yes—configure escalation rules (on-call routing, emergency instructions, priority tags).",
  },
  {
    q: "How fast can we launch?",
    a: "Most teams can go live the same day.",
  },
];

const builderPrompts = [
  "How much does it cost?",
  "What times can you come?",
  "Do you renovate bathrooms?",
  "My roof is leaking, can you help?",
  "Do you offer free estimates?",
  "How soon can you start?",
  "Do you handle insurance claims?",
  "Can you fix water damage?",
  "What areas do you service?",
];

const SectionCTA = () => (
  <div className="mt-10 flex flex-col gap-3 max-w-md mx-auto">
    <Button size="lg" className="w-full h-14 text-base font-semibold rounded-lg" asChild>
      <a href="https://my.ragadvise.com/signup" className="flex items-center justify-center gap-3">
        <img src={googleLogo} alt="" className="w-7 h-7 bg-white rounded-full p-0.5" />
        Sign up with Google & Get 30 Minutes Free
      </a>
    </Button>
    <DemoRequestModal page="builder">
      <Button variant="outline" size="lg" className="w-full h-14 text-base font-semibold rounded-lg bg-background">
        <Calendar className="mr-2 h-4 w-4" />
        Schedule Demo & Free Setup
      </Button>
    </DemoRequestModal>
  </div>
);

const BuilderPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [promptValue, setPromptValue] = useState("");
  const { toast } = useToast();

  useState(() => {
    const interval = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % builderPrompts.length);
    }, 3000);
    return () => clearInterval(interval);
  });

  const siteUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/professions/builder`
      : "https://ragadvise.com/professions/builder";
  const title = "AI for General Contractors & Builders — Capture Leads, Book Estimates & Follow Up | RagAdvise";
  const description =
    "Capture every lead and win more jobs with an AI phone line and voice-enabled website chat for builders, roofers, and contractors—24/7.";

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-demo-request", {
        body: { name: name.trim(), email: email.trim(), page: "builder" },
      });
      if (error) throw new Error(error.message);
      toast({ title: "Demo request submitted!", description: "We'll be in touch within 24 hours." });
      setName("");
      setEmail("");
    } catch {
      toast({ title: "Something went wrong", description: "Please try again or email us directly.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={siteUrl} />
      </Helmet>

      <div className="w-full bg-primary text-primary-foreground py-2 text-center text-sm font-medium">
        <p>Start with 30 minutes of RagAdvise free—AI phone answering (live or automated) and website voice. <a href="https://my.ragadvise.com/signup" className="underline">Get started</a></p>
      </div>
      <Header />

      <main>
        {/* Hero */}
        <section className="relative pt-2 md:pt-4 lg:pt-2 pb-16 md:pb-24 overflow-hidden" aria-labelledby="hero-title">
          <ScrollingCharacterBg />
          <div className="container relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h1
                id="hero-title"
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide text-primary"
                style={{ fontFamily: "'Caprasimo', serif" }}
              >
                Close and manage up to 3× more leads with an AI customer assistant supporting your inbound calls & website visits.
              </h1>
              <p className="mt-4 text-base text-muted-foreground">
                Answer "Do you service my area?" or "Can I get a ballpark estimate?" then send personalized follow‑ups. Store customer details, recognize repeat callers, and turn leads into jobs faster.
              </p>

              {/* Prompt Box */}
              <div className="mt-8 max-w-lg mx-auto">
                <div className="relative flex items-center rounded-xl border-2 border-primary/30 bg-background shadow-lg hover:border-primary/50 transition-colors">
                  <input
                    type="text"
                    id="builder-prompt"
                    value={promptValue}
                    onChange={(e) => setPromptValue(e.target.value)}
                    onKeyDown={async (e) => {
                      if (e.key === "Enter" && promptValue.trim()) {
                        try { await supabase.from("chat_prompt_submissions").insert({ prompt_text: promptValue.trim(), page: "builder" }); } catch (_) {}
                        window.location.href = "https://my.ragadvise.com/signup";
                      }
                    }}
                    placeholder={builderPrompts[promptIndex]}
                    className="flex-1 h-14 px-4 bg-transparent text-base outline-none placeholder:text-muted-foreground/60 placeholder:transition-opacity placeholder:duration-300"
                  />
                  <button
                    onClick={async () => {
                      if (!promptValue.trim()) return;
                      try { await supabase.from("chat_prompt_submissions").insert({ prompt_text: promptValue.trim(), page: "builder" }); } catch (_) {}
                      window.location.href = "https://my.ragadvise.com/signup";
                    }}
                    className="mr-2 p-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    aria-label="Send"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="mt-3 text-sm font-semibold text-foreground">
                Across phone, website, video calls, and email
              </p>
              <p className="mt-2 text-xs text-muted-foreground max-w-md mx-auto">
                Includes 1-800 with an AI receptionist, AI website chat with speaking capabilities, customer note-taking across web calls, and remembers past conversations across email, website, and phone.
              </p>

              <div className="mt-6 flex flex-col gap-3 max-w-md mx-auto">
                <Button size="lg" className="w-full h-14 text-base font-semibold rounded-lg" asChild>
                  <a href="https://my.ragadvise.com/signup" className="flex items-center justify-center gap-3">
                    <img src={googleLogo} alt="" className="w-7 h-7 bg-white rounded-full p-0.5" />
                    Sign up with Google & Get 30 Minutes Free
                  </a>
                </Button>
                <DemoRequestModal page="builder">
                  <Button variant="outline" size="lg" className="w-full h-14 text-base font-semibold rounded-lg bg-background">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Demo & Free Setup
                  </Button>
                </DemoRequestModal>
                <div className="flex items-center justify-center gap-2 text-sm mt-1">
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

        {/* Builder Marquee */}
        <section aria-labelledby="builder-logos-title" className="border-t bg-muted/10">
          <div className="container py-8 md:py-10">
            <div className="text-center">
              <h2 id="builder-logos-title" className="text-sm font-medium text-muted-foreground">Built for builders and their office managers</h2>
            </div>
            <div className="group relative mt-6 overflow-hidden">
              <div className="flex w-max items-center gap-12 md:gap-16 animate-marquee will-change-transform">
                {[...Array(2)].flatMap((_, setIdx) => [
                  { name: "Summit Roofing", use: "After-hours coverage" },
                  { name: "Ironclad Builders", use: "Estimate scheduling" },
                  { name: "Peak Renovations", use: "Lead qualification" },
                  { name: "Cornerstone GC", use: "Emergency routing" },
                  { name: "Ridgeline Construction", use: "Follow-up sequences" },
                  { name: "Horizon Contracting", use: "Insurance intake" },
                  { name: "Trueline Roofing", use: "Service-area filtering" },
                  { name: "Blueprint Builders", use: "Commercial routing" },
                ].map((item, idx) => (
                  <div key={`${item.name}-${setIdx}-${idx}`} className="select-none inline-flex items-center gap-2">
                    <HardHat className="size-4 text-muted-foreground/70" aria-hidden="true" />
                    <span className="text-lg md:text-xl font-semibold tracking-[0.18em] uppercase text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground/50 lowercase tracking-normal">
                      {item.use}
                    </span>
                  </div>
                )))}
              </div>
            </div>
          </div>
        </section>

        {/* Built for builders */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Built for builders and their office managers
            </h2>
            <div className="mt-10 space-y-6">
              {[
                {
                  icon: Phone,
                  title: "Answer every call without sending customers to voicemail",
                  desc: '"What areas do you service?", "I have a leak", and "How much does the bathroom remodel cost?"',
                },
                {
                  icon: Globe,
                  title: "Voice AI speaks to customers on your website",
                  desc: "Tailored to your business. See their most-asked questions, book appointments, steer them to specific pages faster, and have it all recorded.",
                },
                {
                  icon: FileText,
                  title: "Instantly capture and qualify leads",
                  desc: "Service type, address, timeline, budget range, photos, insurance questions.",
                },
                {
                  icon: Calendar,
                  title: "Book estimates faster",
                  desc: "Collect the right details up front and propose time windows.",
                },
                {
                  icon: RefreshCw,
                  title: "Reduce back-and-forth on top repeat questions",
                  desc: "Pricing ranges, availability, financing, warranty, licensing/insurance, and service areas.",
                },
                {
                  icon: Target,
                  title: "Route the right calls to the right person",
                  desc: "Roofing vs. gutters, residential vs. commercial, emergency leak vs. new install.",
                },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <SectionCTA />
          </div>
        </section>

        {/* GPS Callout */}
        <section className="py-8 border-y bg-muted/30">
          <div className="container">
            <div className="max-w-5xl mx-auto flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <Compass className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-base">RagAdvise is your GPS for business.</p>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    RagAdvise doesn't just answer questions—it tells you where each prospect is in the journey, what's missing, and what to do next so you actually get them booked.
                  </p>
                </div>
              </div>
              <form onSubmit={handleDemoSubmit} className="flex flex-col sm:flex-row items-end gap-2">
                <div className="flex-1 w-full">
                  <Label htmlFor="gps-name" className="text-xs">Name</Label>
                  <Input id="gps-name" type="text" placeholder="Mike Johnson" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} className="h-9 text-sm" />
                </div>
                <div className="flex-1 w-full">
                  <Label htmlFor="gps-email" className="text-xs">Email</Label>
                  <Input id="gps-email" type="email" placeholder="office@summitroofing.com" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} className="h-9 text-sm" />
                </div>
                <Button type="submit" size="sm" className="h-9 whitespace-nowrap" disabled={isSubmitting}>
                  {isSubmitting ? "..." : <><Send className="mr-1 h-3 w-3" />Schedule Demo & Free Setup</>}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How it works
            </h2>
            <div className="space-y-10">
              {[
                {
                  num: "1",
                  title: "Add AI voice to your current phone and site",
                  items: [
                    "Get a 1-800 phone number + AI phone assistant",
                    "Use your existing number or get a new one",
                    "Add a voice-enabled website chat box for estimate requests + FAQs",
                    "Set your hours, service areas, services, and qualification rules",
                  ],
                },
                {
                  num: "2",
                  title: "Call your number to test it",
                  items: [
                    "Hear exactly what customers will experience",
                    "Confirm qualification questions, routing, and escalation rules",
                  ],
                },
                {
                  num: "3",
                  title: "Put it everywhere customers look",
                  items: [
                    "Add the phone number to Google Business Profile, your website, and social",
                    "Add the voice chat box to your website so customers can talk instead of typing",
                  ],
                },
              ].map(({ num, title, items }) => (
                <div key={num} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0">
                    {num}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <ul className="mt-2 space-y-1.5">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <SectionCTA />
          </div>
        </section>

        {/* Improve every week */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Improve every week
            </h2>
            <div className="space-y-6">
              {[
                { icon: Eye, title: "Listen to recordings + review transcripts", desc: "" },
                { icon: Target, title: "See the top questions and objections", desc: "" },
                { icon: Zap, title: "Spot missed opportunities and fix answers fast", desc: "" },
                { icon: RefreshCw, title: "Tune qualification and routing rules", desc: "" },
                { icon: Phone, title: "Re-test after every improvement", desc: "" },
                { icon: Globe, title: "Keep promoting the number across channels to capture more calls", desc: "" },
              ].map(({ icon: Icon, title }, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{title}</h3>
                  </div>
                </div>
              ))}
            </div>
            <SectionCTA />
          </div>
        </section>

        {/* Channels */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Interact with customers on inbound and outbound channels
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Win more jobs and deliver better follow-through.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Phone,
                  title: "Calls → direct line + AI assistant",
                  items: [
                    "Get a dedicated phone number for everyday calls (direct or automated)",
                    "Record calls automatically and log customer details",
                    "Auto-create next steps (request photos, schedule site visit, send estimate link)",
                    "Route to a human any time you want",
                  ],
                },
                {
                  icon: Globe,
                  title: "Website voice → qualified leads",
                  items: [
                    "Answers common questions on your site",
                    "Captures name, phone, email, address, and project details",
                    "Routes leads to your team with full context",
                  ],
                },
                {
                  icon: Video,
                  title: "Video calls → notes + next steps",
                  items: [
                    "Take notes during customer calls, auto-create follow-ups, and log customer details",
                  ],
                },
                {
                  icon: Mail,
                  title: "Email → fewer inbox fires",
                  items: [
                    "Responds to common requests quickly",
                    "Drafts replies for your approval when you want human oversight",
                    "Store all email exchanges to the customer profile",
                  ],
                },
              ].map(({ icon: Icon, title, items }, i) => (
                <Card key={i} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg">{title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            <SectionCTA />
          </div>
        </section>

        {/* Use cases */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Construction & roofing use cases
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Missed-call text back + after-hours coverage ("Thanks for calling — what can we help with?")',
                "Estimate request intake (roof age, leak location, sqft, material preference, timeline)",
                "Emergency routing (active leak, storm damage, fallen tree)",
                "Service-area filtering (zip codes / radius)",
                "Commercial vs. residential qualification and routing",
                "Insurance + storm claims intake (carrier, adjuster status, photos)",
                "Follow-up sequences for unresponsive leads (Day 1 / Day 3 / Day 7)",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
            <SectionCTA />
          </div>
        </section>

        {/* Implementation guarantee */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Implementation guarantee
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: "No contracts", desc: "Cancel anytime" },
                { icon: Headphones, title: "Free setup help", desc: "Go live quickly without guesswork" },
                { icon: Zap, title: "Direct engineering support", desc: "Fast help when you need it" },
              ].map(({ icon: Icon, title, desc }, i) => (
                <Card key={i} className="text-center border-0 shadow-lg">
                  <CardContent className="pt-8 pb-6 px-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* AI without barriers */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              AI for contractors—without the usual barriers
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: DollarSign, title: "Low cost, free to start", desc: "Get value before you commit." },
                { icon: Clock, title: "30-minute setup", desc: "We'll help you configure services, service areas, and estimate workflows quickly." },
                { icon: UserCheck, title: "No technical expertise required", desc: "It runs like a normal phone + inbox—RagAdvise handles the automation." },
                { icon: Shield, title: "Training built in", desc: "Short videos and step-by-step guidance so your team is confident from day one." },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <SectionCTA />
          </div>
        </section>

        {/* Simple job journey */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              A simple job journey (example)
            </h2>
            <div className="space-y-4">
              {[
                "A homeowner calls after hours about a leak or visits your website.",
                "RagAdvise answers, collects details, and requests photos if needed.",
                "RagAdvise proposes estimate windows (or requests confirmation based on your rules).",
                "The customer gets a confirmation text and reminder.",
                "Your team gets the summary, details, and transcript—ready to quote.",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-primary">
                    {i + 1}
                  </div>
                  <p className="text-muted-foreground pt-1">{step}</p>
                </div>
              ))}
            </div>
            <SectionCTA />
          </div>
        </section>

        {/* Works with tools */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Works with the tools you already use
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              RagAdvise is designed to fit into your existing workflow. We can configure call flows, intake questions, routing rules, and follow-ups around the systems your team already relies on.
            </p>
            <SectionCTA />
          </div>
        </section>

        {/* Built for service businesses marquee */}
        <section aria-labelledby="service-logos-title" className="border-t bg-muted/10">
          <div className="container py-8 md:py-10">
            <div className="text-center">
              <h2 id="service-logos-title" className="text-sm font-medium text-muted-foreground">Built for service businesses</h2>
            </div>
            <div className="group relative mt-6 overflow-hidden">
              <div className="flex w-max items-center gap-12 md:gap-16 animate-marquee will-change-transform">
                {[...Array(2)].flatMap((_, setIdx) => [
                  { name: "City Auto Dealers" },
                  { name: "Prime Plumbing" },
                  { name: "GreenLeaf Realty" },
                  { name: "Swift HVAC" },
                  { name: "Peak Landscaping" },
                  { name: "Starline Movers" },
                  { name: "Sunset Spa" },
                ].map((item, idx) => (
                  <div key={`${item.name}-${setIdx}-${idx}`} className="select-none inline-flex items-center gap-2">
                    <Wrench className="size-4 text-muted-foreground/70" aria-hidden="true" />
                    <span className="text-lg md:text-xl font-semibold tracking-[0.18em] uppercase text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">
                      {item.name}
                    </span>
                  </div>
                )))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently asked questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <SectionCTA />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to capture every construction inquiry?
            </h2>
            <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-90">
              Start Free Trial · No credit card required
            </p>
            <div className="mt-8 flex flex-col gap-3 justify-center max-w-md mx-auto">
              <Button size="lg" variant="secondary" className="w-full h-14 text-base font-semibold rounded-lg" asChild>
                <a href="https://my.ragadvise.com/signup" className="flex items-center justify-center gap-3">
                  <img src={googleLogo} alt="" className="w-7 h-7 bg-white rounded-full p-0.5" />
                  Sign up with Google & Get 30 Minutes Free
                </a>
              </Button>
              <DemoRequestModal page="builder">
                <Button size="lg" variant="outline" className="w-full h-14 text-base font-semibold rounded-lg border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Demo & Free Setup
                </Button>
              </DemoRequestModal>
            </div>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "RagAdvise AI for General Contractors & Builders",
            description,
            url: siteUrl,
          }),
        }}
      />
    </>
  );
};

export default BuilderPage;
