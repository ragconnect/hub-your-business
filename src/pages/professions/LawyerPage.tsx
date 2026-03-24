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
  Scale,
  UserCheck,
  RefreshCw,
  Search,
  FileText,
  Users,
  ArrowRight,
  Zap,
  Target,
  Eye,
} from "lucide-react";

const faqs = [
  {
    q: "Will it give legal advice?",
    a: "No—configure it to focus on intake, logistics, and FAQs. You control guardrails and escalation.",
  },
  {
    q: "Can we keep our current phone number?",
    a: "Yes—port or connect your existing number.",
  },
  {
    q: "Can it route by practice area?",
    a: "Yes—separate flows per practice area and lead type.",
  },
  {
    q: "How fast can we launch?",
    a: "Most firms can go live the same day.",
  },
];

const legalPrompts = [
  "Answer calls and qualify potential PI cases, then schedule a callback",
  "Collect intake for DUI citations (citation #, court date, location), then route to me",
  "Ask what charges they're facing and whether court is already scheduled",
  "If someone calls after-hours, collect intake and book the earliest consult time",
  "Text missed calls within 2 minutes, collect case details, and offer consult times",
  "Call clients 24 hours before court and confirm they can attend (log YES/NO)",
  "Follow up with unresponsive leads on Day 1 / Day 3 / Day 7 until they book or opt out",
  "For family law leads, ask urgency (custody/safety) and route high urgency to me",
];

const SectionCTA = () => (
  <div className="mt-10 flex flex-col gap-3 max-w-md mx-auto">
    <Button size="lg" className="w-full h-14 text-base font-semibold rounded-lg" asChild>
      <a href="https://my.ragadvise.com/signup" className="flex items-center justify-center gap-3">
        <img src={googleLogo} alt="" className="w-7 h-7 bg-white rounded-full p-0.5" />
        Sign up with Google & Get 30 Minutes Free
      </a>
    </Button>
    <DemoRequestModal page="lawyer">
      <Button variant="outline" size="lg" className="w-full h-14 text-base font-semibold rounded-lg bg-background">
        <Calendar className="mr-2 h-4 w-4" />
        Schedule Demo & Free Setup
      </Button>
    </DemoRequestModal>
  </div>
);

const LawyerPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [promptValue, setPromptValue] = useState("");
  const { toast } = useToast();

  useState(() => {
    const interval = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % legalPrompts.length);
    }, 3000);
    return () => clearInterval(interval);
  });

  const siteUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/professions/lawyer`
      : "https://ragadvise.com/professions/lawyer";
  const title = "AI for Law Firms & Solicitors — Intake, Follow‑up & Client Management | RagAdvise";
  const description =
    "Turn prospects into booked cases across phone, website, web calls, and email. Automate intake and follow‑through for law firms and solicitors.";

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
        body: { name: name.trim(), email: email.trim(), page: "lawyer" },
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
        <p>Start with 30 minutes of RagAdvise free—AI phone answering and website voice. <a href="https://my.ragadvise.com/signup" className="underline">Get started</a></p>
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
                AI customer assistant that helps law firms manage inbound cases and book more faster.
              </h1>
              <p className="mt-4 text-base text-muted-foreground">
                Across touch-points we answer questions, write down the important details, and help customers schedule—so you can focus on your current clients while RagAdvise handles new calls, messages, and follow-ups.
              </p>

              {/* Prompt Box */}
              <div className="mt-8 max-w-lg mx-auto">
                <div className="relative flex items-center rounded-xl border-2 border-primary/30 bg-background shadow-lg hover:border-primary/50 transition-colors">
                  <input
                    type="text"
                    id="legal-prompt"
                    value={promptValue}
                    onChange={(e) => setPromptValue(e.target.value)}
                    onKeyDown={async (e) => {
                      if (e.key === "Enter" && promptValue.trim()) {
                        try { await supabase.from("chat_prompt_submissions").insert({ prompt_text: promptValue.trim(), page: "lawyer" }); } catch (_) {}
                        window.location.href = "https://my.ragadvise.com/signup";
                      }
                    }}
                    placeholder={legalPrompts[promptIndex]}
                    className="flex-1 h-14 px-4 bg-transparent text-base outline-none placeholder:text-muted-foreground/60 placeholder:transition-opacity placeholder:duration-300"
                  />
                  <button
                    onClick={async () => {
                      if (!promptValue.trim()) return;
                      try { await supabase.from("chat_prompt_submissions").insert({ prompt_text: promptValue.trim(), page: "lawyer" }); } catch (_) {}
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
                Includes 1-800 with AI receptionist, AI chatbot with speaking capabilities, customer note taking across web-calls, and customer identification and personalization across email.
              </p>

              <div className="mt-6 flex flex-col gap-3 max-w-md mx-auto">
                <Button size="lg" className="w-full h-14 text-base font-semibold rounded-lg" asChild>
                  <a href="https://my.ragadvise.com/signup" className="flex items-center justify-center gap-3">
                    <img src={googleLogo} alt="" className="w-7 h-7 bg-white rounded-full p-0.5" />
                    Sign up with Google & Get 30 Minutes Free
                  </a>
                </Button>
                <DemoRequestModal page="lawyer">
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

        {/* Legal firms marquee */}
        <section aria-labelledby="legal-logos-title" className="border-t bg-muted/10">
          <div className="container py-8 md:py-10">
            <div className="text-center">
              <h2 id="legal-logos-title" className="text-sm font-medium text-muted-foreground">Trusted by law firms & legal teams</h2>
            </div>
            <div className="group relative mt-6 overflow-hidden">
              <div className="flex w-max items-center gap-12 md:gap-16 animate-marquee will-change-transform">
                {[...Array(2)].flatMap((_, setIdx) => [
                  { name: "Carter & Associates", use: "Schedule legal callbacks" },
                  { name: "Meridian Law Group", use: "Identify angry clients" },
                  { name: "Beacon Legal", use: "Engage during slow cases" },
                  { name: "Summit Defense Partners", use: "Automate follow-ups" },
                  { name: "Whitfield Family Law", use: "Intake form automation" },
                  { name: "Ironclad Litigation", use: "Client identification" },
                  { name: "Crestview Legal", use: "Cross-channel engagement" },
                  { name: "Harborstone Law", use: "Personalized outreach" },
                ].map((item, idx) => (
                  <div key={`${item.name}-${setIdx}-${idx}`} className="select-none inline-flex items-center gap-2">
                    <Scale className="size-4 text-muted-foreground/70" aria-hidden="true" />
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

        {/* Built for legal professionals */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Built for legal professionals and solicitors
            </h2>
            <div className="mt-10 space-y-6">
              {[
                {
                  icon: Calendar,
                  title: "Automatically schedule call backs",
                  desc: "From your website or phone (intake → qualification → booking).",
                },
                {
                  icon: FileText,
                  title: "Capture details across channels",
                  desc: "Customer details + key notes during web/video calls and across emails—tied to the same client timeline.",
                },
                {
                  icon: RefreshCw,
                  title: "Automatically follow up when prospects go ghost",
                  desc: "So leads don't stall.",
                },
                {
                  icon: Target,
                  title: "Shorten the close cycle",
                  desc: "Most leads take 7–30 touch points to close. RagAdvise helps you make that shorter—and ensures you never forget your touch points.",
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
                    RagAdvise doesn't just answer questions—it tells you where each prospect is in the journey, what's missing, and what to do next so you actually get them booked. where each prospect is in the journey, what's missing, and what to do next so you actually get them booked.
                  </p>
                </div>
              </div>
              <form onSubmit={handleDemoSubmit} className="flex flex-col sm:flex-row items-end gap-2">
                <div className="flex-1 w-full">
                  <Label htmlFor="gps-name" className="text-xs">Name</Label>
                  <Input id="gps-name" type="text" placeholder="Jane Smith" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} className="h-9 text-sm" />
                </div>
                <div className="flex-1 w-full">
                  <Label htmlFor="gps-email" className="text-xs">Email</Label>
                  <Input id="gps-email" type="email" placeholder="partner@lawfirm.com" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} className="h-9 text-sm" />
                </div>
                <Button type="submit" size="sm" className="h-9 whitespace-nowrap" disabled={isSubmitting}>
                  {isSubmitting ? "..." : <><Send className="mr-1 h-3 w-3" />Schedule Demo & Free Setup</>}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Legal Industry Marquee */}
        <section aria-labelledby="legal-logos-title" className="border-t bg-muted/10">
          <div className="container py-8 md:py-10">
            <div className="text-center">
              <h2 id="legal-logos-title" className="text-sm font-medium text-muted-foreground">Built for service businesses</h2>
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
                    <Scale className="size-4 text-muted-foreground/70" aria-hidden="true" />
                    <span className="text-lg md:text-xl font-semibold tracking-[0.18em] uppercase text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">
                      {item.name}
                    </span>
                  </div>
                )))}
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How it works (simple 1–2–3)
            </h2>
            <div className="space-y-10">
              {[
                {
                  num: "1",
                  title: "Set up your channels (phone, website, email) — free setup included",
                  items: [
                    "Get a business phone number (new or keep your existing)",
                    "Add the website snippet so visitors can reach you instantly",
                    "Connect your email so follow‑ups and intake don't get stuck in someone's inbox",
                  ],
                },
                {
                  num: "2",
                  title: "Test it in real life",
                  items: [
                    "Call your number (direct or AI‑managed)",
                    "Visit your website and ask a question",
                    "Send a test email",
                  ],
                },
                {
                  num: "3",
                  title: "Put it everywhere prospects look",
                  items: [
                    "Add the phone number to Google Business Profile and your website",
                    "Send prospects your email (and use it on directories + signatures)",
                    "Send traffic to your website (ads, SEO, referrals) knowing RagAdvise will capture + follow up",
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

        {/* What happens after you go live */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              What happens after you go live
            </h2>
            <div className="mt-10 space-y-6">
              {[
                {
                  icon: Eye,
                  title: "RagAdvise records and logs interactions",
                  desc: "Across phone, website, web calls, and email—everything in one timeline.",
                },
                {
                  icon: Send,
                  title: "RagAdvise auto follows up",
                  desc: "With your go‑ahead / approval mode to get the prospect to the next step.",
                },
                {
                  icon: Target,
                  title: "You refine how RagAdvise interacts",
                  desc: "Adjust tone, qualification questions, routing, and \"do‑not‑answer\" rules.",
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

        {/* RagAdvise */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              RagAdvise
            </h2>
            <div className="mt-10 space-y-8">
              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Phone-first (works from the very first call)
                </h3>
                <p className="text-muted-foreground text-sm mt-2">
                  It starts the moment someone calls your firm—whether the call is direct to your team or AI‑managed.
                </p>
                <ul className="mt-3 space-y-1.5">
                  {[
                    "Direct calls: RagAdvise captures the caller, logs the interaction, and makes sure follow‑ups and status updates happen.",
                    "AI‑managed calls: RagAdvise answers, qualifies, captures details, and routes/escalates when needed.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Then it expands across every channel
                </h3>
                <p className="text-muted-foreground text-sm mt-2">
                  After phone, RagAdvise keeps the same client timeline and follow‑through across:
                </p>
                <ul className="mt-3 space-y-1.5">
                  {[
                    "Website voice/chat (capture + qualify + schedule)",
                    "Email (turn messages into a tracked client + next step)",
                    "Web/video calls (notes + action items + follow‑ups)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <h3 className="text-lg font-semibold mb-3"><h3 className="text-lg font-semibold mb-3">Others do intake. RagAdvise does intake + follow‑through.</h3></h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Many tools help you answer. RagAdvise helps you close—by making "what happens next" automatic.
                </p>
                <ul className="space-y-1.5">
                  {[
                    "Others: help with intake only",
                    "RagAdvise: intake + client timeline + status updates + follow‑ups + human escalation",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <SectionCTA />
          </div>
        </section>

        {/* Inbound and outbound channels */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Interact with potential cases on inbound and outbound channels
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Turn every interaction into a booked consult or a closed case.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Phone,
                  title: "Inbound",
                  items: [
                    "Calls from prospects and referrals",
                    "Website questions and consult requests",
                    "Inbound emails from directories and ads",
                  ],
                },
                {
                  icon: Send,
                  title: "Outbound",
                  items: [
                    "Call backs to interested prospects",
                    "Follow‑up emails and reminders",
                    "Check‑ins when leads go quiet",
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

        {/* Implementation guarantee */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Implementation guarantee
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, title: "No contracts", desc: "Cancel anytime" },
                { icon: Headphones, title: "Free setup and support", desc: "Go live quickly without guesswork" },
                { icon: Zap, title: "Direct engineering support", desc: "Fast help when you need it" },
                { icon: Users, title: "Custom integrations", desc: "Connect the tools your firm already uses" },
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
            <SectionCTA />
          </div>
        </section>

        {/* AI for lawyers without barriers */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              AI for lawyers—without the usual barriers
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: DollarSign, title: "Low cost, free to start", desc: "Get value before you commit." },
                { icon: Clock, title: "Fast setup", desc: "Configure phone, website, and email in minutes." },
                { icon: UserCheck, title: "No technical expertise required", desc: "It runs like a normal phone + inbox + website." },
                { icon: Shield, title: "Guardrails by default", desc: "You control disclaimers, scope, and escalation." },
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

        {/* Simple case journey */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              A simple case journey (example)
            </h2>
            <div className="space-y-4">
              {[
                "A potential client sees you on Google, a legal database/directory, or social media.",
                "They search you online and go to your website.",
                "They ask your AI questions — and the context is stored automatically.",
                "You call them back and immediately see what they need.",
                "You do a web/video call to build confidence — notes and key details are captured automatically.",
                "RagAdvise follows up after the call with the next step.",
                "You email them again with RagAdvise's help.",
                "They become a client — in ~7 touch points (instead of 7–30+ with missed follow‑ups).",
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

        {/* How it works (simple 1-2-3) */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How it works (simple 1–2–3)
            </h2>
            <div className="space-y-10">
              {[
                {
                  num: "1",
                  title: "Set up your channels (phone, website, email) — free setup included",
                  items: [
                    "Get a business phone number (new or keep your existing)",
                    "Add the website snippet so visitors can reach you instantly",
                    "Connect your email so follow‑ups and intake don't get stuck in someone's inbox",
                  ],
                },
                {
                  num: "2",
                  title: "Test it in real life",
                  items: [
                    "Call your number (direct or AI‑managed)",
                    "Visit your website and ask a question",
                    "Send a test email",
                  ],
                },
                {
                  num: "3",
                  title: "Put it everywhere prospects look",
                  items: [
                    "Add the phone number to Google Business Profile and your website",
                    "Send prospects your email (and use it on directories + signatures)",
                    "Send traffic to your website (ads, SEO, referrals) knowing RagAdvise will capture + follow up",
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

        {/* Immediate value */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Immediate value (even with low volume)
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Built for firms with as little as 5 inquiries per month.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { metric: "1 call/week", desc: "Summarized + client record created + follow‑up sent automatically" },
                { metric: "1 website visitor/week", desc: "Logged + contact captured + routed to the right practice area" },
                { metric: "1 email/week", desc: "Converted into a client record + next‑step email drafted/sent + status updated" },
              ].map(({ metric, desc }, i) => (
                <Card key={i} className="border-0 shadow-lg">
                  <CardContent className="pt-6 pb-5 px-5">
                    <p className="text-lg font-bold text-primary mb-2">{metric}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <SectionCTA />
          </div>
        </section>

        {/* Use cases */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Use cases (law firm specific)
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Consultation scheduling + confirmations",
                "Missed‑call text back and after‑hours coverage",
                "Practice‑area routing (PI, family, immigration, criminal, business, etc.)",
                "Intake question collection (timeline, location, opposing party name, documents needed)",
                "Follow‑up sequences for \"no response yet\" leads (Day 1 / Day 3 / Day 7)",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guardrails */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Guardrails and control
            </h2>
            <div className="space-y-6">
              {[
                {
                  icon: Shield,
                  title: "You choose what it can and can't say",
                  desc: "Disclaimers, scope, do‑not‑answer rules—all configurable.",
                },
                {
                  icon: Users,
                  title: "Human handoff anytime",
                  desc: "Urgent/complex matters route to your team.",
                },
                {
                  icon: Scale,
                  title: "Professional tone aligned to your firm",
                  desc: "RagAdvise speaks the way your firm does.",
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
        <section className="border-t">
          <div className="container py-14 md:py-16">
            <div className="rounded-xl border bg-gradient-to-br from-primary/10 to-primary/0 p-8 md:p-10 text-center shadow-sm">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Ready to close more inquiries?
              </h2>
              <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                Setup in minutes. See value in your first 20 minutes—no credit card.
              </p>
              <div className="mt-6 flex flex-col gap-3 justify-center max-w-md mx-auto">
                <Button size="lg" className="w-full h-14 text-base font-semibold rounded-lg" asChild>
                  <a href="https://my.ragadvise.com/signup" className="flex items-center justify-center gap-3">
                    <img src={googleLogo} alt="" className="w-7 h-7 bg-white rounded-full p-0.5" />
                    Sign up with Google & Get 30 Minutes Free
                  </a>
                </Button>
                <DemoRequestModal page="lawyer">
                  <Button size="lg" variant="outline" className="w-full h-14 text-base font-semibold rounded-lg" >
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Demo & Free Setup
                  </Button>
                </DemoRequestModal>
              </div>
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
            name: "RagAdvise AI for Law Firms & Solicitors",
            description,
            url: siteUrl,
          }),
        }}
      />
    </>
  );
};

export default LawyerPage;
