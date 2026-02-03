import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import OfferBanner from "@/components/marketing/OfferBanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import DemoRequestModal from "@/components/marketing/DemoRequestModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Phone,
  Mail,
  MessageSquare,
  Globe,
  Star,
  Bot,
  Calendar,
  Send,
  Check,
  X,
  Sparkles,
  Building2,
  Rocket,
  Clock,
  DollarSign,
  Settings,
  Shield,
  BarChart3,
  Users,
  Bell,
  CreditCard,
  Lightbulb,
  Compass,
  ListChecks,
  BookOpen,
  Globe as GlobeIcon,
} from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";
import testimonialMaria from "@/assets/testimonials/testimonial-maria.jpg";
import testimonialMike from "@/assets/testimonials/testimonial-mike.jpg";
import testimonialJames from "@/assets/testimonials/testimonial-james.jpg";
import logoMariasKitchen from "@/assets/testimonials/logo-marias-kitchen.png";
import logoRapidPlumb from "@/assets/testimonials/logo-rapid-plumb.png";
import logoVitalBalance from "@/assets/testimonials/logo-vital-balance.png";
import LogoMarquee from "@/components/marketing/LogoMarquee";

const faqs = [
  {
    q: "How long does setup take?",
    a: "30 minutes. Connect your phone and email (or get new ones), answer questions about your business, and your AI is ready to go.",
  },
  {
    q: "What if the AI makes a mistake?",
    a: "You control exactly what AI can say. Use approval mode to review responses before they're sent, or set specific rules for handling different topics.",
  },
  {
    q: "Can I keep my existing phone number and email?",
    a: "Yes. Connect your current business number and email address. Or we'll provide new professional ones—your choice.",
  },
  {
    q: "What happens to complex customer issues?",
    a: "AI knows when it needs help. Complex problems, special requests, or urgent issues get escalated to you with full conversation history and context.",
  },
  {
    q: "What channels does it work on?",
    a: "Phone calls, SMS, email, WhatsApp, Facebook Messenger, Instagram DMs, and website chat. Add or remove channels anytime.",
  },
  {
    q: "How much does it cost?",
    a: "Plans start at $16/month and scale based on usage. Higher-tier plans include unlimited calls, emails, and messages across all channels.",
  },
  {
    q: "Do I need to tell customers I'm using AI?",
    a: "That's up to you. AI introduces itself naturally: \"Hi, this is the RagAdvise assistant for [Your Business]. How can I help you today?\" Most customers don't care—they just want fast, accurate answers.",
  },
  {
    q: "Can I try it before committing?",
    a: "Yes. 7-day free trial with full access to all features. No credit card required to start.",
  },
];

const ConversationAssistant = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const siteUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/assistants/conversation`
      : "https://ragadvise.com/assistants/conversation";
  const title =
    "Conversation Assistant — AI for Calls, Emails & Reviews | RagAdvise";
  const description =
    "Get an AI assistant that handles all customer communication for your business across phone, email, text, social media, website chat, and reviews.";

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Please enter a valid email",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-demo-request", {
        body: { name: name.trim(), email: email.trim() },
      });

      if (error) {
        console.error("Error sending demo request:", error);
        throw new Error(error.message);
      }

      toast({
        title: "Demo request submitted!",
        description: "We'll be in touch within 24 hours.",
      });
      setName("");
      setEmail("");
    } catch (error: any) {
      console.error("Demo request error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly.",
        variant: "destructive",
      });
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

      <OfferBanner />
      <Header />

      <main>
        {/* Hero */}
        <section
          className="relative pt-16 md:pt-24 pb-16 md:pb-24"
          aria-labelledby="hero-title"
        >
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_0%,hsl(var(--primary)/0.15),transparent_60%)]" />
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Hero Text */}
              <div className="text-center lg:text-left">
                <h1
                  id="hero-title"
                  className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight"
                >
                  Get an AI assistant that handles all customer communication
                  for your business.
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                  Look professional and never miss a customer again with an AI
                  assistant that works 24/7 across:
                </p>
                <div className="mt-4 flex flex-wrap gap-3 justify-center lg:justify-start text-sm font-medium">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full">
                    <Phone className="w-4 h-4" /> Phone calls
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full">
                    <Mail className="w-4 h-4" /> Email
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full">
                    <MessageSquare className="w-4 h-4" /> Text/SMS
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full">
                    <Users className="w-4 h-4" /> Social media
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full">
                    <Globe className="w-4 h-4" /> Website chat
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full">
                    <Star className="w-4 h-4" /> Reviews
                  </span>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-background"
                    asChild
                  >
                    <a href="https://my.ragadvise.com/signup">
                      Start Free Trial
                    </a>
                  </Button>
                  <DemoRequestModal>
                    <Button size="lg">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule a Demo
                    </Button>
                  </DemoRequestModal>
                </div>
              </div>

              {/* Right - Demo Contact Form */}
              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <Calendar className="w-10 h-10 text-primary mx-auto mb-3" />
                    <h3 className="text-2xl font-bold">
                      Free 30 Minute Personalized Setup
                    </h3>
                    <p className="text-muted-foreground mt-2">
                      Enter your details and we'll reach out within 24 hours
                    </p>
                  </div>
                  <form onSubmit={handleDemoSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="demo-name">Your Name</Label>
                      <Input
                        id="demo-name"
                        type="text"
                        placeholder="John Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={100}
                        className="bg-background rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="demo-email">Email Address</Label>
                      <Input
                        id="demo-email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={255}
                        className="bg-background rounded-xl"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full rounded-xl"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Request Demo
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* GPS Callout */}
        <section className="py-8 border-y bg-muted/30">
          <div className="container">
            <div className="flex items-start gap-4 max-w-3xl mx-auto">
              <Compass className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-lg">RagAdvise is your GPS for business.</p>
                <p className="text-muted-foreground mt-1">
                  You're looking at the Conversation Assistant, but it's built to work as part of a connected suite of assistants. If you like this, you'll love how the whole system runs your business end-to-end.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Logo Marquee - Social Proof */}
        <LogoMarquee />

        {/* Audience Selector */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Which describes you?
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Select your situation to see what RagAdvise can do for you.
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer group">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Rocket className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Starting a new business</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Get a professional communication system from day one—no
                    staff, no hardware, no missed opportunities.
                  </p>
                  <a
                    href="#features"
                    className="text-primary font-medium inline-flex items-center gap-1 hover:underline"
                  >
                    See what you get →
                  </a>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer group">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Building2 className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">
                      Running an existing business
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Upgrade your current phone and email system—keep your
                    numbers, handle more volume, scale without hiring.
                  </p>
                  <a
                    href="#features"
                    className="text-primary font-medium inline-flex items-center gap-1 hover:underline"
                  >
                    See what you get →
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Unified Features Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Everything You Need in One AI Assistant
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              One unified system that handles all customer communication across
              every channel.
            </p>

            {/* Row 1: Phone & Email */}
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-6">
              {/* Phone */}
              <Card className="border-0 shadow-lg h-full flex flex-col">
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Professional Phone System</h3>
                      <p className="text-sm text-muted-foreground">AI-powered phone that never misses a call</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4 flex-1">
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Business phone number</strong> – New or port existing</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>AI receptionist</strong> – 24/7, FAQs, appointments</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Works on cell phone</strong> – No hardware needed</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Smart routing</strong> – Overflow & after-hours</span>
                    </li>
                  </ul>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <p className="text-xs font-semibold text-primary mb-1">New businesses</p>
                      <p className="text-[11px] text-muted-foreground leading-tight">Skip hiring a receptionist ($2,500/mo+). Get a professional phone presence from day one for $16/mo. AI answers every call, books appointments, and handles FAQs 24/7.</p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <p className="text-xs font-semibold text-primary mb-1">Existing businesses</p>
                      <p className="text-[11px] text-muted-foreground leading-tight">Stop losing 30-40% of calls to voicemail. AI handles overflow during busy times and after hours. Keep your existing number—add AI as your always-available backup.</p>
                    </div>
                  </div>
                  <DemoRequestModal>
                    <Button size="sm" className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Demo
                    </Button>
                  </DemoRequestModal>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="border-0 shadow-lg h-full flex flex-col">
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Business Email with AI</h3>
                      <p className="text-sm text-muted-foreground">Instant responses to common questions</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4 flex-1">
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Business email</strong> – New or connect existing</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Smart auto-responses</strong> – Hours, pricing, location</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>AI training tools</strong> – Teach your specifics</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Reduce email time 70%</strong> – AI handles routine</span>
                    </li>
                  </ul>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <p className="text-xs font-semibold text-primary mb-1">New businesses</p>
                      <p className="text-[11px] text-muted-foreground leading-tight">Respond to inquiries in minutes, not hours. Leads go to whoever responds first. AI drafts professional responses instantly so you win more business from day one.</p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <p className="text-xs font-semibold text-primary mb-1">Existing businesses</p>
                      <p className="text-[11px] text-muted-foreground leading-tight">Stop answering the same questions 50 times a day. AI handles pricing, hours, location, and FAQs automatically. You only see emails that actually need your attention.</p>
                    </div>
                  </div>
                  <DemoRequestModal>
                    <Button size="sm" className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Demo
                    </Button>
                  </DemoRequestModal>
                </CardContent>
              </Card>
            </div>

            {/* Row 2: Messaging & Website Chat */}
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-6">
              {/* Messaging */}
              <Card className="border-0 shadow-lg h-full flex flex-col">
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Text, SMS & Social</h3>
                      <p className="text-sm text-muted-foreground">One inbox for all messages</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4 flex-1">
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>SMS on business number</strong> – AI responds instantly</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>WhatsApp Business</strong> – AI handles conversations</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Facebook & Instagram DMs</strong> – All in one place</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Multi-channel consistency</strong> – Same AI knowledge</span>
                    </li>
                  </ul>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <p className="text-xs font-semibold text-primary mb-1">New businesses</p>
                      <p className="text-[11px] text-muted-foreground leading-tight">Be present on SMS, WhatsApp, Facebook, and Instagram without juggling 5 different apps. One AI manages all channels with consistent, professional responses.</p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <p className="text-xs font-semibold text-primary mb-1">Existing businesses</p>
                      <p className="text-[11px] text-muted-foreground leading-tight">Consolidate 5+ messaging platforms into one inbox. No more missed DMs or forgotten texts. AI responds instantly so customers don't wait—or go to competitors.</p>
                    </div>
                  </div>
                  <DemoRequestModal>
                    <Button size="sm" className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Demo
                    </Button>
                  </DemoRequestModal>
                </CardContent>
              </Card>

              {/* Website Chat */}
              <Card className="border-0 shadow-lg h-full flex flex-col">
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Website Chat</h3>
                      <p className="text-sm text-muted-foreground">Convert more visitors into customers</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4 flex-1">
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>AI chat widget</strong> – Install in 5 min, works 24/7</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Lead capture</strong> – Collects info, books appointments</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Same knowledge</strong> – Consistent across all channels</span>
                    </li>
                  </ul>
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/10 mb-4">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-primary">71% of customers expect chat.</strong> AI gives you enterprise-level support without staff.
                    </p>
                  </div>
                  <DemoRequestModal>
                    <Button size="sm" className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Demo
                    </Button>
                  </DemoRequestModal>
                </CardContent>
              </Card>
            </div>

            {/* Row 3: Reviews & Automation */}
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-6">
              {/* Review Management */}
              <Card className="border-0 shadow-lg h-full flex flex-col">
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Star className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Review Management</h3>
                      <p className="text-sm text-muted-foreground">Build reputation automatically</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4 flex-1">
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Multi-platform monitoring</strong> – Google, Yelp, FB & more</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Response drafting</strong> – AI drafts, you approve</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Review requests</strong> – Email, SMS, phone, website</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Follow-ups</strong> – Auto reminders = 3x more reviews</span>
                    </li>
                  </ul>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <p className="text-xs font-semibold text-primary mb-1">New businesses</p>
                      <p className="text-[11px] text-muted-foreground leading-tight">Build social proof without awkward in-person asks. AI automatically requests reviews via email, text, or phone after each job. Get your first 50+ reviews fast.</p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <p className="text-xs font-semibold text-primary mb-1">Existing businesses</p>
                      <p className="text-[11px] text-muted-foreground leading-tight">Most businesses get 300-500% more reviews within 3 months. AI drafts personalized responses to every review and sends smart follow-up reminders.</p>
                    </div>
                  </div>
                  <DemoRequestModal>
                    <Button size="sm" className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Demo
                    </Button>
                  </DemoRequestModal>
                </CardContent>
              </Card>

              {/* Smart Routing & Automation */}
              <Card className="border-0 shadow-lg h-full flex flex-col">
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Smart Routing & Automation</h3>
                      <p className="text-sm text-muted-foreground">AI handles routine, escalates complex</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4 flex-1">
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Intelligent escalation</strong> – Full context when needed</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Appointment reminders</strong> – Reduce no-shows</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Payment reminders</strong> – Friendly follow-ups</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Follow-up sequences</strong> – Nurture leads automatically</span>
                    </li>
                  </ul>
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/10 mb-4">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-primary">Never drop the ball.</strong> AI ensures every customer gets attention at the right time.
                    </p>
                  </div>
                  <DemoRequestModal>
                    <Button size="sm" className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Demo
                    </Button>
                  </DemoRequestModal>
                </CardContent>
              </Card>
            </div>

            {/* Admin & Control - Full width */}
            <div className="max-w-6xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Settings className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Admin & Control</h3>
                      <p className="text-sm text-muted-foreground">Full visibility and control over your AI</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>AI training dashboard</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>Response approval mode</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>Team access</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>Analytics dashboard</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>Privacy & security</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Comparison */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Pricing That Makes Sense
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              See how much you save compared to traditional solutions.
            </p>

            <Tabs defaultValue="new" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="new" className="text-base">
                  <Rocket className="w-4 h-4 mr-2" />
                  For New Businesses
                </TabsTrigger>
                <TabsTrigger value="existing" className="text-base">
                  <Building2 className="w-4 h-4 mr-2" />
                  For Existing Businesses
                </TabsTrigger>
              </TabsList>

              <TabsContent value="new">
                <Card className="border-primary/20">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="text-5xl font-bold text-primary mb-2">
                        $16
                        <span className="text-xl font-normal text-muted-foreground">
                          /month
                        </span>
                      </div>
                      <p className="text-lg text-muted-foreground">
                        Complete AI communication system
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-500" />
                          What's included:
                        </h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Business phone + AI receptionist</li>
                          <li>• Business email + AI responses</li>
                          <li>• Text, SMS & social messaging</li>
                          <li>• Website chat</li>
                          <li>• Review management</li>
                          <li>• Unlimited calls, emails, messages</li>
                        </ul>
                      </div>

                      <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                        <h4 className="font-bold mb-4 flex items-center gap-2 text-destructive">
                          <X className="w-5 h-5" />
                          Building it yourself:
                        </h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>
                            Receptionist:{" "}
                            <span className="line-through">$2,500/month</span>
                          </li>
                          <li>
                            Answering service:{" "}
                            <span className="line-through">$200-500/month</span>
                          </li>
                          <li>
                            Live chat:{" "}
                            <span className="line-through">$50-200/month</span>
                          </li>
                          <li>
                            Review tool:{" "}
                            <span className="line-through">$50-100/month</span>
                          </li>
                          <li className="font-bold pt-2 border-t border-destructive/20">
                            Total:{" "}
                            <span className="line-through">
                              $2,800-3,300/month
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-primary/10 rounded-xl text-center">
                      <p className="text-lg font-bold text-primary">
                        RagAdvise = 20x cheaper
                      </p>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-background"
                        asChild
                      >
                        <a href="https://my.ragadvise.com/signup">
                          Start Free Trial
                        </a>
                      </Button>
                      <DemoRequestModal>
                        <Button size="lg">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Demo
                        </Button>
                      </DemoRequestModal>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="existing">
                <Card className="border-primary/20">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="text-5xl font-bold text-primary mb-2">
                        $16
                        <span className="text-xl font-normal text-muted-foreground">
                          /month
                        </span>
                      </div>
                      <p className="text-lg text-muted-foreground">
                        vs. your current costs
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-500" />
                          What's included:
                        </h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• AI phone answering + keep your number</li>
                          <li>• AI email responses + keep your email</li>
                          <li>• AI text & social messaging</li>
                          <li>• Website chat with AI</li>
                          <li>• Review management</li>
                          <li>• Unlimited volume across all channels</li>
                        </ul>
                      </div>

                      <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                        <h4 className="font-bold mb-4 flex items-center gap-2 text-destructive">
                          <X className="w-5 h-5" />
                          What you're spending now:
                        </h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>
                            Receptionist/VA:{" "}
                            <span className="line-through">$2,500/month</span>
                          </li>
                          <li>
                            OR answering service:{" "}
                            <span className="line-through">$200-500/month</span>
                          </li>
                          <li>
                            Repetitive emails: 15-20 hrs/week ={" "}
                            <span className="line-through">
                              $600-1,200 lost productivity
                            </span>
                          </li>
                          <li>
                            Missed voicemails: 5-10/week ={" "}
                            <span className="line-through">
                              $2,000-5,000 lost revenue
                            </span>
                          </li>
                          <li className="font-bold pt-2 border-t border-destructive/20">
                            Total:{" "}
                            <span className="line-through">
                              $3,300-9,200/month
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-primary/10 rounded-xl text-center">
                      <p className="text-lg font-bold text-primary">
                        Save $3,000-9,000+/month while handling MORE volume
                      </p>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-background"
                        asChild
                      >
                        <a href="https://my.ragadvise.com/signup">
                          Start Free Trial
                        </a>
                      </Button>
                      <DemoRequestModal>
                        <Button size="lg">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Demo
                        </Button>
                      </DemoRequestModal>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Benefits Summary */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              RagAdvise Conversation Assistant helps you:
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    Never miss a customer
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    AI answers every call, email, and message instantly—even at
                    2am, weekends, and holidays.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Look professional</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional phone number, instant responses, and consistent
                    communication across all channels.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    Save 15-20 hours/week
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Stop typing the same answers to "Are you open?" and "How
                    much does it cost?" AI handles repetitive questions.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    Capture more revenue
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Customers who can't reach you call your competitor. AI
                    answers immediately and books the appointment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              What customers say:
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Real results from real businesses using RagAdvise.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Testimonial 1 */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 italic">
                    "I used to miss 5-6 calls a day while working on jobs. Now
                    my AI answers every call and I get the important ones texted
                    to me. Game changer."
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonialMike}
                      alt="Mike T."
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">Mike T.</p>
                      <p className="text-sm text-muted-foreground">
                        Plumbing Business
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 2 */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 italic">
                    "We added AI to our existing phone number and didn't have to
                    tell customers anything. Suddenly we're just 'always
                    available' and bookings went up 40%."
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonialMaria}
                      alt="Sarah K."
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">Sarah K.</p>
                      <p className="text-sm text-muted-foreground">
                        Hair Salon Owner
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 3 */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 italic">
                    "As a new business, I couldn't afford a receptionist. AI
                    made me look like I had a full office from day one.
                    Customers have no idea it's just me."
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonialJames}
                      alt="James R."
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">James R.</p>
                      <p className="text-sm text-muted-foreground">
                        HVAC Company
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 4 */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 italic">
                    "The after-hours coverage alone paid for itself. We used to
                    lose evening calls to competitors. Now AI captures them and
                    we follow up in the morning."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-semibold text-primary">ML</span>
                    </div>
                    <div>
                      <p className="font-semibold">Maria L.</p>
                      <p className="text-sm text-muted-foreground">
                        Dental Practice
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 md:py-24">
          <div className="container max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              How does RagAdvise compare?
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              See how RagAdvise stacks up against traditional phone systems and
              AI platforms.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-3 font-medium text-muted-foreground min-w-[140px]">
                      Feature
                    </th>
                    <th className="text-center py-4 px-3 font-bold text-primary bg-primary/5 min-w-[100px]">
                      RagAdvise
                    </th>
                    <th className="text-center py-4 px-3 font-medium min-w-[100px]">
                      Vapi
                    </th>
                    <th className="text-center py-4 px-3 font-medium min-w-[100px]">
                      OpenAI API
                    </th>
                    <th className="text-center py-4 px-3 font-medium min-w-[100px]">
                      Google Voice
                    </th>
                    <th className="text-center py-4 px-3 font-medium min-w-[100px]">
                      Grasshopper
                    </th>
                    <th className="text-center py-4 px-3 font-medium min-w-[100px]">
                      RingCentral
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-muted/30">
                    <td className="py-3 px-3 font-medium">Starting Price</td>
                    <td className="text-center py-3 px-3 bg-primary/5 font-bold text-primary">
                      $16/mo
                    </td>
                    <td className="text-center py-3 px-3 text-muted-foreground">
                      Pay/min
                    </td>
                    <td className="text-center py-3 px-3 text-muted-foreground">
                      Pay/token
                    </td>
                    <td className="text-center py-3 px-3 text-muted-foreground">
                      $10/user
                    </td>
                    <td className="text-center py-3 px-3 text-muted-foreground">
                      $14/mo
                    </td>
                    <td className="text-center py-3 px-3 text-muted-foreground">
                      $20/user
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium">
                      AI Answering Included
                    </td>
                    <td className="text-center py-3 px-3 bg-primary/5">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-3 text-muted-foreground text-xs">
                      Dev platform
                    </td>
                    <td className="text-center py-3 px-3 text-muted-foreground text-xs">
                      Dev API
                    </td>
                    <td className="text-center py-3 px-3">
                      <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-3 text-muted-foreground text-xs">
                      $60 add-on
                    </td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="py-3 px-3 font-medium">Email with AI</td>
                    <td className="text-center py-3 px-3 bg-primary/5">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium">
                      Social Media (FB, IG, WhatsApp)
                    </td>
                    <td className="text-center py-3 px-3 bg-primary/5">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="py-3 px-3 font-medium">
                      Website Chat with AI
                    </td>
                    <td className="text-center py-3 px-3 bg-primary/5">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-3 text-muted-foreground text-xs">
                      Build it
                    </td>
                    <td className="text-center py-3 px-3 text-muted-foreground text-xs">
                      Build it
                    </td>
                    <td className="text-center py-3 px-3">
                      <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium">Review Management</td>
                    <td className="text-center py-3 px-3 bg-primary/5">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="py-3 px-3 font-medium">Setup Complexity</td>
                    <td className="text-center py-3 px-3 bg-primary/5 font-medium text-primary">
                      30 min
                    </td>
                    <td className="text-center py-3 px-3 text-muted-foreground text-xs">
                      Coding req.
                    </td>
                    <td className="text-center py-3 px-3 text-muted-foreground text-xs">
                      Coding req.
                    </td>
                    <td className="text-center py-3 px-3 text-muted-foreground text-xs">
                      Simple
                    </td>
                    <td className="text-center py-3 px-3 text-muted-foreground text-xs">
                      Simple
                    </td>
                    <td className="text-center py-3 px-3 text-muted-foreground text-xs">
                      Moderate
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-center text-muted-foreground mt-8 text-sm max-w-3xl mx-auto">
              <strong>Key takeaway:</strong> Traditional phone systems give you
              a phone number but no AI. Developer platforms give you AI tools
              but require coding. RagAdvise is the only solution that gives you
              AI answering across phone, email, SMS, social media, and website
              chat—ready to use in 30 minutes.
            </p>

            <div className="text-center mt-10">
              <DemoRequestModal>
                <Button size="lg">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule a Demo
                </Button>
              </DemoRequestModal>
            </div>
          </div>
        </section>

        {/* Works Better as a Suite */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Works better as a suite</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              The Conversation Assistant is powerful alone, but transformative when connected to our full suite.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="border-primary bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Conversation Assistant</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">You're here. It captures revenue opportunities and customer requests across channels.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted">
                      <ListChecks className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Task Assistant</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Turns communication to-dos into action: follow-ups, assignments, deadlines.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Customer Assistant</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Shows who pays, who churns, and which customers are most profitable.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Training Assistant</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Keeps communication workflows consistent with clear SOPs and policies.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted">
                      <GlobeIcon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Site Assistant</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Captures leads and ties spend to conversion so marketing is measurable.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Money Assistant</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">The source of truth for business performance and financial health.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Team Photo */}
              <div className="order-2 lg:order-1">
                <img
                  src={teamPhoto}
                  alt="The RagAdvise team"
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>

              {/* Right - Text Content */}
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Free Personalized Setup—No $2,500 Fee
                </h2>
                <p className="text-xl text-muted-foreground mb-4">
                  Vapi, Intercom, RingCentral, and other platforms charge upwards of <strong className="text-foreground">$2,500</strong> for full personalized setup across email and phone.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  We believe non-technical business owners deserve AI—without the high cost.
                </p>
                <p className="text-muted-foreground mb-6">
                  That's why our support engineers will <strong className="text-foreground">demo the product and configure your entire setup for free</strong>. No setup fee. No technical expertise required.
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-8">
                  <p className="text-sm font-medium mb-2">What you get in your free setup session:</p>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>30-minute personalized demo with a support engineer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Complete configuration of your AI assistant</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Phone, email, and messaging setup included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Training tailored to your business and industry</span>
                    </li>
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
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Common questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start your free trial today.
            </h2>
            <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-90">
              See how RagAdvise Conversation Assistant handles your actual
              customer calls, emails, and messages across all channels.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="https://my.ragadvise.com/signup">Start Free Trial</a>
              </Button>
              <DemoRequestModal>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule a Demo
                </Button>
              </DemoRequestModal>
            </div>
          </div>
        </section>
      </main>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "RagAdvise Conversation Assistant",
            description,
            url: siteUrl,
          }),
        }}
      />
    </>
  );
};

export default ConversationAssistant;
