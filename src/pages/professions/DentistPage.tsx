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
import LogoMarquee from "@/components/marketing/LogoMarquee";
import googleLogo from "@/assets/logos/google.png";
import teamPhoto from "@/assets/team-photo.jpg";
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
  GraduationCap,
  DollarSign,
  Compass,
  Play,
  ArrowRight,
  Stethoscope,
  UserCheck,
  RefreshCw,
  Eye,
  Megaphone,
} from "lucide-react";

const faqs = [
  {
    q: "Can we keep our current phone number?",
    a: "Yes—port or connect your existing number.",
  },
  {
    q: "Does it replace my front desk?",
    a: "It helps your front desk by handling repetitive questions, capturing leads, and booking—while you choose when to hand off to a human.",
  },
  {
    q: "Can it handle emergencies?",
    a: "You control escalation rules. For urgent scenarios, it can route to your on-call number or provide your preferred instructions.",
  },
  {
    q: "How fast can we launch?",
    a: "Most offices can go live the same day.",
  },
];

const dentalPrompts = [
  "Answer calls about teeth cleaning and book an appointment",
  "Capture new patient details and insurance info",
  "Answer 'Do you accept my insurance?' and book a consult",
  "Handle after-hours emergency dental calls",
  "Schedule a follow-up for a root canal patient",
];

const SectionCTA = () => (
  <div className="mt-10 flex flex-col gap-3 max-w-md mx-auto">
    <Button size="lg" className="w-full h-14 text-base font-semibold rounded-lg" asChild>
      <a href="https://my.ragadvise.com/signup" className="flex items-center justify-center gap-3">
        <img src={googleLogo} alt="" className="w-7 h-7 bg-white rounded-full p-0.5" />
        Signup with Google & Get 30 Minutes Free
      </a>
    </Button>
  </div>
);

const DentistPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [promptValue, setPromptValue] = useState("");
  const { toast } = useToast();

  useState(() => {
    const interval = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % dentalPrompts.length);
    }, 3000);
    return () => clearInterval(interval);
  });

  const siteUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/professions/dentist`
      : "https://ragadvise.com/professions/dentist";
  const title = "AI for Dental Offices — AI Receptionist & Website Voice | RagAdvise";
  const description =
    "Capture every lead and book more appointments with an AI phone line and voice-enabled website chat for dental offices—24/7.";

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
        body: { name: name.trim(), email: email.trim() },
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
                className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-wide text-primary"
                style={{ fontFamily: "'Caprasimo', serif" }}
              >
                Dental offices use AI to manage and close more patients as they call or visit your site.
              </h1>
              <p className="mt-4 text-base text-muted-foreground">
                RagAdvise gives dental offices <strong className="text-foreground">one phone number for calls (direct & automated by AI)</strong> and a <strong className="text-foreground">voice chat box for your website or app</strong>—so you capture leads, answer questions, and book appointments faster.
              </p>

              {/* Prompt Box */}
              <div className="mt-8 max-w-lg mx-auto">
                <div className="relative flex items-center rounded-xl border-2 border-primary/30 bg-background shadow-lg hover:border-primary/50 transition-colors">
                  <input
                    type="text"
                    id="dental-prompt"
                    value={promptValue}
                    onChange={(e) => setPromptValue(e.target.value)}
                    onKeyDown={async (e) => {
                      if (e.key === "Enter" && promptValue.trim()) {
                        try { await supabase.from("chat_prompt_submissions").insert({ prompt_text: promptValue.trim(), page: "dentist" }); } catch (_) {}
                        window.location.href = "https://my.ragadvise.com/signup";
                      }
                    }}
                    placeholder={dentalPrompts[promptIndex]}
                    className="flex-1 h-14 px-4 bg-transparent text-base outline-none placeholder:text-muted-foreground/60 placeholder:transition-opacity placeholder:duration-300"
                  />
                  <button
                    onClick={async () => {
                      if (!promptValue.trim()) return;
                      try { await supabase.from("chat_prompt_submissions").insert({ prompt_text: promptValue.trim(), page: "dentist" }); } catch (_) {}
                      window.location.href = "https://my.ragadvise.com/signup";
                    }}
                    className="mr-2 p-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    aria-label="Send"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 max-w-md mx-auto">
                <Button size="lg" className="w-full h-14 text-base font-semibold rounded-lg" asChild>
                  <a href="https://my.ragadvise.com/signup" className="flex items-center justify-center gap-3">
                    <img src={googleLogo} alt="" className="w-7 h-7 bg-white rounded-full p-0.5" />
                    Signup with Google & Get 30 Minutes Free
                  </a>
                </Button>
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
                <p className="mt-4 text-sm text-muted-foreground italic">
                  Built by ex‑Meta and WebMD employees with love. Built on over 1 million hours of medical patient interaction data across website, phone, video, and email.
                </p>
              </div>
            </div>
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
                    You're looking at AI for dental offices, but it's built to work as part of a connected suite of assistants. If you like this, you'll love how the whole system runs your practice end-to-end.
                  </p>
                </div>
              </div>
              <form onSubmit={handleDemoSubmit} className="flex flex-col sm:flex-row items-end gap-2">
                <div className="flex-1 w-full">
                  <Label htmlFor="gps-name" className="text-xs">Name</Label>
                  <Input id="gps-name" type="text" placeholder="Dr. Smith" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} className="h-9 text-sm" />
                </div>
                <div className="flex-1 w-full">
                  <Label htmlFor="gps-email" className="text-xs">Email</Label>
                  <Input id="gps-email" type="email" placeholder="office@dental.com" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} className="h-9 text-sm" />
                </div>
                <Button type="submit" size="sm" className="h-9 whitespace-nowrap" disabled={isSubmitting}>
                  {isSubmitting ? "..." : <><Send className="mr-1 h-3 w-3" />Schedule Demo & Free Setup</>}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Dental Industry Leaders Marquee */}
        <section aria-labelledby="dental-logos-title" className="border-t bg-muted/10">
          <div className="container py-8 md:py-10">
            <div className="text-center">
              <h2 id="dental-logos-title" className="text-sm font-medium text-muted-foreground">Built for industry leaders</h2>
            </div>
            <div className="group relative mt-6 overflow-hidden">
              <div className="flex w-max items-center gap-12 md:gap-16 animate-marquee will-change-transform">
                {[...Array(2)].flatMap((_, setIdx) => [
                  { name: "Aspen Dental" },
                  { name: "Bupa Dental Care" },
                  { name: "Heartland Dental" },
                  { name: "dentalcorp" },
                  { name: "Pacific Dental Services" },
                  { name: "Mydentist" },
                  { name: "123Dentist" },
                  { name: "Smile Brands" },
                  { name: "Dental Corporation" },
                  { name: "Portman Dental Care" },
                ].map((item, idx) => (
                  <div key={`${item.name}-${setIdx}-${idx}`} className="select-none inline-flex items-center gap-2">
                    <Stethoscope className="size-4 text-muted-foreground/70" aria-hidden="true" />
                    <span className="text-lg md:text-xl font-semibold tracking-[0.18em] uppercase text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">
                      {item.name}
                    </span>
                  </div>
                )))}
              </div>
            </div>
          </div>
        </section>

        {/* Built for the medical front desk */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Built for the medical front desk and call staff (without hiring)
            </h2>
            <div className="mt-10 space-y-6">
              {[
                {
                  icon: Phone,
                  title: "Answer every call",
                  desc: "During peak hours and after-hours with a professional phone number and existing phone device. For direct calls with your human team, get recording and calls logged.",
                },
                {
                  icon: Globe,
                  title: "Add voice-enabled website chat",
                  desc: "So patients can talk instead of type or searching your website (FAQs, lead capture, booking requests).",
                },
                {
                  icon: Calendar,
                  title: "Book and confirm appointments",
                  desc: "With the right provider + visit type.",
                },
                {
                  icon: UserCheck,
                  title: "Capture complete new-patient details",
                  desc: "Like insurance, gender/age, reason for visiting, existing complications (so everything is logged like a real rep).",
                },
                {
                  icon: RefreshCw,
                  title: "Handle repeat questions instantly",
                  desc: "Insurance types accepted, pricing ranges & co-pay, location, hours, gender & age of doctors, financing options, and it improves automatically.",
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
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How it works (simple 1–2–3)
            </h2>
            <div className="space-y-10">
              {[
                {
                  num: "1",
                  title: "Get a dental phone number + AI phone assistant",
                  items: [
                    "Use your existing number or get a new one",
                    "Set your hours, services, providers, and scheduling rules",
                    "Add a voice-enabled website/app chat box for patient bookings + FAQs",
                  ],
                },
                {
                  num: "2",
                  title: "Call your number to test it",
                  items: [
                    "Hear exactly what patients will experience",
                    "Confirm appointment flows, routing, and escalation rules",
                  ],
                },
                {
                  num: "3",
                  title: "Put it everywhere patients look",
                  items: [
                    "Add the phone number to Google Business Profile, website, and social",
                    "Add the voice chat box to your website/app so patients can talk instead of type",
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
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Improve every week (4–5)
            </h2>
            <div className="space-y-10">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0">4</div>
                <div>
                  <h3 className="text-xl font-semibold">Listen to recordings + review transcripts</h3>
                  <ul className="mt-2 space-y-1.5">
                    {["See the top questions patients ask", "Spot missed opportunities and fix answers fast", "Tune booking rules and escalation paths"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0">5</div>
                <div>
                  <h3 className="text-xl font-semibold">Repeat steps 2–3</h3>
                  <ul className="mt-2 space-y-1.5">
                    {["Re-test after every improvement", "Keep promoting the number across channels to capture more calls"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <SectionCTA />
          </div>
        </section>
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Interact with patients on inbound and outbound channels
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Book more appointments and deliver better follow‑up care.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Phone,
                  title: "Calls → direct line + AI assistant",
                  items: [
                    "Get a dedicated phone number for everyday calls (direct or automated)",
                    "Record calls automatically and log customer details",
                    "Auto-create next steps (send X-rays, follow up on prescriptions, schedule next visit)",
                    "Route to a human any time you want",
                  ],
                },
                {
                  icon: Globe,
                  title: "Website voice → qualified leads",
                  items: [
                    "Answers common questions on your site",
                    "Captures name, phone, email, reason for visit, and log customer details",
                    "Routes leads to your team with full context",
                  ],
                },
                {
                  icon: Video,
                  title: "Video calls → notes + next steps",
                  items: [
                    "Take notes during patient calls, auto-create follow-ups (send X-rays, check prescriptions, schedule next visit), and log customer details",
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
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Implementation guarantee
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: "No contracts", desc: "Cancel anytime" },
                { icon: Headphones, title: "Free setup help", desc: "Get live quickly without guesswork" },
                { icon: Stethoscope, title: "Direct engineering support", desc: "Fast help when you need it" },
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
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              AI in dentistry—without the usual barriers
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: DollarSign, title: "Low cost, free to start", desc: "Start with a free trial and get value before you commit." },
                { icon: Clock, title: "30‑minute setup", desc: "We'll help you configure hours, services, providers, and booking rules quickly." },
                { icon: UserCheck, title: "No technical expertise required", desc: "Your team runs it like a normal phone + inbox—RagAdvise handles the automation." },
                { icon: GraduationCap, title: "Training built in", desc: "Short videos and step‑by‑step guidance so your team is confident from day one." },
                { icon: Headphones, title: "Real support, 24/7", desc: "Reach engineering support via email, web/video, or phone when you need it." },
                { icon: Shield, title: "Security + patient privacy", desc: "Access controls and optional 2‑factor authentication. We're built for healthcare workflows and can support HIPAA‑aligned requirements and patient privacy expectations." },
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
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              A simple patient journey (example)
            </h2>
            <div className="space-y-4">
              {[
                "A patient calls after hours about a cleaning or visits your website",
                "RagAdvise answers, collects details, proposes times, and logs customer details",
                "RagAdvise books the appointment (or requests confirmation based on your rules)",
                "The patient gets a confirmation text and reminder",
                "Your team gets the summary, details, and transcript",
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
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Works with the tools you already use
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              RagAdvise is designed to fit into your existing workflow. We can configure call flows, intake questions, routing rules, and follow‑ups around the systems your team already relies on.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Dentrix (practice management)",
                "Open Dental (practice management)",
                "Eaglesoft (practice management)",
                "Curve Dental (cloud practice management)",
                "DEXIS (imaging)",
              ].map((tool) => (
                <span key={tool} className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 shadow-sm text-sm font-medium">
                  <Check className="w-4 h-4 text-primary" />
                  {tool}
                </span>
              ))}
            </div>
            <SectionCTA />
          </div>
        </section>
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img src={teamPhoto} alt="The RagAdvise team" className="rounded-2xl shadow-xl w-full" />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Free Personalized Setup—No $2,500 Fee
                </h2>
                <p className="text-xl text-muted-foreground mb-4">
                  Other platforms charge upwards of <strong className="text-foreground">$2,500</strong> for full personalized setup.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  We believe dental offices deserve AI—without the high cost.
                </p>
                <p className="text-muted-foreground mb-6">
                  That's why our support engineers will <strong className="text-foreground">demo the product and configure your entire setup for free</strong>. No setup fee. No technical expertise required.
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-8">
                  <p className="text-sm font-medium mb-2">What you get in your free setup session:</p>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {[
                      "30-minute personalized demo with a support engineer",
                      "Complete configuration of your AI assistant",
                      "Phone, website voice, and messaging setup included",
                      "Training tailored to your dental practice",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <DemoRequestModal>
                  <Button size="lg">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Your Free Setup
                  </Button>
                </DemoRequestModal>
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
              Ready to capture every patient inquiry?
            </h2>
            <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-90">
              Start Free Trial · No credit card required
            </p>
            <div className="mt-8 flex flex-col gap-3 justify-center max-w-md mx-auto">
              <Button size="lg" variant="secondary" className="w-full h-14 text-base font-semibold rounded-lg" asChild>
                <a href="https://my.ragadvise.com/signup" className="flex items-center justify-center gap-3">
                  <img src={googleLogo} alt="" className="w-7 h-7 bg-white rounded-full p-0.5" />
                  Signup with Google & Get Free 30min. On Phone
                </a>
              </Button>
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
            name: "RagAdvise AI for Dental Offices",
            description,
            url: siteUrl,
          }),
        }}
      />
    </>
  );
};

export default DentistPage;
