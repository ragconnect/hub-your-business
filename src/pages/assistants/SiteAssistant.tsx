import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import ScrollingCharacterBg from "@/components/marketing/ScrollingCharacterBg";
import OfferBanner from "@/components/marketing/OfferBanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import DemoRequestModal from "@/components/marketing/DemoRequestModal";
import VideoModal from "@/components/marketing/VideoModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mic,
  Globe,
  Clock,
  MessageCircle,
  Bot,
  Video,
  Calendar,
  X,
  Check,
  Send,
  Wrench,
  UtensilsCrossed,
  Home,
  Car,
  ShoppingBag,
  Heart,
  Moon,
  Zap,
  Compass,
  DollarSign,
  ListChecks,
  BookOpen,
  Users,
  Play,
  Rocket,
  Building2,
} from "lucide-react";
import LogoMarquee from "@/components/marketing/LogoMarquee";
import googleLogo from "@/assets/logos/google.png";

const oldWayProblems = [
  {
    icon: Globe,
    title: "Your website just sits there",
    desc: "Visitors land on your site, look around for 10 seconds, and leave. You never know who they were or what they needed.",
  },
  {
    icon: MessageCircle,
    title: "Contact forms go nowhere",
    desc: '"Fill out this form and we\'ll get back to you." By the time you reply tomorrow, they already hired your competitor.',
  },
  {
    icon: Clock,
    title: "Live chat needs staffing",
    desc: "You pay someone to sit and wait for messages. Nights and weekends? Forget it. Those visitors are gone.",
  },
  {
    icon: Mic,
    title: "You miss the voice customers",
    desc: "Some people hate typing. They want to talk. Your website makes them fill out forms. They bounce.",
  },
];

const newWaySolutions = [
  {
    icon: Bot,
    title: "Your website talks to visitors instantly",
    desc: "Website Voice appears. Visitor says what they need—by voice or chat. AI understands and responds in 3 seconds.",
  },
  {
    icon: Mic,
    title: "Voice makes it personal and fast",
    desc: 'Customer presses "Talk" and speaks: "I need a plumber for a leak, how soon can you come?" Website Voice books them right there. 3x faster than typing.',
  },
  {
    icon: Calendar,
    title: "Get instant appointments and orders",
    desc: "Website Voice captures their problem, recommends your top 3 solutions, shows pricing, and books them—all on screen in 30 seconds.",
  },
  {
    icon: Video,
    title: "AI sends them a personal video",
    desc: "Within 5 minutes, customer gets an email with a video explaining your recommendations, pricing, and next steps. They actually watch it.",
  },
  {
    icon: Moon,
    title: "Works 24/7, even at 2am",
    desc: "Website visitor in the middle of the night? Website Voice captures them, qualifies them, books them. You wake up to new customers.",
  },
];

const industries = [
  {
    icon: Wrench,
    title: "For Plumbers & Home Services",
    example: '"My water heater broke, how much to fix it?"',
    result: "→ Website Voice diagnoses, quotes, and books same-day service",
  },
  {
    icon: UtensilsCrossed,
    title: "For Restaurants",
    example: '"Table for 4 tonight at 7pm?"',
    result: "→ Website Voice checks availability, books it, sends confirmation on screen",
  },
  {
    icon: Home,
    title: "For Realtors",
    example: '"Looking for 3-bedroom homes near good schools"',
    result: "→ Website Voice shows listings, books tour, emails video walkthrough",
  },
  {
    icon: Car,
    title: "For Car Dealers",
    example: '"Need an SUV under $40k"',
    result: "→ Website Voice recommends 3 vehicles, schedules test drives, explains financing",
  },
  {
    icon: ShoppingBag,
    title: "For Online Stores",
    example: '"Looking for running shoes for wide feet"',
    result: "→ Website Voice shows products, builds cart, offers discount code",
  },
  {
    icon: Heart,
    title: "For Nonprofits",
    example: '"Want to help with youth programs"',
    result: "→ Website Voice explains campaigns, processes donation, sends impact video",
  },
];

const faqs = [
  {
    q: "How long to set up?",
    a: "30 seconds. Copy one line of code onto your website. Done.",
  },
  {
    q: "What if visitors prefer typing?",
    a: "They can talk or type—their choice. Both work perfectly.",
  },
  {
    q: "Do I need special tech?",
    a: "Nope. Website Voice works on any website—WordPress, Shopify, custom sites, anything.",
  },
  {
    q: "What if the AI doesn't know something?",
    a: "You control what it knows. Train it on your business. It gets smarter over time.",
  },
  {
    q: "Can I see what visitors are saying?",
    a: "Yes. Every conversation saved. You see exactly what people want.",
  },
  {
    q: "What about slow internet?",
    a: "Voice works great. Chat is the fallback. Everyone gets served.",
  },
  {
    q: "How much does it cost?",
    a: "Less than $100/month to start. Way cheaper than a receptionist. No long-term contract.",
  },
];

const rotatingWords = ["sales", "appointments", "answers", "engagement", "directions"];

const SiteAssistant = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setIsAnimating(false);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const siteUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/assistants/site`
      : "https://ragadvise.com/assistants/site";
  const title =
    "Website Voice — Voice-First AI That Converts Website Visitors 24/7 | RagAdvise";
  const description =
    "Turn your website into a 24/7 sales machine. Voice-first AI assistant that captures leads, books appointments, and converts visitors while you sleep.";

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
          className="relative pt-16 md:pt-24 pb-16 md:pb-24 overflow-hidden"
          aria-labelledby="hero-title"
        >
          <ScrollingCharacterBg />
          <div className="container relative z-10">
            <div className="max-w-2xl mx-auto text-center">
                <p className="mt-6 text-xl text-muted-foreground">
                  With real{" "}
                  <span
                    className={`inline-block transition-all duration-300 font-semibold text-foreground ${
                      isAnimating
                        ? "opacity-0 translate-y-2"
                        : "opacity-100 translate-y-0"
                    }`}
                  >
                    {rotatingWords[wordIndex]}
                  </span>
                  , not popups
                </p>
                <h1
                  id="hero-title"
                  className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-wide text-primary"
                  style={{ fontFamily: "'Caprasimo', serif" }}
                >
                  Create an AI Voice To Engage Your Website Traffic:{" "}
                  <span
                    className={`inline-block transition-all duration-300 ${
                      isAnimating
                        ? "opacity-0 translate-y-2"
                        : "opacity-100 translate-y-0"
                    }`}
                  >
                    {rotatingWords[wordIndex]}
                  </span>
                </h1>
                <p className="mt-3 text-base text-muted-foreground">
                  Get a voice-enabled website voice that:
                </p>
                <div className="mt-3 flex flex-wrap gap-3 justify-center text-sm font-medium text-foreground">
                  <span>💬 Answers questions</span>
                  <span>🎯 Qualifies visitors</span>
                  <span>✉️ Captures leads</span>
                  <span>📅 Drives bookings/callbacks</span>
                  <span>🧾 Creates support requests</span>
                </div>
                <div className="mt-8 flex flex-col gap-3 max-w-md mx-auto">
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

        {/* GPS Callout + Inline Contact */}
        <section className="py-8 border-y bg-muted/30">
          <div className="container">
            <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr,auto] gap-8 items-center">
              <div className="flex items-start gap-4">
                <Compass className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-lg">RagAdvise is your GPS for business.</p>
                  <p className="text-muted-foreground mt-1">
                    You're looking at Website Voice, but it's built to work as part of a connected suite of assistants. If you like this, you'll love how the whole system runs your business end-to-end.
                  </p>
                </div>
              </div>
              <form onSubmit={handleDemoSubmit} className="flex flex-col sm:flex-row items-end gap-2 min-w-0 sm:min-w-[420px]">
                <div className="flex-1 w-full">
                  <Label htmlFor="gps-name" className="text-xs">Name</Label>
                  <Input
                    id="gps-name"
                    type="text"
                    placeholder="John Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="flex-1 w-full">
                  <Label htmlFor="gps-email" className="text-xs">Email</Label>
                  <Input
                    id="gps-email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    className="h-9 text-sm"
                  />
                </div>
                <Button type="submit" size="sm" className="h-9 whitespace-nowrap" disabled={isSubmitting}>
                  {isSubmitting ? "..." : <>
                    <Send className="mr-1 h-3 w-3" />
                    Schedule Demo & Free Setup
                  </>}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Logo Marquee - Social Proof */}
        <LogoMarquee />

        {/* The Old Way */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-destructive mb-4">
                <X className="w-6 h-6" />
                <span className="text-lg font-semibold">The Old Way</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                What Most Businesses Do
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {oldWayProblems.map((problem) => (
                <Card
                  key={problem.title}
                  className="border-destructive/20 bg-destructive/5"
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                          <problem.icon className="w-6 h-6 text-destructive" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          {problem.title}
                        </h3>
                        <p className="text-muted-foreground">{problem.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 text-center max-w-2xl mx-auto">
              <p className="text-lg font-semibold text-destructive mb-2">
                Why this sucks:
              </p>
              <p className="text-muted-foreground">
                80% of your website visitors leave without buying. You're paying
                for ads but losing customers. You have no idea what people
                actually want.
              </p>
            </div>
          </div>
        </section>

        {/* The New Way */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-primary mb-4">
                <Check className="w-6 h-6" />
                <span className="text-lg font-semibold">The New Way</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                What Website Voice Does For You
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {newWaySolutions.map((solution) => (
                <Card
                  key={solution.title}
                  className="border-primary/20 bg-primary/5"
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <solution.icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          {solution.title}
                        </h3>
                        <p className="text-muted-foreground">{solution.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 text-center max-w-2xl mx-auto">
              <p className="text-lg font-semibold text-primary mb-2">
                Why this works:
              </p>
              <p className="text-muted-foreground">
                You catch every visitor. Voice feels human. Bookings happen
                instantly. Customers get value before talking to you. Your
                website finally converts.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Add Website Voice In 30 Seconds
            </h2>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-3">Copy one line of code</h3>
                  <p className="text-muted-foreground">
                    Paste it onto your website. Works on WordPress, Shopify,
                    custom sites—anything.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-3">Train on your business</h3>
                  <p className="text-muted-foreground">
                    Tell the AI about your services, pricing, and how to book.
                    It learns fast.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    Start converting visitors
                  </h3>
                  <p className="text-muted-foreground">
                    Website Voice greets visitors, answers questions, and books
                    them—24/7.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-10">
              <DemoRequestModal>
                <Button size="lg">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Demo
                </Button>
              </DemoRequestModal>
            </div>
          </div>
        </section>

        {/* Works For Every Business */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                💼 Works For Every Business
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See how Website Voice handles real conversations in different
                industries.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {industries.map((industry) => (
                <Card key={industry.title} className="border-muted">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <industry.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold">{industry.title}</h3>
                    </div>
                    <p className="text-muted-foreground italic mb-2">
                      {industry.example}
                    </p>
                    <p className="text-sm font-medium text-primary">
                      {industry.result}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Works Better as a Suite */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Works better as a suite</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Website Voice is powerful alone, but transformative when connected to our full suite.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/assistants/conversation'}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Conversation Assistant</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Captures revenue opportunities and customer requests across channels.</p>
                  <p className="text-sm text-primary mt-3 font-medium">Learn more →</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/assistants/task'}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted">
                      <ListChecks className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Task Assistant</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Turns website leads into action: follow-ups, assignments, deadlines.</p>
                  <p className="text-sm text-primary mt-3 font-medium">Learn more →</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/assistants/customer'}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Customer Assistant</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Shows who pays, who churns, and which customers are most profitable.</p>
                  <p className="text-sm text-primary mt-3 font-medium">Learn more →</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/assistants/training'}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Training Assistant</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Keeps site content workflows consistent with clear SOPs and policies.</p>
                  <p className="text-sm text-primary mt-3 font-medium">Learn more →</p>
                </CardContent>
              </Card>
              <Card className="border-primary bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Website Voice</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">You're here. Captures leads and ties spend to conversion so marketing is measurable.</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/assistants/money'}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Money Assistant</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">The source of truth for business performance and financial health.</p>
                  <p className="text-sm text-primary mt-3 font-medium">Learn more →</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing */}
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
                        $16<span className="text-xl font-normal text-muted-foreground">/month</span>
                      </div>
                      <p className="text-lg text-muted-foreground">Complete AI website engagement system</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-500" />
                          What's included:
                        </h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Voice-enabled AI on your website</li>
                          <li>• 24/7 visitor engagement</li>
                          <li>• Lead qualification & capture</li>
                          <li>• Appointment booking</li>
                          <li>• Personalized video follow-ups</li>
                          <li>• Unlimited conversations</li>
                        </ul>
                      </div>

                      <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                        <h4 className="font-bold mb-4 flex items-center gap-2 text-destructive">
                          <X className="w-5 h-5" />
                          Building it yourself:
                        </h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>Live chat tool: <span className="line-through">$50-200/month</span></li>
                          <li>Chatbot builder: <span className="line-through">$100-500/month</span></li>
                          <li>Video platform: <span className="line-through">$50-100/month</span></li>
                          <li>Booking tool: <span className="line-through">$20-50/month</span></li>
                          <li className="font-bold pt-2 border-t border-destructive/20">
                            Total: <span className="line-through">$220-850/month</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-primary/10 rounded-xl text-center">
                      <p className="text-lg font-bold text-primary">RagAdvise = 15-50x cheaper</p>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 max-w-md mx-auto">
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
                      <div className="flex items-center justify-center gap-2 text-sm mt-1">
                        <a href="https://my.ragadvise.com/signup" className="text-primary font-medium hover:underline">Sign up free with email.</a>
                        <span className="text-muted-foreground">No credit card required</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="existing">
                <Card className="border-primary/20">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="text-5xl font-bold text-primary mb-2">
                        $16<span className="text-xl font-normal text-muted-foreground">/month</span>
                      </div>
                      <p className="text-lg text-muted-foreground">vs. your current costs</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-500" />
                          What's included:
                        </h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Replace live chat + chatbot tools</li>
                          <li>• Voice AI that talks to visitors</li>
                          <li>• Auto-qualify and book leads</li>
                          <li>• Personalized video follow-ups</li>
                          <li>• Works 24/7 without staff</li>
                          <li>• Unlimited conversations</li>
                        </ul>
                      </div>

                      <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                        <h4 className="font-bold mb-4 flex items-center gap-2 text-destructive">
                          <X className="w-5 h-5" />
                          What you're spending now:
                        </h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>Live chat support: <span className="line-through">$50-200/month</span></li>
                          <li>Chatbot/widget: <span className="line-through">$100-500/month</span></li>
                          <li>Lost visitors (80%): <span className="line-through">$2,000-10,000 in lost revenue</span></li>
                          <li className="font-bold pt-2 border-t border-destructive/20">
                            Total: <span className="line-through">$150-700/month + lost sales</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-primary/10 rounded-xl text-center">
                      <p className="text-lg font-bold text-primary">Convert 3x more visitors while spending less</p>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 max-w-md mx-auto">
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
                      <div className="flex items-center justify-center gap-2 text-sm mt-1">
                        <a href="https://my.ragadvise.com/signup" className="text-primary font-medium hover:underline">Sign up free with email.</a>
                        <span className="text-muted-foreground">No credit card required</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              🎯 The Bottom Line
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Your website should work like your best salesperson:
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {[
                "Greets every visitor instantly",
                "Asks what they need (voice or chat)",
                "Gives personalized recommendations",
                "Books them right there",
                "Follows up with video",
                "Works 24/7/365",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 justify-center bg-background rounded-lg p-4"
                >
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-lg text-muted-foreground mb-8">
              Most websites are silent. <strong>Yours can talk.</strong>
              <br />
               Stop losing 80% of your website visitors. Give them Website
               Voice.
            </p>
            <div className="flex flex-col gap-3 justify-center max-w-md mx-auto">
              <Button size="lg" className="w-full h-14 text-base font-semibold rounded-lg" asChild>
                <a href="https://my.ragadvise.com/signup" className="flex items-center justify-center gap-3">
                  <img src={googleLogo} alt="" className="w-7 h-7 bg-white rounded-full p-0.5" />
                  Sign up with Google or email
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              ❓ Questions?
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-lg font-medium">
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
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🚀 Add Website Voice To Your Website Today
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Start converting more visitors in 30 seconds. No credit card
              required.
            </p>
            <div className="flex flex-col gap-3 justify-center max-w-md mx-auto">
              <Button size="lg" className="w-full h-14 text-base font-semibold rounded-lg" asChild>
                <a href="https://my.ragadvise.com/signup" className="flex items-center justify-center gap-3">
                  <img src={googleLogo} alt="" className="w-7 h-7 bg-white rounded-full p-0.5" />
                  Sign up with Google or email
                </a>
              </Button>
              <DemoRequestModal>
                <Button variant="outline" size="lg" className="w-full h-14 text-base font-semibold rounded-lg bg-background">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Demo & Free Setup
                </Button>
              </DemoRequestModal>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default SiteAssistant;
