import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
} from "lucide-react";
import LogoMarquee from "@/components/marketing/LogoMarquee";

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
    desc: "Site Assistant appears. Visitor says what they need—by voice or chat. AI understands and responds in 3 seconds.",
  },
  {
    icon: Mic,
    title: "Voice makes it personal and fast",
    desc: 'Customer presses "Talk" and speaks: "I need a plumber for a leak, how soon can you come?" Site Assistant books them right there. 3x faster than typing.',
  },
  {
    icon: Calendar,
    title: "Get instant appointments and orders",
    desc: "Site Assistant captures their problem, recommends your top 3 solutions, shows pricing, and books them—all on screen in 30 seconds.",
  },
  {
    icon: Video,
    title: "AI sends them a personal video",
    desc: "Within 5 minutes, customer gets an email with a video explaining your recommendations, pricing, and next steps. They actually watch it.",
  },
  {
    icon: Moon,
    title: "Works 24/7, even at 2am",
    desc: "Website visitor in the middle of the night? Site Assistant captures them, qualifies them, books them. You wake up to new customers.",
  },
];

const industries = [
  {
    icon: Wrench,
    title: "For Plumbers & Home Services",
    example: '"My water heater broke, how much to fix it?"',
    result: "→ Site Assistant diagnoses, quotes, and books same-day service",
  },
  {
    icon: UtensilsCrossed,
    title: "For Restaurants",
    example: '"Table for 4 tonight at 7pm?"',
    result: "→ Site Assistant checks availability, books it, sends confirmation on screen",
  },
  {
    icon: Home,
    title: "For Realtors",
    example: '"Looking for 3-bedroom homes near good schools"',
    result: "→ Site Assistant shows listings, books tour, emails video walkthrough",
  },
  {
    icon: Car,
    title: "For Car Dealers",
    example: '"Need an SUV under $40k"',
    result: "→ Site Assistant recommends 3 vehicles, schedules test drives, explains financing",
  },
  {
    icon: ShoppingBag,
    title: "For Online Stores",
    example: '"Looking for running shoes for wide feet"',
    result: "→ Site Assistant shows products, builds cart, offers discount code",
  },
  {
    icon: Heart,
    title: "For Nonprofits",
    example: '"Want to help with youth programs"',
    result: "→ Site Assistant explains campaigns, processes donation, sends impact video",
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
    a: "Nope. Site Assistant works on any website—WordPress, Shopify, custom sites, anything.",
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

const SiteAssistant = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const siteUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/assistants/site`
      : "https://ragadvise.com/assistants/site";
  const title =
    "Site Assistant — Voice-First AI That Converts Website Visitors 24/7 | RagAdvise";
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
              <div className="text-center lg:text-left">
                <h1
                  id="hero-title"
                  className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight"
                >
                  Let Your Website Do the Talking—Site Assistant Converts
                  Visitors With Voice
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                  Voice-first assistant that captures leads while you sleep.
                  Because talking is 3x faster than typing—and feels more human.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" asChild>
                    <a href="https://my.ragadvise.com/signup">Get Started Free</a>
                  </Button>
                  <DemoRequestModal>
                    <Button variant="outline" size="lg" className="bg-background">
                      <Calendar className="mr-2 h-4 w-4" />
                      Watch Demo
                    </Button>
                  </DemoRequestModal>
                </div>
              </div>

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
                What Site Assistant Does For You
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
              Add Site Assistant In 30 Seconds
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
                    Site Assistant greets visitors, answers questions, and books
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
                See how Site Assistant handles real conversations in different
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

        {/* The Bottom Line */}
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
              Stop losing 80% of your website visitors. Give them Site
              Assistant.
            </p>
            <Button size="lg" asChild>
              <a href="https://my.ragadvise.com/signup">
                <Zap className="mr-2 h-4 w-4" />
                Get Started Free
              </a>
            </Button>
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
              🚀 Add Site Assistant To Your Website Today
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Start converting more visitors in 30 seconds. No credit card
              required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="https://my.ragadvise.com/signup">Get Started Free</a>
              </Button>
              <DemoRequestModal>
                <Button variant="outline" size="lg" className="bg-background">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Demo
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
